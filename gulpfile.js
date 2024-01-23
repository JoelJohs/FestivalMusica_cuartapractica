const { src, dest, watch, parallel } = require("gulp"); // Importar gulp

// 📌 CSS
const sass = require("gulp-sass")(require("sass")); // Importar gulp-sass
const plumber = require("gulp-plumber"); // Importar gulp-plumber

// 📌 Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// 📌 Funciones
function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo SASS
    // Al agregar **/ se busca en todas las carpetas que esten dentro de src/scss
    // y *.scss busca todos los archivos con extension .scss
    // src("/src/scss/app.scss") - De esta manera solo busca el archivo app.scss
    .pipe(plumber()) // Evitar que se detenga la compilacion por errores
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css")); // Almacenarla en el disco duro

  done(); // callback que avisara a gulp que la tarea ha finalizado
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
}

function javascript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));

  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css); // Observar los cambios en el archivo SASS
  watch("src/js/**/*.js", javascript); // Observar los cambios en el archivo js

  done();
}

exports.css = css; // Exportar la funcion para que pueda ser usada en la terminal
exports.js = javascript; // Exportar la funcion para que pueda ser usada en la terminal
exports.imagenes = parallel(imagenes, versionWebp, versionAvif); // Exportar la funcion para que pueda ser usada en la terminal
exports.versionWebp = versionWebp; // Exportar la funcion para que pueda ser usada en la terminal
exports.versionAvif = versionAvif; // Exportar la funcion para que pueda ser usada en la terminal
exports.dev = dev; // Exportar la funcion para que pueda ser usada en la terminal

// Se debe hacer una correcion en function css(done) y function dev(done)
// para que funcione correctamente y compile todas las hojas .scss

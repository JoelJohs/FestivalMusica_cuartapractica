const { src, dest, watch } = require("gulp"); // Importar gulp
const sass = require("gulp-sass")(require("sass")); // Importar gulp-sass
const plumber = require("gulp-plumber"); // Importar gulp-plumber

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

function dev(done) {
  watch("src/scss/**/*.scss", css); // Observar los cambios en el archivo SASS

  done();
}

exports.css = css; // Exportar la funcion para que pueda ser usada en la terminal
exports.dev = dev; // Exportar la funcion para que pueda ser usada en la terminal

// Se debe hacer una correcion en function css(done) y function dev(done)
// para que funcione correctamente y compile todas las hojas .scss

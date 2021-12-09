const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

function css(done) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe(sass()) // Compilarlo
        .pipe(dest('build/css')) // Almacenarla en el disco duro
    done();
}
function cssbuild( done ){
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'))
    
    done();
}


function dev(done) {
    watch('src/scss/**/*.scss', css); //Revisar archivo y ejecutar funcion
    done();
}

function imagenes( done ){
    src('src/img/**/*')
    .pipe( imagemin( {optimizationLevel: 3}) )
    .pipe( dest('build/img') )
    done();
}


exports.imagenes = imagenes;
exports.css = css;
exports.dev = dev;
exports.default = series(imagenes, css, dev);
exports.build = series( cssbuild );
const fileinclude = require('gulp-file-include');
const terser = require('gulp-terser');

let project_folder = "dist";
let source_folder = "src";

let path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/"
    },
    src:{
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js"
    },
    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js"
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();
    fileinc = require("gulp-file-include");
    scss = require("gulp-sass");
    autoprefixer = require("gulp-autoprefixer");

function browserSync(params) {
    browsersync.init({
      server:{
          baseDir: "./" + project_folder + "/"
      },
       port: 3000,
       notify: false 
    })

}

function html(){
    return src(path.src.html)
    .pipe(fileinc())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(
        autoprefixer({
           overrideBrowserlist: ["last 5 versions"],
           cascade: true 
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinc())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}


function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function es(){
    return gulp.src(path.src.js)
      .pipe(terser())
      .pipe(gulp.dest(path.build.js));
  }

let build = gulp.series(gulp.parallel(js, css, html));
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.es = es;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
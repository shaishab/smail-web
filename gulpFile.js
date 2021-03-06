"user strict";
var html2js, _, buildDirectory, changed, coffee, concat, csso, del, fontsBuildDirectory, fs, gulp, gutil;
var imagemin, jade, jshint, mkdirp, plumber, sass, scriptBuildDirectory, scriptSourceDirectory, size;
var styleBuildDirectory, styleSourceDirectory, uglify, watch, styleCompileDirectory, templateDirectory;

gulp = require("gulp");

gutil = require("gulp-util");

watch = require("gulp-watch");

plumber = require("gulp-plumber");

del		 = require ("del");

changed = require("gulp-changed");

concat = require("gulp-concat");

jade = require("gulp-jade");

sass = require("gulp-sass");

csso = require("gulp-csso");

uglify = require("gulp-uglify");

_ = require("lodash");

scriptSourceDirectory = "public/js";

scriptBuildDirectory = "public/build/js";

buildDirectory = "public/build";

styleSourceDirectory = "public/sass";

styleCompileDirectory = "public/css";

styleBuildDirectory = "public/build/css";

templateDirectory = "public/directives"


gulp.task("clean", function() {
    return del([buildDirectory]);
});

gulp.task("compileWelcome:sass", function() {
    var files;
    files = styleSourceDirectory + "/welcome/*.scss";
    return gulp.src(files).pipe(changed(styleSourceDirectory + "/welcome", {
        extension: ".css"
    })).pipe(sass({
        includePaths: styleSourceDirectory + "/welcome",
        errLogToConsole: true
    })).pipe(gulp.dest(styleCompileDirectory + "/welcome"));
});

gulp.task("compileLoggedin:sass", function() {
    var files;
    files = styleSourceDirectory + "/loggedin/*.scss";
    return gulp.src(files).pipe(changed(styleSourceDirectory + "/loggedin", {
        extension: ".css"
    })).pipe(sass({
        includePaths: styleSourceDirectory + "/loggedin",
        errLogToConsole: true
    })).pipe(gulp.dest(styleCompileDirectory + "/loggedin"));
});

gulp.task("bundleWelcome:css", function(){
    sourceFiles = styleCompileDirectory + "/welcome/*.css";
    gulp.src(sourceFiles)
    .pipe(concat ("welcome.css"))
    .pipe(csso())
    .pipe(gulp.dest(buildDirectory + "/css"))
});

gulp.task("bundleLoggedin:css", function(){
    sourceFiles = styleCompileDirectory + "/loggedin/*.css";
    gulp.src(sourceFiles)
    .pipe(concat ("smail.css"))
    .pipe(csso())
    .pipe(gulp.dest(buildDirectory + "/css"))
});

gulp.task("compile:jade", function() {
  var files;
  files = templateDirectory + "/**/*.jade";
  return gulp.src(files).pipe(changed(templateDirectory, {
    extension: ".html"
  })).pipe(jade({
    pretty: true
  })).pipe(gulp.dest(templateDirectory));
});

gulp.task("compile:all", ["compileWelcome:sass", "compileLoggedin:sass", "bundle:all", "compile:jade"]);

gulp.task("bundle:all", ["bundleWelcome:css", "bundleLoggedin:css"]);

gulp.task("default", ["compile:all"]);
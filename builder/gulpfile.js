'use strict';

//* Присваиваем каждой переменной
//  вызов соответствующего плагина.

var autoprefixer =     require('gulp-autoprefixer'),
    minifycss    =       require('gulp-minify-css'),
    imagemin     =         require('gulp-imagemin'),
    pngquant     =     require('imagemin-pngquant'),
    changed      =          require('gulp-changed'),
    plumber      =          require('gulp-plumber'), 
    uglify       =           require('gulp-uglify'),
    rigger       =           require('gulp-rigger'),
    rename       =           require('gulp-rename'),
    rimraf       =                require('rimraf'),
    less         =             require('gulp-less'),
    gulp         =                  require('gulp'),
    bs           = require('browser-sync').create(); 

//* Записываем в переменную пути к нашим файлам.

var path = {
    built: {
        js_libs: '../built/js/libs/',
          fonts: '../built/fonts/',
           html: '../built/',
            img: '../built/img/',
            css: '../built/css/',
             js: '../built/js/'
    },

    src: {
      js_bootstrap: '../src/js/bootstrap.js',
        js_plugins: '../src/js/plugins.js',
           js_libs: 'bower_components/*.js',
           js_main: '../src/js/main.js',
            styles: '../src/styles/main.less',
             fonts: '../src/fonts/**/*.*',
              html: '../src/*.html',
               img: '../src/img/**/*.*'
    },

    watch: {
        styles: '../src/styles/**/*.less',
         fonts: '../src/fonts/**/*.*',
          html: '../src/**/*.html',
           img: '../src/img/**/*.*',
            js: '../src/js/**/*.js'
    },

    clean: '../built'
};

//* Записываем в переменную настройки локального сервера.

var config = {
    server: {
        baseDir: "../built"
    },
    port: 1988,
    host: 'localhost',
    logPrefix: "v-a-l-i-k-o"
};

//* Создаём задачу для HTML.

gulp.task('html:build', function () {
    gulp.src(path.src.html)                  // Выберем html файлы по нужному пути
        .pipe(changed(path.built.html))      // Получаем файлы и пропускаем только изменившиеся
        .pipe(rigger())                      // Прогоним через rigger
        .pipe(gulp.dest(path.built.html))    // Выплюнем файлы в папку build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для SCRIPTS.

gulp.task('js:build', function () {
    gulp.src(path.src.js_libs)               // Выберем libs файлы
        .pipe(changed(path.built.js_libs))   // Получаем файлы и пропускаем только изменившиеся
        .pipe(gulp.dest(path.built.js_libs)) // Выплюнем файлы в build
    /* Bootstrap */
    /*gulp.src(path.src.js_bootstrap)          // Выберем bootstrap файл
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(changed(path.built.js))        // Получаем файл и пропускаем если он изменялся
        .pipe(rigger())                      // Прогоним через rigger
        .pipe(uglify())                      // Сожмём
        .pipe(rename({suffix: '.min'}))      // Переименуем
        .pipe(gulp.dest(path.built.js))      // Выплюнем готовый файл в build*/
    gulp.src(path.src.js_plugins)            // Выберем plugins файл
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(changed(path.built.js))        // Получаем файл и пропускаем если он изменялся
        .pipe(rigger())                      // Прогоним через rigger
        .pipe(gulp.dest(path.built.js))      // Выплюнем готовый файл в build
    gulp.src(path.src.js_main)               // Выберем main файл
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(rename('scripts.js'))          // Переименуем
        .pipe(gulp.dest(path.built.js))      // Выплюнем файл в build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для STYLES.

gulp.task('styles:build', function () {
    gulp.src(path.src.styles)                // Выберем файл main.less
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(less())                        // Компилируем через препроцессор
        .pipe(rename('styles.css'))          // Переименуем
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions', '> 1%', 'ie 9'],
        //     cascade: false
        // }))                                  // Добавим вендорные префиксы
        .pipe(gulp.dest(path.built.css))     // Выплюнем в build
        .pipe(minifycss())                   // Сожмём файл
        .pipe(rename({suffix: '.min'}))      // Переименуем
        .pipe(gulp.dest(path.built.css))     // Выплюнем в build
        .pipe(bs.stream());                  // Внедряем изменившийся файл на локальный сервер
});

//* Создаём задачу для IMAGES.

gulp.task('img:build', function () {
    gulp.src(path.src.img)                   // Выберем картинки
        .pipe(plumber())                     // Ловим ошибки для предотвращения остановки gulpa
        .pipe(changed(path.built.img))       // Получаем файлы и пропускаем только изменившиеся
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))                                  // Сожмём файлы
        .pipe(gulp.dest(path.built.img))     // Выплюнем в build
        .pipe(bs.reload({stream: true}));    // Перезагрузим локальный сервер
});

//* Создаём задачу для FONTS.

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)                 // Выберем шрифты
        .pipe(gulp.dest(path.built.fonts))   // Выплюнем в build
});

//* Создаём задачу для очистки проекта.

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//* Создаём задачу для инициализации
//  и запуска локального сервера.

gulp.task('localserver', function () {
    bs.init(config);
});

//* Создаём задачу для наблюдения за файлами.

gulp.task('watch', function (){
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.styles], ['styles:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.img], ['img:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

//* Создаём задачу для наблюдения за файлами
//  после сборки и запуска локального сервера.

gulp.task('watch-localserver', ['build'], function () {
    gulp.start('localserver', 'watch');
});

//* Создаём общую задачу для последовательного
//  запуска следующих задач:
//  HTML, STYLES, SCRIPTS, IMAGES, FONTS.

gulp.task('build', ['html:build', 'styles:build', 'js:build', 'img:build', 'fonts:build']);

//* Создаём задачу для пересборки проекта.

gulp.task('rebuild-project', ['clean'], function () {
    gulp.start('build');
});

//* Создаём задачу для развёртывания рабочего окружения.

gulp.task('default', ['clean'], function () {
    gulp.start('build', 'localserver', 'watch');
});

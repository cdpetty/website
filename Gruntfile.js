var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            //   build: {
            //     cwd: 'public/fonts',
            //     src: [ '**' ],
            //     dest: 'release/fonts'    ,
            //     expand: true
            //   },
            build: {
                files: [
                    {expand: true, cwd: 'public/fonts', src: ['**'], dest: 'release/fonts'},
                    {expand: true, cwd: 'public/javascripts', src: ['**'], dest: 'release/javascripts'}
                ]
            },
        },
        clean: {
            build: {
                src: [ 'release' ]
            },
            stylesheets: {
                src: [ 'release/css/**/*.css', '!release/css/style.min.css' ]
            }
        },
        imagemin: {                          // Task
            build: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'public/images',                   // Src matches are relative to this path
                    src: ['**/*.*'],   // Actual patterns to match
                    flatten: true,
                    dest: 'release/imgs'                  // Destination path prefix
                }]
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'public/stylesheets',
                src: [ '**/*.css' ],
                dest: 'release/css'
            }
        },
        cssmin: {
            build: {
                files: {
                    'release/css/style.min.css': [ 'release/css/**/*.css' ]
                }
            }
        },
        watch: {
            stylesheets: {
                files: 'public/**/*.css',
                tasks: [ 'stylesheets' ]
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        [ 'autoprefixer', 'cssmin', 'clean:stylesheets' ]
    );
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy', 'stylesheets', 'imagemin' ]
    );
};

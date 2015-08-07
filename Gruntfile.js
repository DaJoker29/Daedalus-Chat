module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'ngAnnotate', 'uglify:dev']
            },
            templates: {
                files: ['src/templates/**/*.*'],
                tasks: ['copy:templates']
            },
            img: {
                files: ['img/**/*'],
                tasks: ['copy:img']
            },
            vendor: {
                files: ['vendor/**/*'],
                tasks: ['copy:vendor']
            },
            livereload: {
                options: { livereload: true },
                files: ['dist/**/*']
            }
        },
        sass: {
            dev: {
                expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'dist',
                ext: '.css',
                options: {
                    style: 'expanded'
                }
            },
            prod: {
               expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'dist',
                ext: '.css',
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: 'last 2 versions'})
                ]
            },
            dev: {
                src: 'dist/style.css',
                map: true
            },
            prod: {
                src: 'dist/style.css'
            }
        },
        clean: {
            all: ['dist/']
        },
        jshint: {
            options: {
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'eqnull': true,
                'expr': true,
                'immed': true,
                'newcap': true,
                'noarg': true,
                'quotmark': true,
                'browser': true
            },
            src: ['src/js/**/*.js']
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    compress: false
                },
                files: {
                    'dist/script.js': ['src/js/**/*.js']
                }
            },
            prod: {
                files: {
                    'dist/script.js': ['src/js/**/*.js']
                }
            }
        },
        copy: {
            templates: {
                cwd: 'src/templates',
                src: ['**/*.*', '!**/_*.*'],
                dest: 'dist',
                expand: true
            },
            img: {
                cwd: 'img',
                src: ['**/*.*', '!**/_*.*'],
                dest: 'dist/img',
                expand: true
            },
            vendor: {
                cwd: 'vendor',
                src: ['**/*.*', '!**/_*.*'],
                dest: 'dist/vendor',
                expand: true
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            files: {
                expand: true,
                src: ['src/js/hermes.js'],
            }
        }
    });

    grunt.registerTask('dev', 'Build development version of project', ['clean', 'copy', 'jshint', 'ngAnnotate', 'uglify:dev', 'sass:dev', 'postcss:dev']);
    grunt.registerTask('prod', 'Build production version of project', ['clean', 'copy', 'jshint', 'ngAnnotate', 'uglify:prod', 'sass:prod', 'postcss:prod']);
    grunt.registerTask('default', 'Build development version and run watch server', ['dev', 'watch']);
};

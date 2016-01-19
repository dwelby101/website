
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        css_sprite: {
            options: {
                'cssPath': 'src/assets/img/common',
                    'processor': 'less',
                    'orientation': 'vertical',
                    'margin': 4
            },
            sprite: {
                options: {
                    'style': 'src/assets/less/sprite.less'
                },
                src: ['src/assets/img/common/*'],
                    dest: 'src/assets/img/sprite/sprite'
            },
            base64: {
                options: {
                    'base64': true
                },
                src: ['src/assets/img/common/*'],
                    dest: 'src/assets/less/base64.less'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('css-sprite');


    grunt.registerTask('default', ['concat','css_sprite']);//,'less'
    grunt.registerTask('default', ['concat','css_sprite']);//,'less'

};
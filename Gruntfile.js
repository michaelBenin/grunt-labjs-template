/*
 * grunt-labjs-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Michael Benin, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            test: ['tmp']
        },
        labjs_template: {
            dev: {
                src: 'src/templates/script_tags/scripts_template.html',
                dest: 'src/templates/_scripts.html',
                conf: '<%= concat.main.files[1].src %>',
                dir: '{{ STATIC_URL }}'
            }
        },
        nodeunit: {
            tasks: ['test/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');

    grunt.registerTask('mkdir', grunt.file.mkdir);

    grunt.registerTask('test', [
        'clean',
        'mkdir:tmp',
        'imagemin',
        'nodeunit',
        'clean'
    ]);

    grunt.registerTask('default', ['test', 'build-contrib']);
};

/*
 * grunt-labjs-template
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Michael Benin, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    grunt.registerMultiTask('labjs_template', 'labjs script loading file', function () {
        var ar = [];
        this.data.conf = this.data.conf.split(',');

        for (var i = 0; i < this.data.conf.length; i++) {
            if (!grunt.file.isFile(this.data.conf[i])) {
                this.data.conf.splice(i, 1);
            }
        }
        for (var i = 0; i < this.data.conf.length; i++) {
            var c = this.data.conf[i],
                dir = this.data.dir,
                f = c.split('/'),
                js = dir + f[f.length - 1];
            grunt.log.write('Cued file ' + js + '\n'.grey);

            if (i + 1 === this.data.conf.length) {
                ar.push("'" + js + "'\n \t \t]);");
            } else if (i === 0) {
                ar.push(".script([\n \t \t'" + js + "',\n \t \t");
            } else {
                ar.push("'" + js + "'," + "\n \t \t")
            }
        }
        grunt.scripts_config = ar.join('');
        grunt.script_dir = dir;
        var tmpl = grunt.file.read(this.data.src),
            data = grunt.template.process(tmpl);
        grunt.log.write('✔ '.green + 'Successfully templated ' + this.data.src + '\n');
        grunt.file.write(this.data.dest, data);
        grunt.log.write('✔ '.green + 'Writing JS template: ' + this.data.dest + '\n');
    });
};


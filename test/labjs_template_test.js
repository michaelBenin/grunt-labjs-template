'use strict';
var grunt = require('grunt');

exports.labjs_template = {
    create_template: function (test) {
        test.expect(1);

        var actual = '';
        var original = '';
        test.ok(actual = original, 'should return templated data');

        test.done();
    }
};

var assert = require("assert");
include('ringo/buffer');
var digest = require('ringo/utils/string').digest;

var buffer = new Buffer();
var STRING1 = 'foo';
var STRING2 = 'bar';
var STRING3 = 'baz';
var EOL = '\r\n';

exports.setUp = function () buffer.reset();
exports.testWrite = function () {

    buffer.write(STRING1, STRING2);
    assert.strictEqual(STRING1 + STRING2, buffer.toString());
    buffer.write(STRING3);
    assert.strictEqual(STRING1 + STRING2 + STRING3, buffer.toString());
};

exports.testWriteln = function () {
    buffer.writeln(STRING1, STRING2);
    assert.strictEqual(STRING1 + STRING2 + EOL, buffer.toString());
    buffer.writeln(STRING3);
    assert.strictEqual(STRING1 + STRING2 + EOL + STRING3 + EOL, buffer.toString());
};

exports.testForEach = function () {
    var content = ''; // To concatenate buffer content.
    buffer.write(STRING1, STRING2);
    buffer.forEach(function (it) content += it);
    assert.strictEqual(STRING1 + STRING2, content);
};

exports.testDigest = function () {
    buffer.write(STRING1);
    assert.strictEqual(digest(STRING1), buffer.digest());
};

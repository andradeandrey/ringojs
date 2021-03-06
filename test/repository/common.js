var assert = require("assert");
var {absolute, join} = require("fs");
var STRING = require("ringo/utils/string");

exports.setup = function(exports, path, repo) {

    exports.testGetResource = function() {
        var res = repo.getResource("test.txt");
        assert.strictEqual(res.name, "test.txt");
        assert.isTrue(res.exists());
        assert.strictEqual(res.baseName, "test");
        assert.strictEqual(res.path, absolute(join(path, "test.txt")));
        assert.strictEqual(res.content, "hello world!");
    };

    exports.testGetNestedResource = function() {
        var res = repo.getResource("nested/nested.txt");
        assert.strictEqual(res.name, "nested.txt");
        assert.isTrue(res.exists());
        assert.strictEqual(res.baseName, "nested");
        assert.strictEqual(res.path, absolute(join(path, "nested", "nested.txt")));
        assert.strictEqual(res.length, 2240);
        assert.strictEqual(res.content.length, 2240);
        assert.isTrue(STRING.startsWith(res.content, "Lorem ipsum dolor sit amet"));
        assert.isTrue(STRING.endsWith(res.content.trim(), "id est laborum."));
    };

    exports.testNonExistingResource = function() {
        var res = repo.getResource("doesNotExist.txt");
        assert.isNotNull(res);
        assert.isFalse(res.exists());
        assert.throws(function() {res.content});
    };

    exports.testNestedNonExistingResource = function() {
        var res = repo.getResource("foo/bar/doesNotExist.txt");
        assert.isNotNull(res);
        assert.isFalse(res.exists());
        assert.throws(function() {res.content});
    };

    exports.testGetRepositories = function() {
        var repos = repo.getRepositories();
        assert.strictEqual(repos.length, 1);
        assert.strictEqual(repos[0].name, "nested");
    }

    exports.testGetResources = function() {
        var res = repo.getResources();
        assert.strictEqual(res.length, 1);
        assert.strictEqual(res[0].name, "test.txt");
    }

    exports.testGetRecursiveResources = function() {
        var res = repo.getResources(true);
        assert.strictEqual(res.length, 2);
        res = res.sort(function(a, b) a.length > b.length);
        assert.strictEqual(res[0].name, "test.txt");
        assert.strictEqual(res[0].relativePath, "test.txt");
        assert.strictEqual(res[0].path, absolute(join(path, "test.txt")));
        assert.strictEqual(res[1].name, "nested.txt");
        assert.strictEqual(res[1].relativePath, "nested/nested.txt");
        assert.strictEqual(res[1].path, absolute(join(path, "nested/nested.txt")));
    }

    exports.testGetNestedResources = function() {
        var res = repo.getResources("nested", false);
        assert.strictEqual(res.length, 1);
        assert.strictEqual(res[0].name, "nested.txt");
        assert.strictEqual(res[0].relativePath, "nested/nested.txt");
    }

};
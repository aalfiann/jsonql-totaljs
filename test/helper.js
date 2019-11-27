const assert = require('assert');
const jsonql = require('../src/jsonql-total');

describe('helper test', function() {
    it('is string', function() {
        assert.equal(jsonql.helper.isString('abc'),true);
        assert.equal(jsonql.helper.isString(''),true);
        assert.equal(jsonql.helper.isString(1),false);
        assert.equal(jsonql.helper.isString([]),false);
        assert.equal(jsonql.helper.isString({}),false);
    });

    it('is integer', function() {
        assert.equal(jsonql.helper.isInteger(1),true);
        assert.equal(jsonql.helper.isInteger(0),true);
        assert.equal(jsonql.helper.isInteger(-1),true);
        assert.equal(jsonql.helper.isInteger(-1.56),false);
        assert.equal(jsonql.helper.isInteger(1.56),false);
        assert.equal(jsonql.helper.isInteger('2'),false);
        assert.equal(jsonql.helper.isInteger('-2'),false);
        assert.equal(jsonql.helper.isInteger('02'),false);
        assert.equal(jsonql.helper.isInteger('2.56'),false);
        assert.equal(jsonql.helper.isInteger('-2.56'),false);
        assert.equal(jsonql.helper.isInteger([1,2,3]),false);
        assert.equal(jsonql.helper.isInteger([]),false);
        assert.equal(jsonql.helper.isInteger({}),false);
        assert.equal(jsonql.helper.isInteger(''),false);
    });

    it('is boolean', function() {
        assert.equal(jsonql.helper.isBoolean(true),true);
        assert.equal(jsonql.helper.isBoolean(false),true);
        assert.equal(jsonql.helper.isBoolean(new Boolean(true)),true);
        assert.equal(jsonql.helper.isBoolean(new Boolean(false)),true);
        assert.equal(jsonql.helper.isBoolean(1),false);
        assert.equal(jsonql.helper.isBoolean(0),false);
        assert.equal(jsonql.helper.isBoolean('true'),false);
        assert.equal(jsonql.helper.isBoolean('false'),false);
    });

    it('is array', function() {
        assert.equal(jsonql.helper.isArray([1,2,3]),true);
        assert.equal(jsonql.helper.isArray([]),true);
        assert.equal(jsonql.helper.isArray({}),false);
        assert.equal(jsonql.helper.isArray(''),false);
        assert.equal(jsonql.helper.isArray(1),false);
    });

    it('is object', function() {
        assert.equal(jsonql.helper.isObject({id:1,name:'abc'}),true);
        assert.equal(jsonql.helper.isObject({}),true);
        assert.equal(jsonql.helper.isObject([]),false);
        assert.equal(jsonql.helper.isObject(''),false);
        assert.equal(jsonql.helper.isObject(1),false);
    });

    it('is empty string', function() {
        assert.equal(jsonql.helper.isEmpty(undefined),true);
        assert.equal(jsonql.helper.isEmpty(null),true);
        assert.equal(jsonql.helper.isEmpty(''),true);
        assert.equal(jsonql.helper.isEmpty('abc'),false);
        assert.equal(jsonql.helper.isEmpty(1),false);
        assert.equal(jsonql.helper.isEmpty([]),false);
        assert.equal(jsonql.helper.isEmpty({}),false);
    });

    it('is empty array', function() {
        assert.equal(jsonql.helper.isEmptyArray(undefined),true);
        assert.equal(jsonql.helper.isEmptyArray(null),true);
        assert.equal(jsonql.helper.isEmptyArray([]),true);
        assert.equal(jsonql.helper.isEmptyArray({}),false);
        assert.equal(jsonql.helper.isEmptyArray({id:1}),false);
        assert.equal(jsonql.helper.isEmptyArray('1'),false);
        assert.equal(jsonql.helper.isEmptyArray(1),false);
        assert.equal(jsonql.helper.isEmptyArray([1,2,3]),false);
    });

    it('is empty object', function() {
        assert.equal(jsonql.helper.isEmptyObject(undefined),true);
        assert.equal(jsonql.helper.isEmptyObject(null),true);
        assert.equal(jsonql.helper.isEmptyObject({}),true);
        assert.equal(jsonql.helper.isEmptyObject([]),false);
        assert.equal(jsonql.helper.isEmptyObject(1),false);
        assert.equal(jsonql.helper.isEmptyObject({id:1}),false);
        assert.equal(jsonql.helper.isEmptyObject('1'),false);
        assert.equal(jsonql.helper.isEmptyObject([1,2,3]),false);
    });

    it('is empty object parameter value must hasOwnProperty',function(){
        const obj = Object.create({name: 'inherited'});
        assert.equal(true,jsonql.helper.isEmptyObject(obj));
    });

    it('isJsonString test', function() {
        assert.equal(jsonql.helper.isJsonString({}),true);
        assert.equal(jsonql.helper.isJsonString('{}'),true);
        assert.equal(jsonql.helper.isJsonString([]),true);
        assert.equal(jsonql.helper.isJsonString('[]'),true);
        assert.equal(jsonql.helper.isJsonString('{"name":"abc"}'),true);
        assert.equal(jsonql.helper.isJsonString('{name:"abc"}'),false);
        assert.equal(jsonql.helper.isJsonString('[{"name":"abc"}]'),true);
        assert.equal(jsonql.helper.isJsonString('[{name:"abc"}]'),false);
        assert.equal(jsonql.helper.isJsonString(0),false);
        assert.equal(jsonql.helper.isJsonString('0'),false);
        assert.equal(jsonql.helper.isJsonString('abc'),false);
        assert.equal(jsonql.helper.isJsonString(''),false);
        assert.equal(jsonql.helper.isJsonString(' '),false);
        assert.equal(jsonql.helper.isJsonString(undefined),false);
        assert.equal(jsonql.helper.isJsonString(null),false);
    });
});
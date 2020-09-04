/* global describe it */
const assert = require('assert')
const JsonQL = require('../src/jsonql-total')
const jsonql = new JsonQL()

describe('helper test', function () {
  it('is string', function () {
    assert.strictEqual(jsonql.helper.isString('abc'), true)
    assert.strictEqual(jsonql.helper.isString(''), true)
    assert.strictEqual(jsonql.helper.isString(1), false)
    assert.strictEqual(jsonql.helper.isString([]), false)
    assert.strictEqual(jsonql.helper.isString({}), false)
  })

  it('is integer', function () {
    assert.strictEqual(jsonql.helper.isInteger(1), true)
    assert.strictEqual(jsonql.helper.isInteger(0), true)
    assert.strictEqual(jsonql.helper.isInteger(-1), true)
    assert.strictEqual(jsonql.helper.isInteger(-1.56), false)
    assert.strictEqual(jsonql.helper.isInteger(1.56), false)
    assert.strictEqual(jsonql.helper.isInteger('2'), false)
    assert.strictEqual(jsonql.helper.isInteger('-2'), false)
    assert.strictEqual(jsonql.helper.isInteger('02'), false)
    assert.strictEqual(jsonql.helper.isInteger('2.56'), false)
    assert.strictEqual(jsonql.helper.isInteger('-2.56'), false)
    assert.strictEqual(jsonql.helper.isInteger([1, 2, 3]), false)
    assert.strictEqual(jsonql.helper.isInteger([]), false)
    assert.strictEqual(jsonql.helper.isInteger({}), false)
    assert.strictEqual(jsonql.helper.isInteger(''), false)
  })

  it('is boolean', function () {
    assert.strictEqual(jsonql.helper.isBoolean(true), true)
    assert.strictEqual(jsonql.helper.isBoolean(false), true)
    assert.strictEqual(jsonql.helper.isBoolean(Boolean(true)), true)
    assert.strictEqual(jsonql.helper.isBoolean(Boolean(false)), true)
    assert.strictEqual(jsonql.helper.isBoolean(1), false)
    assert.strictEqual(jsonql.helper.isBoolean(0), false)
    assert.strictEqual(jsonql.helper.isBoolean('true'), false)
    assert.strictEqual(jsonql.helper.isBoolean('false'), false)
  })

  it('is array', function () {
    assert.strictEqual(jsonql.helper.isArray([1, 2, 3]), true)
    assert.strictEqual(jsonql.helper.isArray([]), true)
    assert.strictEqual(jsonql.helper.isArray({}), false)
    assert.strictEqual(jsonql.helper.isArray(''), false)
    assert.strictEqual(jsonql.helper.isArray(1), false)
  })

  it('is object', function () {
    assert.strictEqual(jsonql.helper.isObject({ id: 1, name: 'abc' }), true)
    assert.strictEqual(jsonql.helper.isObject({}), true)
    assert.strictEqual(jsonql.helper.isObject([]), false)
    assert.strictEqual(jsonql.helper.isObject(''), false)
    assert.strictEqual(jsonql.helper.isObject(1), false)
  })

  it('is empty string', function () {
    assert.strictEqual(jsonql.helper.isEmpty(undefined), true)
    assert.strictEqual(jsonql.helper.isEmpty(null), true)
    assert.strictEqual(jsonql.helper.isEmpty(''), true)
    assert.strictEqual(jsonql.helper.isEmpty('abc'), false)
    assert.strictEqual(jsonql.helper.isEmpty(1), false)
    assert.strictEqual(jsonql.helper.isEmpty([]), false)
    assert.strictEqual(jsonql.helper.isEmpty({}), false)
  })

  it('is empty array', function () {
    assert.strictEqual(jsonql.helper.isEmptyArray(undefined), true)
    assert.strictEqual(jsonql.helper.isEmptyArray(null), true)
    assert.strictEqual(jsonql.helper.isEmptyArray([]), true)
    assert.strictEqual(jsonql.helper.isEmptyArray({}), false)
    assert.strictEqual(jsonql.helper.isEmptyArray({ id: 1 }), false)
    assert.strictEqual(jsonql.helper.isEmptyArray('1'), false)
    assert.strictEqual(jsonql.helper.isEmptyArray(1), false)
    assert.strictEqual(jsonql.helper.isEmptyArray([1, 2, 3]), false)
  })

  it('is empty object', function () {
    assert.strictEqual(jsonql.helper.isEmptyObject(undefined), true)
    assert.strictEqual(jsonql.helper.isEmptyObject(null), true)
    assert.strictEqual(jsonql.helper.isEmptyObject({}), true)
    assert.strictEqual(jsonql.helper.isEmptyObject([]), false)
    assert.strictEqual(jsonql.helper.isEmptyObject(1), false)
    assert.strictEqual(jsonql.helper.isEmptyObject({ id: 1 }), false)
    assert.strictEqual(jsonql.helper.isEmptyObject('1'), false)
    assert.strictEqual(jsonql.helper.isEmptyObject([1, 2, 3]), false)
  })

  it('is empty object parameter value must hasOwnProperty', function () {
    const obj = Object.create({ name: 'inherited' })
    assert.strictEqual(true, jsonql.helper.isEmptyObject(obj))
  })

  it('isJsonString test', function () {
    assert.strictEqual(jsonql.helper.isJsonString({}), true)
    assert.strictEqual(jsonql.helper.isJsonString('{}'), true)
    assert.strictEqual(jsonql.helper.isJsonString([]), true)
    assert.strictEqual(jsonql.helper.isJsonString('[]'), true)
    assert.strictEqual(jsonql.helper.isJsonString('{"name":"abc"}'), true)
    assert.strictEqual(jsonql.helper.isJsonString('{name:"abc"}'), false)
    assert.strictEqual(jsonql.helper.isJsonString('[{"name":"abc"}]'), true)
    assert.strictEqual(jsonql.helper.isJsonString('[{name:"abc"}]'), false)
    assert.strictEqual(jsonql.helper.isJsonString(0), false)
    assert.strictEqual(jsonql.helper.isJsonString('0'), false)
    assert.strictEqual(jsonql.helper.isJsonString('abc'), false)
    assert.strictEqual(jsonql.helper.isJsonString(''), false)
    assert.strictEqual(jsonql.helper.isJsonString(' '), false)
    assert.strictEqual(jsonql.helper.isJsonString(undefined), false)
    assert.strictEqual(jsonql.helper.isJsonString(null), false)
  })
})

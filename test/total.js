/* global describe it */
const assert = require('assert')
const JsonQL = require('../src/jsonql-total')
const jsonql = new JsonQL()
const path = require('path')

describe('common query test', function () {
  it('multiple query execution test', function () {
    var jsonql1 = new JsonQL()
    jsonql1.query([
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data[0].response.data[0].name, 'budi')
    })

    var jsonql2 = new JsonQL()
    jsonql2.query([
      {
        select: {
          fields: ['user_id'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]).promise().then(function (data) {
      assert.strictEqual(data[0].response.data[0].name, undefined)
    })
  })

  it('query with formatted json string', function (done) {
    var q = JSON.stringify([
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ])

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('query with object as string', function (done) {
    var q = "[{select: {fields:['user_id','name'],from:'~" + path.resolve(__dirname) + "/fixtures/data1.nosql',where:[['name','==','budi']]}}]"

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('query directly with an object', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + where', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + where on top promise', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]

    jsonql.query(q).promise().then((data) => {
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select multiple query', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          where: [
            ['name', '==', 'wawan']
          ]
        }
      },
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          where: [
            ['address', '==', 'jakarta']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 2)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].user_id, 5)
      assert.strictEqual(data[0].response.data[0].name, 'wawan')
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      assert.strictEqual(data[1].status, true)
      assert.strictEqual(data[1].response.data[0].id, 2)
      assert.strictEqual(data[1].response.data[0].address, 'jakarta')
      assert.strictEqual(data[1].response.data[0].email, 'c@d.com')
      assert.strictEqual(data[1].response.data.length, 1)
      assert.strictEqual(data[1].response.count, 1)
      done()
    })
  })

  it('select + builder and', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          and: {
            where: [
              ['name', '==', 'wawan'],
              ['age', '==', '20']
            ]
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].user_id, 5)
      assert.strictEqual(data[0].response.data[0].name, 'wawan')
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + builder or', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          or: {
            where: [
              ['name', '==', 'wawan'],
              ['name', '==', 'budi']
            ]
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].user_id, 1)
      assert.strictEqual(data[0].response.data[0].name, 'budi')
      assert.strictEqual(data[0].response.data.length, 2)
      assert.strictEqual(data[0].response.count, 2)
      done()
    })
  })

  it('select + join multiple', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          join: [
            {
              name: 'data2',
              from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
              on: ['id', 'user_id'],
              first: true
            },
            {
              name: 'data3',
              from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
              on: ['id', 'user_id'],
              first: false
            }
          ]
        }
      }
    ]

    jsonql.query(q).promise().then(data => {
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].response.data[0].user_id, 1)
      assert.strictEqual(data[0].response.data[0].data2.id, 1)
      assert.strictEqual(data[0].response.data[0].data3[0].id, 1)
      done()
    })
  })

  it('select + join nested', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          join: [
            {
              name: 'data2',
              from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
              on: ['id', 'user_id'],
              first: true,
              join: [
                {
                  name: 'data3',
                  from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
                  on: ['id', 'id'],
                  first: false
                }
              ]
            }
          ]
        }
      }
    ]

    jsonql.query(q).promise().then(data => {
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].response.data[0].user_id, 1)
      assert.strictEqual(data[0].response.data[0].data2.id, 1)
      assert.strictEqual(data[0].response.data[0].data2.data3[0].id, 1)
      done()
    })
  })

  it('select + join nested manually', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          join: [
            {
              name: 'data2',
              from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
              on: ['id', 'user_id'],
              first: true
            },
            {
              name: 'data3',
              from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
              on: ['id', 'user_id'],
              first: true
            },
            {
              name: 'data4',
              from: '~' + path.resolve(__dirname) + '/fixtures/data4.nosql',
              on: ['id', 'user_id'],
              first: true
            }
          ],
          nested: ['data2', 'data3', 'data4']
        }
      }
    ]

    jsonql.query(q).promise().then(data => {
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].response.data[0].user_id, 1)
      assert.strictEqual(data[0].response.data[0].data2.id, 1)
      assert.strictEqual(data[0].response.data[0].data2.data3.id, 1)
      assert.strictEqual(data[0].response.data[0].data2.data3.data4.id, 1)
      done()
    })
  })
})

describe('function query test', function () {
  it('select + between', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          between: [
            ['created_at', '2019-10-02 00:00:00', '2019-10-03 23:59:59']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 2)
      assert.strictEqual(data[0].response.count, 2)
      done()
    })
  })

  it('select + search', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          search: [
            ['name', 'wa']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + by day', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          day: [
            ['created_at', '=', '01']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + by month', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          month: [
            ['created_at', '=', '10']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 3)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + by year', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          year: [
            ['created_at', '=', '2019']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 3)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + in', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
          in: [
            ['sosmed', 'twitter.com/ccc']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + notin', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
          notin: [
            ['sosmed', 'twitter.com/ccc']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 4)
      assert.strictEqual(data[0].response.count, 4)
      done()
    })
  })

  it('select + search fulltext', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          fulltext: [
            ['address', 'solo balapan jakarta']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 3)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + search with regexp', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          regexp: [
            ['address', /balapan/]
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].id, 4)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('select + sort', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          sort: ['user_id', true]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].user_id, 5)
      assert.strictEqual(data[0].response.data.length, 3)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + skip', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          skip: 2
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data[0].user_id, 3)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + take', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          take: 2
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 2)
      assert.strictEqual(data[0].response.count, 3)
      done()
    })
  })

  it('select + page', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          page: [1, 2]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 2)
      assert.strictEqual(data[0].response.count, 5)
      assert.strictEqual(data[0].response.data[0].id, 3)
      assert.strictEqual(data[0].response.data[1].id, 4)
      done()
    })
  })

  it('select + paginate', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          paginate: [1, 2]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 2)
      assert.strictEqual(data[0].response.count, 5)
      assert.strictEqual(data[0].response.data[0].id, 1)
      assert.strictEqual(data[0].response.data[1].id, 2)
      done()
    })
  })

  it('select + scalar', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          scalar: ['count', 'id']
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data, 5)
      assert.strictEqual(data[0].response.count, 5)
      done()
    })
  })

  it('select + random', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          random: true
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 5)
      done()
    })
  })

  it('select + random false', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          random: false
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 5)
      done()
    })
  })

  it('select + query', function (done) {
    var q = [
      {
        select: {
          from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
          query: 'doc.id===2 && doc.address=="jakarta"'
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.length, 1)
      assert.strictEqual(data[0].response.data[0].id, 2)
      assert.strictEqual(data[0].response.data[0].address, 'jakarta')
      done()
    })
  })
})

describe('crud query test', function () {
  it('insert test', function (done) {
    var q = [
      {
        insert: {
          into: '~' + path.resolve(__dirname) + '/fixtures/crud.nosql',
          values: [
            {
              id: '1',
              name: 'aziz'
            },
            {
              id: '2',
              name: 'tika'
            }
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response[0].count, 2)
      done()
    })
  })

  it('update test', function (done) {
    var q = [
      {
        update: {
          from: '~' + path.resolve(__dirname) + '/fixtures/crud.nosql',
          where: [
            ['name', '==', 'aziz']
          ],
          set: {
            id: '1',
            name: 'aziz alfian'
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.id, '1')
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('modify test', function (done) {
    var q = [
      {
        modify: {
          from: '~' + path.resolve(__dirname) + '/fixtures/crud.nosql',
          where: [
            ['id', '==', '1']
          ],
          set: {
            name: 'M ABD AZIZ ALFIAN'
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.data.name, 'M ABD AZIZ ALFIAN')
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('delete test', function (done) {
    var q = [
      {
        delete: {
          from: '~' + path.resolve(__dirname) + '/fixtures/crud.nosql',
          where: [
            ['id', '==', '1']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, true)
      assert.strictEqual(data[0].response.count, 1)
      done()
    })
  })

  it('cleanup crud test', function (done) {
    require('fs').unlink(path.resolve(__dirname) + '/fixtures/crud.nosql', function (err) {
      if (err) console.log(err)
      done()
    })
  })
})

describe('intentional failure test', function () {
  it('select without from test', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          where: [
            ['name', '==', 'budi']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('insert without into test', function (done) {
    var q = [
      {
        insert: {
          values: [
            {
              id: '1',
              name: 'aziz'
            },
            {
              id: '2',
              name: 'tika'
            }
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('update without from test', function (done) {
    var q = [
      {
        update: {
          where: [
            ['name', '==', 'aziz']
          ],
          set: {
            id: '1',
            name: 'aziz alfian'
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('modify without from test', function (done) {
    var q = [
      {
        modify: {
          where: [
            ['id', '==', '1']
          ],
          set: {
            name: 'M ABD AZIZ ALFIAN'
          }
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('delete without from test', function (done) {
    var q = [
      {
        delete: {
          where: [
            ['id', '==', '1']
          ]
        }
      }
    ]

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('select + join nested with first false', function (done) {
    var q = [
      {
        select: {
          fields: ['user_id', 'name'],
          from: '~' + path.resolve(__dirname) + '/fixtures/data1.nosql',
          join: [
            {
              name: 'data2',
              from: '~' + path.resolve(__dirname) + '/fixtures/data2.nosql',
              on: ['id', 'user_id'],
              first: false,
              join: [
                {
                  name: 'data3',
                  from: '~' + path.resolve(__dirname) + '/fixtures/data3.nosql',
                  on: ['id', 'id'],
                  first: false
                }
              ]
            }
          ]
        }
      }
    ]

    jsonql.query(q).promise().then(data => {
      assert.strictEqual(data.length, 1)
      assert.strictEqual(data[0].status, false)
      done()
    })
  })

  it('execute without query test', function (done) {
    var q = []

    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.deepStrictEqual(data, [])
      done()
    })
  })

  it('query object parameter value must hasOwnProperty', function (done) {
    const q = [
      Object.create({ select: 'inherited' })
    ]
    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.deepStrictEqual(data, [])
      done()
    })
  })

  it('query parameter value must string or array or object', function (done) {
    const q = true
    jsonql.query(q).exec(function (err, data) {
      if (err) console.log(err)
      assert.deepStrictEqual(data, [])
      done()
    })
  })
})

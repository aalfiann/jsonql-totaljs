const assert = require('assert');
const jsonql = require('../src/jsonql-total');

describe('common query test', function() {

    it('select + where', function(done) {

        var q = [
            {
                select: {
                    fields:['user_id','name'],
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    where:[
                        ['name','==','budi']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + where on top promise', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    where:[
                        ['name','==','budi']
                    ]
                }
            }
        ];
    
        jsonql.query(q).promise().then((data) => {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select multiple query', function(done) {
        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    where:[
                        ['name','==','wawan']
                    ]
                }
            },
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    where:[
                        ['address','==','jakarta']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,2);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].user_id,5);
            assert.equal(data[0].response.data[0].name,'wawan');
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            assert.equal(data[1].status,true);
            assert.equal(data[1].response.data[0].id,2);
            assert.equal(data[1].response.data[0].address,'jakarta');
            assert.equal(data[1].response.data[0].email,'c@d.com');
            assert.equal(data[1].response.data.length,1);
            assert.equal(data[1].response.count,1);
            done();
        });
    });

    it('select + builder and', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    and:{
                        where:[
                            ['name','==','wawan'],
                            ['age','==','20']
                        ]
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].user_id,5);
            assert.equal(data[0].response.data[0].name,'wawan');
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + builder or', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    or:{
                        where:[
                            ['name','==','wawan'],
                            ['name','==','budi']
                        ]
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].user_id,1);
            assert.equal(data[0].response.data[0].name,'budi');
            assert.equal(data[0].response.data.length,2);
            assert.equal(data[0].response.count,2);
            done();
        });
    });

    it('select + join multiple', function(done){
        var q = [
            {
                select: {
                    fields:['user_id','name'],
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    join:[
                        {
                            name:'data2',
                            from:'~'+__dirname+'/fixtures/data2.nosql',
                            on:['id','user_id'],
                            first:true
                        },
                        {
                            name:'data3',
                            from:'~'+__dirname+'/fixtures/data3.nosql',
                            on:['id','user_id'],
                            first:false
                        }
                    ]
                }
            }
        ];

        jsonql.query(q).promise().then(data => {
            assert.equal(data.length,1);
            assert.equal(data[0].response.data[0].user_id,1);
            assert.equal(data[0].response.data[0].data2.id,1);
            assert.equal(data[0].response.data[0].data3[0].id,1);
            done();
        });
    });

    it('select + join nested', function(done){
        var q = [
            {
                select: {
                    fields:['user_id','name'],
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    join:[
                        {
                            name:'data2',
                            from:'~'+__dirname+'/fixtures/data2.nosql',
                            on:['id','user_id'],
                            first:true,
                            join: [
                                {
                                    name:'data3',
                                    from:'~'+__dirname+'/fixtures/data3.nosql',
                                    on:['id','id'],
                                    first:false
                                }
                            ]   
                        }
                    ]
                }
            }
        ];

        jsonql.query(q).promise().then(data => {
            assert.equal(data.length,1);
            assert.equal(data[0].response.data[0].user_id,1);
            assert.equal(data[0].response.data[0].data2.id,1);
            assert.equal(data[0].response.data[0].data2.data3[0].id,1);
            done();
        });
    });

});

describe('function query test', function(){

    it('select + between', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    between:[
                        ['created_at','2019-10-02 00:00:00','2019-10-03 23:59:59']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,2);
            assert.equal(data[0].response.count,2);
            done();
        });
    });

    it('select + search', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    search:[
                        ['name','wa']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + by day', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    day:[
                        ['created_at','=','01']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + by month', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    month:[
                        ['created_at','=','10']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,3);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + by year', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    year:[
                        ['created_at','=','2019']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,3);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + in', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data3.nosql',
                    in:[
                        ['sosmed','twitter.com/ccc']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + notin', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data3.nosql',
                    notin:[
                        ['sosmed','twitter.com/ccc']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,4);
            assert.equal(data[0].response.count,4);
            done();
        });
    });

    it('select + search fulltext', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    fulltext:[
                        ['address','solo balapan jakarta']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,3);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + search with regexp', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    regexp:[
                        ['address',/balapan/]
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].id,4);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('select + sort', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    sort:['user_id',true]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].user_id,5);
            assert.equal(data[0].response.data.length,3);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + skip', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    skip:2
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data[0].user_id,3);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + take', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data1.nosql',
                    take:2
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,2);
            assert.equal(data[0].response.count,3);
            done();
        });
    });

    it('select + page', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    page:[1,2]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,2);
            assert.equal(data[0].response.count,5);
            assert.equal(data[0].response.data[0].id,3);
            assert.equal(data[0].response.data[1].id,4);
            done();
        });
    });

    it('select + paginate', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    paginate:[1,2]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,2);
            assert.equal(data[0].response.count,5);
            assert.equal(data[0].response.data[0].id,1);
            assert.equal(data[0].response.data[1].id,2);
            done();
        });
    });

    it('select + scalar', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    scalar:['count','id']
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data,5);
            assert.equal(data[0].response.count,5);
            done();
        });
    });

    it('select + random', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    random:true
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,5);
            done();
        });
    });

    it('select + query', function(done) {

        var q = [
            {
                select: {
                    from:'~'+__dirname+'/fixtures/data2.nosql',
                    query:'doc.id===2 && doc.address=="jakarta"'
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.length,1);
            assert.equal(data[0].response.data[0].id,2);
            assert.equal(data[0].response.data[0].address,'jakarta');
            done();
        });
    });

});

describe('crud query test', function(){

    it('insert test', function(done) {
        var q = [
            {
                insert: {
                    into:'~'+__dirname+'/fixtures/crud.nosql',
                    values:[
                        {
                            id:'1',
                            name:'aziz'
                        },
                        {
                            id:'2',
                            name:'tika'
                        }
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data[0].status,true);
            assert.equal(data[0].response[0].count,2);
            done();
        });
    });

    it('update test', function(done) {
        var q = [
            {
                update: {
                    from:'~'+__dirname+'/fixtures/crud.nosql',
                    where:[
                        ['name','==','aziz']
                    ],
                    set:{
                        id:'1',
                        name:'aziz alfian'
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.id,1);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('modify test', function(done) {
        var q = [
            {
                modify: {
                    from:'~'+__dirname+'/fixtures/crud.nosql',
                    where:[
                        ['id','==','1']
                    ],
                    set:{
                        name:'M ABD AZIZ ALFIAN'
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.data.name,"M ABD AZIZ ALFIAN");
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('delete test', function(done) {
        var q = [
            {
                delete: {
                    from:'~'+__dirname+'/fixtures/crud.nosql',
                    where:[
                        ['id','==','1']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,true);
            assert.equal(data[0].response.count,1);
            done();
        });
    });

    it('cleanup crud test', function(done) {
        require('fs').unlink(__dirname+'/fixtures/crud.nosql', function(err) {
            if (err) console.log(err);
            done();
        });
    });

});

describe('intentional failure test', function(){

    it('select without from test', function(done) {

        var q = [
            {
                select: {
                    fields:['user_id','name'],
                    where:[
                        ['name','==','budi']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,false);
            done();
        });
    });

    it('insert without into test', function(done) {
        var q = [
            {
                insert: {
                    values:[
                        {
                            id:'1',
                            name:'aziz'
                        },
                        {
                            id:'2',
                            name:'tika'
                        }
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,false);
            done();
        });
    });

    it('update without from test', function(done) {
        var q = [
            {
                update: {
                    where:[
                        ['name','==','aziz']
                    ],
                    set:{
                        id:'1',
                        name:'aziz alfian'
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,false);
            done();
        });
    });

    it('modify without from test', function(done) {
        var q = [
            {
                modify: {
                    where:[
                        ['id','==','1']
                    ],
                    set:{
                        name:'M ABD AZIZ ALFIAN'
                    }
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,false);
            done();
        });
    });

    it('delete without from test', function(done) {
        var q = [
            {
                delete: {
                    where:[
                        ['id','==','1']
                    ]
                }
            }
        ];
    
        jsonql.query(q).exec(function(err,data) {
            assert.equal(data.length,1);
            assert.equal(data[0].status,false);
            done();
        });
    });

});
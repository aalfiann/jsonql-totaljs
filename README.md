# jsonql-totaljs
[![NPM](https://nodei.co/npm/jsonql-totaljs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jsonql-totaljs/)  
  
[![npm version](https://img.shields.io/npm/v/jsonql-totaljs.svg?style=flat-square)](https://www.npmjs.org/package/jsonql-totaljs)
[![Build Status](https://travis-ci.com/aalfiann/jsonql-totaljs.svg?branch=master)](https://travis-ci.com/aalfiann/jsonql-totaljs)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/jsonql-totaljs/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/jsonql-totaljs?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/jsonql-totaljs/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/jsonql-totaljs?targetFile=package.json)
[![dependencies Status](https://david-dm.org/aalfiann/jsonql-totaljs/status.svg)](https://david-dm.org/aalfiann/jsonql-totaljs)
![License](https://img.shields.io/npm/l/jsonql-totaljs)
![NPM download/month](https://img.shields.io/npm/dm/jsonql-totaljs.svg)
![NPM download total](https://img.shields.io/npm/dt/jsonql-totaljs.svg)  
JsonQL NoSQL Embedded for Total.js Framework.

This will make you easier to use [NoSQL Embedded](https://docs.totaljs.com/latest/en.html#api~DatabaseBuilder) in [Total.js Framework](https://totaljs.com).

## Get Started

### Install using NPM
```bash
$ npm install jsonql-totaljs
```

### Usage
- Basic Query
```javascript
const JsonQL = require('jsonql-totaljs');
// create new object jsonql
const jsonql = new JsonQL();

// build query
var q = [
    {
        select: {
            fields:['user_id','name'],
            from:'user',
            where:[
                ['name','==','budi']
            ]
        }
    }
];

// with callback
jsonql.query(q).exec(function(err,data) {
    console.log(data);        
});

// on top promise
jsonql.query(q).promise().then((data) => {
    console.log(data);        
});
```

- Multiple Query in Single Execution
```javascript
var q = [
    {
        select: {
            from:'user',
            where:[
                ['name','==','wawan']
            ]
        }
    },
    {
        select: {
            from:'profile',
            where:[
                ['address','==','jakarta']
            ]
        }
    }
];
    
jsonql.query(q).exec(function(err,data) {
    console.log(data);
});
```

- Join Query
 ```javascript
var q = [
    {
        select: {
            from:'user',
            where:[
                ['name','==','budi']
            ],
            join:[
                {
                    name:'profile',
                    from:'user_profile',
                    on:['id','id'],
                    first:true
                }
            ]
        }
    }
];

jsonql.query(q).exec(function(err,data) {
    console.log(data);        
});
 ```

- Join Nested
```javascript
var q = [
    {
        select: {
            from:'user',
            where:[
                ['name','==','budi']
            ],
            join:[
                {
                    name:'profile',
                    from:'user_profile',
                    on:['id','id'],
                    first:true,
                    join:[
                        {
                            name:'additional',
                            from:'user_other',
                            on:['id','id'],
                            first:false
                        }
                    ]
                }
            ]
        }
    }
];

jsonql.query(q).exec(function(err,data) {
    console.log(data);        
});
```

- Join Nested Manually
```javascript
var q = [
    {
        select: {
            from:'user',
            where:[
                ['name','==','budi']
            ],
            join:[
                {
                    name:'profile',
                    from:'user_profile',
                    on:['id','id'],
                    first:true
                },
                {
                    name:'additional',
                    from:'user_other',
                    on:['id','id'],
                    first:false
                }
            ],
            nested:['profile','additional']
        }
    }
];

jsonql.query(q).exec(function(err,data) {
    console.log(data);        
});
```

- Insert Single
```javascript
var q = [
    {
        insert: {
            into:'data_crud',
            values:[
                {
                    id:'1',
                    name:'aziz'
                }
            ]
        }
    }
];
    
jsonql.query(q).exec(function(err,data) {
    console.log(data);
});
```

- Insert Multiple
```javascript
var q = [
    {
        insert: {
            into:'data_crud',
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
    console.log(data);
});
```

- Update
```javascript
var q = [
    {
        update: {
            from:'data_crud',
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
    console.log(data);
});
```

- Modify
```javascript
var q = [
    {
        modify: {
            from:'data_crud',
            where:[
                ['name','==','aziz']
            ],
            set:{
                name:'M ABD AZIZ ALFIAN'
            }
        }
    }
];
    
jsonql.query(q).exec(function(err,data) {
    console.log(data);
});
```

- Delete
```javascript
var q = [
    {
        delete: {
            from:'data_crud',
            where:[
                ['name','==','aziz']
            ]
        }
    }
];
    
jsonql.query(q).exec(function(err,data) {
    console.log(data);
});
```

### Documentation
For more detail in usage, please see the documentation in our [Wiki](https://github.com/aalfiann/jsonql-totaljs/wiki).

## Unit Test
All features has been tested, you also can learn how to use all features from unit test. 
```bash
$ npm test
```
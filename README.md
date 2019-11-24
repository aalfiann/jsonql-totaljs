# jsonql-totaljs
JsonQL NoSQL Embedded for Total.js Framework.

## Get Started

### Install using NPM
```bash
$ npm install jsonql-totaljs
```

### Usage
- Basic Query
```javascript
const jsonql = require('jsonql-totaljs');

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

// with callback
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
                        name:'additional',
                        from:'user_other',
                        on:['id','id'],
                        first:false
                    ]
                }
            ]
        }
    }
];

// with callback
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
            from:'crud',
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
            from:'crud',
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
            from:'crud',
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
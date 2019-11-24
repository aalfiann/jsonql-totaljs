/**
 * JsonQL for NoSQL Embedded Total.js
 */
"use strict";
require('total.js');
var JsonQL = {
    /**
     * Helper
     */
    helper: {
        /**
         * Determine value is string
         * @param {*} value
         * @return {bool} 
         */
        isString: function(value) {
            return typeof value === 'string' || value instanceof String;
        },

        /**
         * Determine value is integer
         * @param {*} value
         * @return {bool} 
         */
        isInteger: function(value) {
            return Number.isInteger(value);
        },

        /**
         * Determine value is boolean
         * @param {*} value
         * @return {bool} 
         */
        isBoolean: function(value) {
            return typeof value === 'boolean' || (typeof value === 'object' && value !== null && typeof value.valueOf() === 'boolean');
        },

        /**
         * Determine value is array
         * @param {*} value 
         * @return {bool}
         */
        isArray: function(value) {
            return value && typeof value === 'object' && value.constructor === Array;
        },

        /**
         * Determine value is object
         * @param {*} value 
         * @return {bool}
         */
        isObject: function(value) {
            return value && typeof value === 'object' && value.constructor === Object;
        },

        /**
         * Determine value is empty
         * @param {var} value
         * @return {bool} 
         */
        isEmpty: function(value) {
            return (value === undefined || value === null || value === '');
        },

        /**
         * Determine value is empty and array
         * @param {*} value 
         * @return {bool}
         */
        isEmptyArray: function(value) {
            return (value === undefined || value === null || value.length == 0);
        },

        /**
         * Determine object value is empty
         * @param {*} value 
         * @return {bool}
         */
        isEmptyObject: function(value) {
            return (value === undefined || value === null || (Object.keys(value).length === 0 && value.constructor === Object));
        }
    },

    // Query Builder
    // Promise Stackholder
    promiseStack : [],
    // Result from database
    content: [],

    /**
     * builder.between
     * @param {DatabaseBuilder} parent 
     * @param {array} between
     */
    _builderBetween: function(parent,between) {
        if(!this.helper.isEmpty(between) && this.helper.isArray(between) && !this.helper.isEmptyArray(between)) {
            for(var i=0;i<between.length;i++) {
                parent.between(...between[i]);
            }
        }
    },

    /**
     * builder.where
     * @param {DatabaseBuilder} parent 
     * @param {array} where
     */
    _builderWhere: function(parent,where) {
        if(!this.helper.isEmpty(where) && this.helper.isArray(where) && !this.helper.isEmptyArray(where)) {
            for(var i=0;i<where.length;i++) {
                parent.where(...where[i]);
            }
        }
    },

    /**
     * builder.search
     * @param {DatabaseBuilder} parent 
     * @param {array} search
     */
    _builderSearch: function(parent,search) {
        if(!this.helper.isEmpty(search) && this.helper.isArray(search) && !this.helper.isEmptyArray(search)) {
            for(var i=0;i<search.length;i++) {
                parent.search(...search[i]);
            }
        }
    },

    /**
     * builder.regexp
     * @param {DatabaseBuilder} parent 
     * @param {array} regexp
     */
    _builderRegExp: function(parent,regexp) {
        if(!this.helper.isEmpty(regexp) && this.helper.isArray(regexp) && !this.helper.isEmptyArray(regexp)) {
            for(var i=0;i<regexp.length;i++) {
                parent.regexp(...regexp[i]);
            }
        }
    },

    /**
     * builder.day
     * @param {DatabaseBuilder} parent 
     * @param {array} day
     */
    _builderDay: function(parent,day) {
        if(!this.helper.isEmpty(day) && this.helper.isArray(day) && !this.helper.isEmptyArray(day)) {
            for(var i=0;i<day.length;i++) {
                parent.day(...day[i]);
            }
        }
    },

    /**
     * builder.month
     * @param {DatabaseBuilder} parent 
     * @param {array} month
     */
    _builderMonth: function(parent,month) {
        if(!this.helper.isEmpty(month) && this.helper.isArray(month) && !this.helper.isEmptyArray(month)) {
            for(var i=0;i<month.length;i++) {
                parent.month(...month[i]);
            }
        }
    },

    /**
     * builder.year
     * @param {DatabaseBuilder} parent 
     * @param {array} year
     */
    _builderYear: function(parent,year) {
        if(!this.helper.isEmpty(year) && this.helper.isArray(year) && !this.helper.isEmptyArray(year)) {
            for(var i=0;i<year.length;i++) {
                parent.year(...year[i]);
            }
        }
    },

    /**
     * builder.in
     * @param {DatabaseBuilder} parent 
     * @param {array} in
     */
    _builderIn: function(parent,objIn) {
        if(!this.helper.isEmpty(objIn) && this.helper.isArray(objIn) && !this.helper.isEmptyArray(objIn)) {
            for(var i=0;i<objIn.length;i++) {
                parent.in(...objIn[i]);
            }
        }
    },

    /**
     * builder.notin
     * @param {DatabaseBuilder} parent 
     * @param {array} notin
     */
    _builderNotIn: function(parent,notIn) {
        if(!this.helper.isEmpty(notIn) && this.helper.isArray(notIn) && !this.helper.isEmptyArray(notIn)) {
            for(var i=0;i<notIn.length;i++) {
                parent.notin(...notIn[i]);
            }
        }
    },

    /**
     * builder.fulltext
     * @param {DatabaseBuilder} parent 
     * @param {array} fulltext
     */
    _builderFullText: function(parent,fulltext) {
        if(!this.helper.isEmpty(fulltext) && this.helper.isArray(fulltext) && !this.helper.isEmptyArray(fulltext)) {
            for(var i=0;i<fulltext.length;i++) {
                parent.fulltext(...fulltext[i]);
            }
        }
    },

    /**
     * builder.and
     * @param {DatabaseBuilder} parent 
     * @param {object} and
     */
    _builderAnd: function(parent,and) {
        if(!this.helper.isEmpty(and) && this.helper.isObject(and) && !this.helper.isEmptyObject(and)) {
            parent.and();
            this._builderBetween(parent,and.between);
            this._builderWhere(parent,and.where);
            this._builderSearch(parent,and.search);
            this._builderRegExp(parent,and.regexp);
            this._builderDay(parent,and.day);
            this._builderMonth(parent,and.month);
            this._builderYear(parent,and.year);
            this._builderIn(parent,and.in);
            this._builderNotIn(parent,and.notin);
            this._builderFullText(parent,and.fulltext);
            parent.end();
        }
    },

    /**
     * builder.or
     * @param {DatabaseBuilder} parent 
     * @param {object} or
     */
    _builderOr: function(parent,or) {
        if(!this.helper.isEmpty(or) && this.helper.isObject(or) && !this.helper.isEmptyObject(or)) {
            parent.or();
            this._builderBetween(parent,or.between);
            this._builderWhere(parent,or.where);
            this._builderSearch(parent,or.search);
            this._builderRegExp(parent,or.regexp);
            this._builderDay(parent,or.day);
            this._builderMonth(parent,or.month);
            this._builderYear(parent,or.year);
            this._builderIn(parent,or.in);
            this._builderNotIn(parent,or.notin);
            this._builderFullText(parent,or.fulltext);
            parent.end();
        }
    },

    /**
     * builder.fields
     * @param {DatabaseBuilder} parent 
     * @param {array} fields
     */
    _setFields: function(parent,fields) {
        if(!this.helper.isEmpty(fields) && this.helper.isArray(fields) && !this.helper.isEmptyArray(fields)) {
            parent.fields(...fields);
        }
    },

    /**
     * builder.sort
     * @param {DatabaseBuilder} parent 
     * @param {array} sort
     */
    _setSort: function(parent,sort) {
        if(!this.helper.isEmpty(sort) && this.helper.isArray(sort) && !this.helper.isEmptyArray(sort)) {
            parent.sort(...sort);
        }
    },

    /**
     * builder.skip
     * @param {DatabaseBuilder} parent 
     * @param {string|integer} skip
     */
    _setSkip: function(parent,skip) {
        if(!this.helper.isEmpty(skip) && (this.helper.isString(skip) || this.helper.isInteger(skip))) {
            parent.skip(parseInt(skip));
        }
    },

    /**
     * builder.take
     * @param {DatabaseBuilder} parent 
     * @param {string|integer} take
     */
    _setTake: function(parent,take) {
        if(!this.helper.isEmpty(take) && (this.helper.isString(take) || this.helper.isInteger(take))) {
            parent.take(parseInt(take));
        }
    },

    /**
     * builder.page
     * @param {DatabaseBuilder} parent 
     * @param {array} page
     */
    _setPage: function(parent,page) {
        if(!this.helper.isEmpty(page) && this.helper.isArray(page) && !this.helper.isEmptyArray(page)) {
            parent.page(...page);
        }
    },

    /**
     * builder.paginate
     * @param {DatabaseBuilder} parent 
     * @param {array} paginate
     */
    _setPaginate: function(parent,paginate) {
        if(!this.helper.isEmpty(paginate) && this.helper.isArray(paginate) && !this.helper.isEmptyArray(paginate)) {
            parent.paginate(...paginate);
        }
    },

    /**
     * builder.scalar
     * @param {DatabaseBuilder} parent 
     * @param {array} scalar
     */
    _setScalar: function(parent,scalar) {
        if(!this.helper.isEmpty(scalar) && this.helper.isArray(scalar) && !this.helper.isEmptyArray(scalar)) {
            parent.scalar(...scalar);
        }
    },

    /**
     * builder.random
     * @param {DatabaseBuilder} parent 
     * @param {boolean} random
     */
    _setRandom: function(parent,random) {
        if(!this.helper.isEmpty(random) && this.helper.isBoolean(random)) {
            if(random) parent.random();
        }
    },

    /**
     * builder.query
     * @param {DatabaseBuilder} parent 
     * @param {string} query
     */
    _setQuery: function(parent,query) {
        if(!this.helper.isEmpty(query) && this.helper.isString(query)) {
            parent.query(query);
        }
    },

    /**
     * Scope for Query Select
     * @param {string} scope 
     * @param {DatabaseBuilder} parent 
     * @param {object} obj 
     */
    _selectScope: function(scope,parent,obj) {
        scope = scope.toLowerCase();
        this._setFields(parent,obj.fields);
        this._builderBetween(parent,obj.between);
        this._builderWhere(parent,obj.where);
        this._builderSearch(parent,obj.search);
        this._builderRegExp(parent,obj.regexp);
        this._builderDay(parent,obj.day);
        this._builderMonth(parent,obj.month);
        this._builderYear(parent,obj.year);
        this._builderIn(parent,obj.in);
        this._builderNotIn(parent,obj.notin);
        this._builderFullText(parent,obj.fulltext);
        if(scope == 'main' || scope == 'join') {
            this._builderAnd(parent,obj.and);
            this._builderOr(parent,obj.or);
        }
        this._setSort(parent,obj.sort);
        this._setSkip(parent,obj.skip);
        this._setTake(parent,obj.take);
        this._setPage(parent,obj.page);
        this._setPaginate(parent,obj.paginate);
        this._setScalar(parent,obj.scalar);
        this._setQuery(parent,obj.query);
        this._setRandom(parent,obj.random);
    },

    /**
     * Join Builder
     * @param {DatabaseBuilder} parent 
     * @param {object} obj 
     */
    _joinScope: function(scope,parent,obj) {
        if(!this.helper.isEmpty(obj) && this.helper.isArray(obj) && !this.helper.isEmptyArray(obj)) {
            var len = obj.length;
            var joined = [];
            for(var i=0;i<len;i++) {
                // nested join
                if(obj[i].join){
                    if(obj[i].first) {
                        joined[i] = parent.join(obj[i].name,obj[i].from).on(...obj[i].on).first();
                    } else {
                        joined[i] = parent.join(obj[i].name,obj[i].from).on(...obj[i].on);
                    }
                    this._joinScope('nested',joined[i],obj[i].join);
                } else {
                    if(obj[i].first) {
                        parent.join(obj[i].name,obj[i].from).on(...obj[i].on).first();
                    } else {
                        parent.join(obj[i].name,obj[i].from).on(...obj[i].on);
                    }
                    this._selectScope(scope,parent,obj[i]);
                }
            }
        }
    },

    /**
     * Query Builder for Select 
     * @param {object} obj 
     * @return {Promise}
     */
    _select: function(obj) {
        this.promiseStack.push(new Promise((resolve,reject) => {
            try{
                var nosql = NOSQL(obj.from);
                nosql.find().make(builder => {
                    this._selectScope('main',builder,obj);
                    
                    // join
                    this._joinScope('join',builder,obj.join);
                    
                    // callback
                    builder.callback((err,response,count)=> {
                        if(err) return reject(err);
                        resolve({
                            data:response,
                            count:count
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        }));
    },

    /**
     * Query Builder for Insert 
     * @param {object} obj 
     * @return {Promise}
     */
    _insert: function(obj) {
        var internalStack = [];
        var content = [];
        this.promiseStack.push(new Promise((resolve,reject) => {
            try{
                var nosql = NOSQL(obj.into);
                for(var i=0;i<obj.values.length;i++) {
                    (function(cntr) {
                        internalStack.push(new Promise((resolve,reject) => {
                            nosql.insert(obj.values[cntr]).callback((err, count) => {
                                if(err) return reject(err);
                                resolve({
                                    data:obj.values[cntr],
                                    count:count
                                });
                            });
                        }));
                    })(i);
                }
                Promise.all(internalStack).then(result => {
                    var len = result.length;
                    var counter = 0;
                    for (var i = 0; i < len; ++i) {
                        counter += result[i].count;
                    }
                    content.push({data:obj.into,count:counter});
                    resolve(content);
                }).catch(error=>{
                    reject(error);
                }).finally(() => {
                    content = [];
                    internalStack = [];
                });
            } catch (error) {
                reject(error);
            }
        }));
    },

    /**
     * Query Builder for Update 
     * @param {object} obj 
     * @return {Promise}
     */
    _update: function(obj) {
        this.promiseStack.push(new Promise((resolve,reject) => {
            try{
                var nosql = NOSQL(obj.from);
                nosql.update(obj.set).make(builder => {
                    this._selectScope('main',builder,obj);
                    
                    // callback
                    builder.callback((err,count)=> {
                        if(err) return reject(err);
                        resolve({
                            data:obj.set,
                            count:count
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        }));
    },

    /**
     * Query Builder for Modify 
     * @param {object} obj 
     * @return {Promise}
     */
    _modify: function(obj) {
        this.promiseStack.push(new Promise((resolve,reject) => {
            try{
                var nosql = NOSQL(obj.from);
                nosql.modify(obj.set).make(builder => {
                    this._selectScope('main',builder,obj);
                    
                    // callback
                    builder.callback((err,count)=> {
                        if(err) return reject(err);
                        resolve({
                            data:obj.set,
                            count:count
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        }));
    },


    /**
     * Query Builder for Delete 
     * @param {object} obj 
     * @return {Promise}
     */
    _delete: function(obj) {
        this.promiseStack.push(new Promise((resolve,reject) => {
            try{
                var nosql = NOSQL(obj.from);
                nosql.remove().make(builder => {
                    this._selectScope('main',builder,obj);
                    
                    // callback
                    builder.callback((err,count)=> {
                        if(err) return reject(err);
                        resolve({
                            data:obj.from,
                            count:count
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        }));
    },

    /**
     * Execute Query Builder
     * @param {callback} callback   Callback(error,data) 
     */
    exec: function(callback) {
        const toResultObject = (promise) => {
            return promise
            .then((response) => ({ status: true, response }))
            .catch(error => ({ status: false, error }));
        };

        Promise.all(this.promiseStack.map(toResultObject)).then(result => {
            var len = result.length;
            for (var i = 0; i < len; ++i) {
                this.content.push(result[i]);
            }
            var dataresult = [...this.content];
            this.clean();
            callback(null,dataresult);
        }).catch(error=>{
            callback(error);
        }).finally(() => {
            this.content = [];
            this.promiseStack = [];
        });
    },

    /**
     * Cleanup data in stackholder
     */
    clean() {
        this.content = [];
        this.promiseStack = [];
    },

    /**
     * Execute Query Builder on top Promise
     */
    promise: function() {
        return new Promise((resolve,reject) => {
            this.exec(function(err,data) {
                if(err) return reject(err);
                resolve(data);
            });
        });
    },

    /**
     * Set Query
     * @param {array} query 
     * @return {JsonQL}
     */
    query: function(query) {
        for (var key in query) {
            for (var k in query[key]) {
                if (query[key].hasOwnProperty(k)) {
                    switch(true) {
                        case (k == 'insert'):
                            this._insert(query[key].insert);
                            break;
                        case (k == 'update'):
                            this._update(query[key].update);
                            break;
                        case (k == 'modify'):
                            this._modify(query[key].modify);
                            break;
                        case (k == 'delete'):
                            this._delete(query[key].delete);
                            break;
                        default:
                            this._select(query[key].select);
                    }
                }
            }
        }
        return this;
    }

};

module.exports = JsonQL;
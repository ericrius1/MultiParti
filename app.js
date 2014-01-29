
/**
 * Module dependencies.
 */
var path_ = require('path');
var spa = require('koa-spa');
var route = require('koa-route');
var serve = require('koa-static');
var parse = require('co-body');
var logger = require('koa-logger');
var koa = require('koa');
var wrap = require('co-monk');
var monk = require('monk');


var db = monk('localhost/multi-party');
var worlds = wrap(db.get('worlds'));

var app = koa();

// middleware
app.use(logger());

app.use(spa(path_.join(__dirname, ''), {
	index: 'index.html'
}));



app.listen(3000);
console.log('listening on port 3000');
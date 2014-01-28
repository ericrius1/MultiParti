
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var route = require('koa-route');
var serve = require('koa-static')
var views = require('co-views');
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

//Serve static files
app.use(serve(__dirname + '/public'));

// route middleware
app.use(route.get('/', home));
app.use(route.get('/world', list));
app.use(route.get('/world/new', add));
app.use(route.get('/world/:id', show));
app.use(route.post('/world', create));

// route definitions

function *home() {
  this.body = yield render('layout.jade')
}

/**
 * Post listing.
 */

function *list() {
  allWorlds = yield worlds.find({})
  this.body = yield render('list.jade', {worlds: allWorlds});
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  this.body = "post!"
}

/**
 * Create a post.
 */

function *create() {
  this.redirect('/');
}

// listen

app.listen(3000);
console.log('listening on port 3000');
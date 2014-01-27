
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var logger = require('koa-logger');
var koa = require('koa');
var wrap = require('co-monk');
var monk = require('monk');


var db = monk('localhost/multi-party');
var worlds = wrap(db.get('worlds'));

var app = koa();

// "database"

var posts = [];

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));
app.use(route.get('/hibbidy', test));

// route definitions

/**
 * Post listing.
 */

function *list() {
  allWorlds = yield worlds.find({})
  console.log(worlds)
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
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
  var post = yield parse(this);
  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

function *test(){
  this.body = "yO! test!!"
}

// listen

app.listen(3000);
console.log('listening on port 3000');
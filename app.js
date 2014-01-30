
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

var routes = {}


app.use(route.get('/world', list));

app.use(spa(path_.join(__dirname, ''), {
  index: 'index.html',
  routeBase: '/'
}));


function *list() {
  var res = yield worlds.find({})
  this.body = res

}
// add your custom 404 page
app.use(function* () {
// requests not matching the routes will have a status of 404 by now,
// but the response it not yet sent
	if (this.status == 404) {
	  res.body = 'Nothing Here.';
	}
});





app.listen(3000);
console.log('listening on port 3000');
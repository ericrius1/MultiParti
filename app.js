//mongoimport --db ArtWorld --collection artworks --file db.json
/**
 * Module dependencies.
 */
var path_ = require('path');
var spa = require('koa-spa');
var router = require('koa-route');
var serve = require('koa-static');
//this allows us to parse the native req object to get the body
var parse = require('co-body');
var logger = require('koa-logger');
var koa = require('koa');
var wrap = require('co-monk');
var monk = require('monk');


var db = monk('localhost/artworld');
var artworks = wrap(db.get('artworks'));

var app = koa();

// middleware
app.use(logger());



app.use(router.post('/artworks', save));
app.use(router.get('/artworks', list));
app.use(router.get('/artworks/:id', sendOne))

app.use(spa(path_.join(__dirname, ''), {
  index: 'index.html',
  routeBase: '/'
}));


function *list() {
  var res = yield artworks.find({});
  this.body = res;

}

function *sendOne(id) {

}

function *save() {
  var emitters = yield parse.json(this);
  console.log("ARTWORK: ",  emitters);
  yield artworks.insert({emitters: emitters})
  this.body = 'sucess'
  console.log("CONTEXT", this)

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
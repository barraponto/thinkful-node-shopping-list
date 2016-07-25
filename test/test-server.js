var chai = require('chai');
var http = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(http);

describe('Shopping List', function(){
  it('should list items on get', function(done){
    chai.request(app).get('/items').end(function(err, res){
      should.not.exist(err);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.length(storage.items.length);
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('id');
      res.body[0].id.should.be.a('number');
      res.body[0].name.should.be.a('string');
      res.body[0].name.should.equal('Broad beans');
      res.body[1].name.should.equal('Tomatoes');
      res.body[2].name.should.equal('Peppers');
      done();
    });
  });
  it('should add items on post', function(done){
    chai.request(app).post('/items').send({'name': 'Kale'}).end(function(err, res){
      should.not.exist(err);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.name.should.equal('Kale');
      storage.items.should.be.a('array');
      storage.items.should.have.length(4);
      storage.items[3].should.be.a('object');
      storage.items[3].should.have.property('id');
      storage.items[3].should.have.property('name');
      storage.items[3].id.should.be.a('number');
      storage.items[3].name.should.be.a('string');
      storage.items[3].name.should.equal('Kale');
      done();
    });
  });
  it('should edit item on put', function(done){
    chai.request(app).put('/items/1').send({'name': 'Broccoli'}).end(function(err, res){
      should.not.exist(err);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.name.should.equal('Broccoli');
      storage.items.should.be.a('array');
      storage.items.should.have.length(4);
      item = storage.get(1);
      item.should.be.a('object');
      item.should.have.property('id');
      item.should.have.property('name');
      item.id.should.be.a('number');
      item.name.should.be.a('string');
      item.id.should.equal(1);
      item.name.should.equal('Broccoli');
      done();
    });
  });
  it('should not edit non-existing item', function(done){
    chai.request(app).put('/items/9').send({'name': 'Broccoli'}).end(function(err, res){
      err.status.should.equal(404);
      done();
    });
  });
  it('should delete item on delete', function(done){
    chai.request(app).delete('/items/1').end(function(err, res){
      should.not.exist(err);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      res.body.id.should.be.a('number');
      res.body.name.should.be.a('string');
      res.body.name.should.equal('Broccoli');
      storage.items.should.be.a('array');
      item = storage.get(1);
      should.not.exist(item);
      done();
    });
  });
  it('should not delete non-existing item', function(done){
    chai.request(app).delete('/items/9').end(function(err, res){
      err.status.should.equal(404);
      done();
    });
  });
});

var express = require('express');
var parsers = require('body-parser');
var jsonParser = parsers.json();

var Storage = require('./storage.js');

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response){
  response.json(storage.items);
});

var requireBody = function(request, response, next){
  if (!request.body) {
    response.sendStatus(400);
  } else {
    next();
  }
};

app.post('/items', jsonParser, requireBody, function(request, response){
  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, requireBody, function(request, response){
  var item = storage.remove(request.params.id);
  if (item) {
    response.status(200).json(item);
  } else {
    response.sendStatus(404);
  }
});

app.listen(process.env.PORT || 3000);

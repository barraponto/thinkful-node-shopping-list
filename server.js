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

app.post('/items', jsonParser, function(request, response){
  if (!request.body) { return response.sendStatus(400); }
  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.listen(process.env.PORT || 3000);

var express = require('express');
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

app.listen(process.env.PORT || 3000);

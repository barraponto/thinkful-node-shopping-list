var Storage = function(){
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function(name){
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id++;
  return item;
};

Storage.prototype.get = function(id){
  return this.items.find(function(item){ return item.id == id; });
};

Storage.prototype.remove = function(id) {
  var item = this.get(id);
  if (item) {
    this.items = this.items.filter(function(item) { return item.id != id; });
  }
  return item;
};

Storage.prototype.update = function(id, update) {
  // ensure id is kept on update
  update.id = Number(id);
  this.items = this.items.map(function(item) {
      return item.id == id ? update : item;
  });
  return this.get(id);
};

module.exports = Storage;

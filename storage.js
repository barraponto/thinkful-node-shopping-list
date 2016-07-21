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

module.exports = Storage;

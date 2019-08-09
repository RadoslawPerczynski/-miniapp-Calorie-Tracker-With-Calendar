const ItemController = (function() {

  data = {
    currentItem: null,
    items: [
      
    ]
  };

  //new item constructor
  const Item = function(inputObject) {
    ({date: this.date, name: this.name, calories: this.calories, id: this.id} = inputObject);
  };

  const createItemId = function() {
    const currentNumberOfItems = data.items.length;
    let ID;

    if(currentNumberOfItems > 0) {
      maxCurrentId = data.items[currentNumberOfItems-1].id;
      ID = maxCurrentId + 1;
    } else {
      ID = 0;
    }

    return ID;
  };

  return {
    addItem: function(inputObj) {
      const itemID = createItemId();
      inputObj.id = itemID;
      const newitem = new Item(inputObj);
      data.items.push(newitem);
      return newitem;
    },
    logData: function() {
      console.log(data.currentItem, data.items);
    }
  }
})();
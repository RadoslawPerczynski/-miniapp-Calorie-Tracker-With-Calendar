const ItemController = (function() {

  data = {
    currentItem: null,
    // items: [
    //   // {date: "12/09/2019", name: "Radek100", calories: "100", id: 0},
    //   // {date: "22/07/2019", name: "Radek200", calories: "200", id: 1},
    //   // {date: "11/10/2019", name: "Radek300", calories: "400", id: 2},
    //   // {date: "13/08/2019", name: "Radek800", calories: "800", id: 3}
    // ]
    items: StorageController.getDataFromLS()
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
    extractIdNumberFromEntireItemId: function(idPhrase) {
      const idAsArray = idPhrase.split('-');
      const idNoToReturn = parseInt(idAsArray[1]);
      return idNoToReturn;
    },
    getAllItems: function() {
      return data.items;
    },

    getItemById: function(id) {
      let found = data.items.find(function(item) {
        return item.id === id;
      });
      
      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      
      return data.currentItem;
    },
    updateItem: function(updatedItem) {

      const itemToReturn = data.items.find(function(x) {

        if(x.id === data.currentItem.id) {
          x.name = updatedItem.name;
          x.date = updatedItem.date;
          x.calories = updatedItem.calories;
          return x;
        }

      });
      return itemToReturn;

    },
    deleteItem: function(item) {
      const newArrayOfItems = data.items.filter(x => x.id != item.id);
      data.items = newArrayOfItems;

    },
    deleteAllItems: function() {
      data.items.length = 0;
    },

    getTotalCaloriesPerDay: function() {

      let totalCaloriesPerDayObj = {};
      
      data.items.forEach(function(itemObj) {

        const DateKey = itemObj.date;
        const CaloriesValue = parseInt(itemObj.calories);

        if(!totalCaloriesPerDayObj.hasOwnProperty(DateKey)) {
          
          totalCaloriesPerDayObj[DateKey] = CaloriesValue;

        } else {
          const currentCaloriesValue =  totalCaloriesPerDayObj[DateKey];
          totalCaloriesPerDayObj[DateKey] = currentCaloriesValue + CaloriesValue

        }
      })
      
      return totalCaloriesPerDayObj;
      
    },

    logData: function() {
      console.log(data.currentItem, data.items);
    }
  }
})();

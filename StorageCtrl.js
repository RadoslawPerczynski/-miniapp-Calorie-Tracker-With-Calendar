const StorageController = (function() {

  return {
    syncDataWithLocalStorage: function(arrayOfItems) {
      const itemsAsString = JSON.stringify(arrayOfItems);
      localStorage.setItem('calorieTrackerItems', itemsAsString);
    },

    getDataFromLS: function() {
      let retrievedData = [];

      if(localStorage.getItem('calorieTrackerItems') === null) {
          localStorage.setItem('calorieTrackerItems', '[]')
          
      } else {
        retrievedData = JSON.parse(localStorage.getItem('calorieTrackerItems'));
      }

      return retrievedData;

    }

  }
})();
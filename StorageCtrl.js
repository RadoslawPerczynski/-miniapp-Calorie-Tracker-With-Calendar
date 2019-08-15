const StorageController = (function() {

  return {
    syncDataWithLocalStorage: function(arrayOfItems) {
      const itemsAsString = JSON.stringify(arrayOfItems);
      localStorage.setItem('calorieTrackerItems', itemsAsString);
    },

    getDataFromLS: function() {
      const retrievedData = localStorage.getItem('calorieTrackerItems') || [];

      return JSON.parse(retrievedData);

    }

  }
})();
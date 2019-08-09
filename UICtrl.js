const UIController = (function() {
  const UISelectors = {
    datepicker: ".datepicker",
    range: "#range",
    itemCaloriesField: "#item-calories",
    itemNameField: "#item-name",
    itemDateField: "#item-date",
    addBtn: ".add-btn",

  }
  const $q = document.querySelector.bind(document);

  return {
    initializeDatePicker: function() {
        const datepicker = $q(UISelectors.datepicker);
        M.Datepicker.init(datepicker, {
              autoClose: true,
              format: "dd/mm/yyyy"
            });
    },

    initializeRange: function() {
      const range = $q(UISelectors.range);
      const caloriesField = $q(UISelectors.itemCaloriesField);

      caloriesField.addEventListener('input', e => range.value = e.target.value);
      range.addEventListener("input", e => caloriesField.value = e.target.value);
    },
    getSimplifiedUIQuery: function() {
      return $q;
    },

    getSelectors: function() {
      return UISelectors;
    },
    getInputDataOfNewItem: function() {
      const [name, date, calories] = [$q(UISelectors.itemNameField).value, $q(UISelectors.itemDateField).value, $q(UISelectors.itemCaloriesField).value];

      const [itemName, itemDate, itemCalories ] = [name, date, calories];

      return {
        date: itemDate,
        name: itemName, 
        calories: itemCalories
      }
    },
    addItemToTheUI: function(item) {
      console.log(item);
      console.log('Now its the time to add the item to UI baby')
    }

   
  }
})();
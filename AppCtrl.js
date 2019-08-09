const AppController = (function() {

  const $q = UIController.getSimplifiedUIQuery();

  const loadEventListeners = function() {
    const UISelectors = UIController.getSelectors();
    $q(UISelectors.addBtn).addEventListener('click', itemAddOnSubmit);

  };
  
  const itemAddOnSubmit = function(e) {
    e.preventDefault();
    const inputObject = UIController.getInputDataOfNewItem();
    
    const item = ItemController.addItem(inputObject);

    //draw the stuff on ui
    UIController.addItemToTheUI(item);


  };

  return {
    init: function() {
      UIController.initializeDatePicker();
      UIController.initializeRange();
      loadEventListeners();

    }
  }
})();

//App init.
document.addEventListener('DOMContentLoaded', function() {
  AppController.init();
});



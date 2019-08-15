const AppController = (function() {

  const $q = UIController.getSimplifiedUIQuery();

  const loadEventListeners = function() {
    const UISelectors = UIController.getSelectors();
    $q(UISelectors.addBtn).addEventListener('click', itemAddOnSubmit);
    $q(UISelectors.updateBtn).addEventListener('click', updateItemOnSubmit);  
    // $q(UISelectors.deleteBtn).addEventListener('click', editItemOnClick);
    // $q(UISelectors.backBtn).addEventListener('click', editItemOnClick);
    
    $q(UISelectors.cardsContainer).addEventListener('click', editItemOnClick);
    
  };

  const loadData = function() {
    return ItemController.getAllItems();
  };
  
  const itemAddOnSubmit = function(e) {
    e.preventDefault();
    const inputObject = UIController.getInputData();
    
    const item = ItemController.addItem(inputObject);

    //draw the stuff on ui
    UIController.addItemToTheUI(item);


  };
  const editItemOnClick = function(e) {
    e.preventDefault();

    if(e.target.classList.contains('edit-item')) {
      //get the id of the item
      const itemIdPhrase = e.target.parentNode.parentNode.id;
      const itemIdNumber = ItemController.extractIdNumberFromEntireItemId(itemIdPhrase);
      
      const currentItemToEdit = ItemController.getItemById(itemIdNumber);
      
      ItemController.setCurrentItem(currentItemToEdit);
      UIController.addCurrentItemToForm();


    }
  };
  const updateItemOnSubmit = function(e) {
    e.preventDefault();
    const updatedItemDetails = UIController.getInputData();

    const updatedItem = ItemController.updateItem(updatedItemDetails);

    UIController.updateItemInTheUI(updatedItem);
    const totalCaloriesObject = ItemController.getTotalCaloriesPerDay();
    UIController.setTotalCaloriesForEachCard(totalCaloriesObject);

  };


  return {
    init: function() {
      UIController.initializeDatePicker();
      UIController.initializeRange();
      loadEventListeners();
      UIController.convertDataToUIList(loadData());

    }
  }
})();

//App init.
document.addEventListener('DOMContentLoaded', function() {
  AppController.init();
});



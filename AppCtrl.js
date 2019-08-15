const AppController = (function() {

  const $q = UIController.getSimplifiedUIQuery();

  const loadEventListeners = function() {
    const UISelectors = UIController.getSelectors();
    $q(UISelectors.addBtn).addEventListener('click', itemAddOnSubmit);
    $q(UISelectors.updateBtn).addEventListener('click', updateItemOnSubmit);  
    $q(UISelectors.deleteBtn).addEventListener('click', itemDeletionSubmit);
    $q(UISelectors.backBtn).addEventListener('click', UIController.goBack);
    $q(UISelectors.cardsContainer).addEventListener('click', editItemOnClick);
    $q(UISelectors.clearAll).addEventListener('click', deleteAllData);
  };

  const loadData = function() {
    return ItemController.getAllItems();
  };
  
  const itemAddOnSubmit = function(e) {
    e.preventDefault();
    const inputObject = UIController.getInputData();
    
    inputValuesArray = Object.values(inputObject);
    
    inputValuesArray.some(function(elem) {
      if (elem === '') {
        UIController.showMessage();
        throw "Fill all the fields";
      }
    });

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

  const itemDeletionSubmit = function(e) {
    e.preventDefault();
    const itemToDelete = ItemController.getCurrentItem();
    ItemController.deleteItem(itemToDelete);
    UIController.deleteItemFromUI(itemToDelete);

  };
  const deleteAllData = function() {
   
    const areYouSure = confirm('All data will be lost. Are you sure?');

    if(areYouSure) {
      UIController.deleteAllItems();
      ItemController.deleteAllItems();
    }
  
  };


  return {
    init: function() {
      UIController.initializeDatePicker();
      UIController.initializeRange();
      loadEventListeners();
      UIController.convertDataToUIList(loadData());
      UIController.sortCards();

    }
  }
})();

//App init.
document.addEventListener('DOMContentLoaded', function() {
  AppController.init();
});



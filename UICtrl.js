const UIController = (function() {
  const UISelectors = {
    datepicker: ".datepicker",
    range: "#range",
    itemCaloriesField: "#item-calories",
    itemNameField: "#item-name",
    itemDateField: "#item-date",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearAll: ".clear-btn",
    cardsContainer: ".cards-container",
    card: ".date-card",
    itemList: ".item-list",
    item: ".collection-item",
    totalKcal: ".totalKcal",
    buttonsContainer: ".buttons-container",
    errorMessage: ".error-message"

  }
  const $q = document.querySelector.bind(document);
  const $qa = document.querySelectorAll.bind(document);

  const convertDateToCardId = function(date) {
    const re = /[A-Za-z0-9]/;
    const idArray = date.split('').filter(char =>  re.test(char));
    const idToReturn = 'card-' + idArray.join('').toUpperCase();
    return idToReturn.toString();

  };
  const convertItemObjectIdToHtmlID = function(id) {
    return `item-${id}`;
  };

  const createCard = function(item) {
    cardHtml = `
    <div class="col s12 m6 date-card" id="${convertDateToCardId(item.date)}">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">${item.date}</span>
        <ul class="collection black-text item-list" >
        </ul>
        <span class="totalKcal"></span>
      </div>
    </div>
  </div>
    `;
    $q(UISelectors.cardsContainer).insertAdjacentHTML('beforeend', cardHtml);

  };
  
  const getAllDateCards = function() {
    return Array.from($qa(UISelectors.card))
  };



  const setItemContent = function(item) {

    const html = `
      <strong>${item.name}: </strong> <br> 
      <em>${item.calories} kcal</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    `;

    return html;
  }

  const createListItem = function(item) {
    const li = document.createElement('li');
    li.className = "collection-item";
    li.setAttribute('data-d', 'Hello World!');
    li.id = convertItemObjectIdToHtmlID(item.id);
    
    li.innerHTML = setItemContent(item);

    return li;


  }

  const assignItemToExistingCard = function(item) {

    
    const existingCardID = '#' + convertDateToCardId(item.date);
    const cardToAddItem = $q(existingCardID);

   
      const elementToAppend = createListItem(item);
      cardToAddItem.querySelector(UISelectors.itemList).appendChild(elementToAppend); 


  };
  const deleteItem = function(item) {
    
    const itemIdToDelete = "#" + convertItemObjectIdToHtmlID(item.id);
    const htmlItemToDelete = $q(itemIdToDelete);

    htmlItemToDelete.remove();
  
  };
  const deleteEmptyCardsFromTheUI = function() {
    const allcards = getAllDateCards();
    allcards.forEach(function(card) {

      if( card.querySelector(UISelectors.itemList).children.length === 0 ) {
        card.remove();
      }
    
    })
  };

  const showEditState = function() {
    $q(UISelectors.addBtn).style.display = 'none';
    $q(UISelectors.updateBtn).style.display = 'inline-block';
    $q(UISelectors.deleteBtn).style.display = 'inline-block';
    $q(UISelectors.backBtn).style.display = 'inline-block';

  };
  const clearEditState = function() {
    $q(UISelectors.addBtn).style.display = 'inline-block';
    $q(UISelectors.updateBtn).style.display = 'none';
    $q(UISelectors.deleteBtn).style.display = 'none';
    $q(UISelectors.backBtn).style.display = 'none';
  };
  const clearInputs = function() {
    $q(UISelectors.itemNameField).value = "";
    $q(UISelectors.itemCaloriesField).value = "";
    $q(UISelectors.itemDateField).value = "";
    
  };

  return {
    initializeDatePicker: function() {
        const datepicker = $q(UISelectors.datepicker);
        M.Datepicker.init(datepicker, {
              autoClose: true,
              format: "dd/mm/yyyy",
              defaultDate: new Date()
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
    getInputData: function() {
      const [name, date, calories] = [$q(UISelectors.itemNameField).value, $q(UISelectors.itemDateField).value, $q(UISelectors.itemCaloriesField).value];

      const [itemName, itemDate, itemCalories ] = [name, date, calories];

      return {
        date: itemDate,
        name: itemName, 
        calories: itemCalories
      }
    },
    showMessage: function() {
     
      if($q(UISelectors.errorMessage) === null) {

        let error = document.createElement('div');
        error.className = "error-message center-align red lighten-1 white-text";
        error.style.margin = "10px 0";
        error.style.padding = "10px";
        let textnode = document.createTextNode("Fill all the fields!"); 
        error.appendChild(textnode); 
        
        $q(UISelectors.buttonsContainer).insertBefore(error, $q(UISelectors.addBtn).nextSibling ) ;
        
        setTimeout(function() {
          error.remove();
        }, 2500)
      }

    },
     sortCards: function() {
      const allcards = getAllDateCards();
      allcards.sort(function(a,b) {
        console.log('hah')
      });
    },

    addItemToTheUI: function(item) {  

      const allcards = getAllDateCards();
      const cardIds = allcards.map(card=>card.id);

      //check if the card with this ID already exist
      if(!cardIds.includes(convertDateToCardId(item.date))) {
        createCard(item);
      }

      assignItemToExistingCard(item);
      clearInputs();

    },

    updateItemInTheUI: function(item) {
      //this should be responsible for update the content if the date is the same or change the place in the UI while ID should stay the same.

      const itemID = "#"+ convertItemObjectIdToHtmlID(item.id);
      const existingItem = $q(itemID);

      
      const existingCardID = existingItem.closest('.date-card').id;
      //if the item is being updated but the card doesn't change, we only set new data in the UI
      if(existingCardID === convertDateToCardId(item.date)) {
        //set an updated content of existing item
        existingItem.innerHTML = setItemContent(item);

      } else {
        //if the card does change, we need to delete existing item from the UI. Just in case if the card is empty we delete the card as well. Then we are adding the updated item like it was a normal new item. The ID remains the same though.
        deleteItem(item);
        
        deleteEmptyCardsFromTheUI();
        UIController.addItemToTheUI(item);
        

      }
      clearEditState();
      clearInputs();

    },
    deleteItemFromUI: function(item) {
      deleteItem(item);
      clearInputs();
      clearEditState();
      deleteEmptyCardsFromTheUI();
    },
    goBack: function() {
      clearInputs();
      clearEditState();
    },
    deleteAllItems: function() {
      allcards = getAllDateCards();
      allcards.forEach(card => card.remove());
      clearEditState();
      clearInputs();
    },

    addCurrentItemToForm: function() {
      const currentItem = ItemController.getCurrentItem();
      $q(UISelectors.itemNameField).value = currentItem.name;
      $q(UISelectors.itemCaloriesField).value = currentItem.calories;
      $q(UISelectors.itemDateField).value = currentItem.date;

      showEditState();
    },

    convertDataToUIList: function(arrayOfObjects) {

      arrayOfObjects.forEach( item => {
        UIController.addItemToTheUI(item);
      })

      const totalCaloriesPerDay = ItemController.getTotalCaloriesPerDay();

      UIController.setTotalCaloriesForEachCard(totalCaloriesPerDay);
      
    },

    
  setTotalCaloriesForEachCard: function(dateCaloriesObject) {
      //iterate through the received object of key-value pairs and assign the calories to the proper card
      Object.entries(dateCaloriesObject).forEach(function([key, value]) {
        const cardID = convertDateToCardId(key);
        $q('#' + cardID).querySelector(UISelectors.totalKcal).textContent = `Total: ${value} kcal`;
      });
    }

   
  }
})();
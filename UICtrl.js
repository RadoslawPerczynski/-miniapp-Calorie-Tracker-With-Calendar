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
    cardsContainer: ".cards-container",
    card: ".date-card",
    itemList: ".item-list",
    item: ".collection-item"

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
      </div>
    </div>
  </div>
    `;
    $q(UISelectors.cardsContainer).insertAdjacentHTML('beforeend', cardHtml);

  };
  
  const getAllDateCards = function() {
    return Array.from($qa(UISelectors.card))
  };

  const getAllItems = function() {
    return Array.from($qa(UISelectors.item))
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
  const deleteItemFromUI = function(item) {
    
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
  clearEditState = function() {
    $q(UISelectors.addBtn).style.display = 'inline-block';
    $q(UISelectors.updateBtn).style.display = 'none';
    $q(UISelectors.deleteBtn).style.display = 'none';
    $q(UISelectors.backBtn).style.display = 'none';
  }

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
    addItemToTheUI: function(item) {  

      const allcards = getAllDateCards();
      const cardIds = allcards.map(card=>card.id);

      //check if the card with this ID already exist
      if(!cardIds.includes(convertDateToCardId(item.date))) {
        createCard(item);
      }

      assignItemToExistingCard(item);

    },

    updateItemInTheUI: function(item) {
      //this should be responsible for update the content if the date is the same or change the place in the UI when ID should stay the same.

      const itemID = "#"+ convertItemObjectIdToHtmlID(item.id);
      const existingItem = $q(itemID);

      //if the card didnt change
      const existingCardID = existingItem.closest('.date-card').id;

      if(existingCardID === convertDateToCardId(item.date)) {
      
        existingItem.innerHTML = setItemContent(item);

      } else {
        //if the card changes
        deleteItemFromUI(item);
        
        deleteEmptyCardsFromTheUI();
        UIController.addItemToTheUI(item);

      
      //if the card is going to change - we need to create another card - done
      // then delete existing item
      //then create another item with same ID as that one deleted.
      //but what if the content changes and card changes too??

      }


    },

    addCurrentItemToForm: function() {
      const currentItem = ItemController.getCurrentItem();
      $q(UISelectors.itemNameField).value = currentItem.name;
      $q(UISelectors.itemCaloriesField).value = currentItem.calories;
      $q(UISelectors.itemDateField).value = currentItem.date;

      showEditState();
    },

    convertDataToUIList: function(arrayOfObjects) {
      console.log('conversion to ui');

      arrayOfObjects.forEach( item => {
        UIController.addItemToTheUI(item);
      })
    }

   
  }
})();
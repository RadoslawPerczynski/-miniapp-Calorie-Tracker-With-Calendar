const UIController = (function() {
  const UISelectors = {
    datepicker: ".datepicker",
    range: "#range",
    itemCaloriesField: "#item-calories",
    itemNameField: "#item-name",
    itemDateField: "#item-date",
    addBtn: ".add-btn",
    cardsContainer: ".cards-container",
    card: ".date-card",
    itemList: ".item-list"

  }
  const $q = document.querySelector.bind(document);
  const $qa = document.querySelectorAll.bind(document);

  const convertDateToCardId = function(date) {
    const re = /[A-Za-z0-9]/;
    const idArray = date.split('').filter(char =>  re.test(char));
    const idToReturn = 'card-' + idArray.join('').toUpperCase();
    return idToReturn.toString();

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

  const createListItem = function(item) {
    const li = document.createElement('li');
    li.className = "collection-item";
    li.id = `item-${item.id}`;
    
    li.innerHTML = `
      <strong>${item.name}: </strong> <br> 
      <em>${item.calories} kcal</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    `;

    return li;


  }

  const assignItemToExistingCard = function(item) {

    const allCards = getAllDateCards();
    const existingCardID = '#' + convertDateToCardId(item.date);
    const cardToAddItem = $q(existingCardID);

    const elementToAppend = createListItem(item);
    cardToAddItem.querySelector(UISelectors.itemList).appendChild(elementToAppend);

    //document.querySelector("#post").querySelectorAll('.thumb')

    //allcards.forEach(function)

  
   

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

      const allcards = getAllDateCards();
      const cardIds = allcards.map(card=>card.id);

      //check if the card with this ID already exist
      if(!cardIds.includes(convertDateToCardId(item.date))) {
        createCard(item);
      }

      assignItemToExistingCard(item);

     
    }

   
  }
})();
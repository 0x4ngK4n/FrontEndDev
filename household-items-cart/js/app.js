class UI {
  constructor() {
    this.itemFeedback = document.querySelector(".item-feedback");
    this.itemStatus = document.getElementById("item-status");
    this.itemName = document.getElementById("item-name");
    this.itemWeight = document.getElementById("item-weight");
    this.itemQuantity = document.getElementById("item-quantity");
    this.itemForm = document.getElementById('item-form');
    this.itemList = [];
    this.itemID = 0;
    this.rowID = 0;
  }
  // click add item '+' button
  addGoodDetails() {
    // when user clicks, I add new item rew to the DOM
    // perfrom form validation
    let tmp = 'row_'+this.rowID;
    console.log(tmp);
    if (document.getElementById(tmp).children[1].children[0].value === "" || document.getElementById(tmp).children[2].children[0].value === "" || document.getElementById(tmp).children[3].value === "Item quantity" ) {
      // validation fails then show the error
      this.itemFeedback.classList.add('showItem')
      this.itemFeedback.innerHTML = `<p> Item values cannot be empty or imvalid</p>`;
      setTimeout(() => {
        this.itemFeedback.classList.remove('showItem');
      }, 4000);
    } else {
      const div = document.createElement('div');
      div.classList.add('form-row')
      div.innerHTML = `
        <div class="col-xs-1">
          <input class="form-control item-input" type="checkbox" checked="checked" value="" id="item-status">
        </div>
        <div class="col-sm">
          <input type="text" class="form-control item-input" id="item-name" placeholder="Item name">
        </div>
        <div class="col-sm">
          <input type="text" class="form-control item-input" id="item-weight" placeholder="Item weight">
        </div class="col-sm">
        <select class="form-select item-input" id="item-quantity" size="1">
          <option selected>Item quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
      </select>
      <button type="submit" class="btn text-capitalize add-good" id="add-good-submit">+</button>
      <button type="submit" class="btn text-capitalize remove-good" id="remove-good-submit">-</button>
     `;
     this.rowID++;
     div.setAttribute('id','row_'+this.rowID);
     this.itemForm.appendChild(div);
     let items = {
      id: this.itemID,
      name: this.itemName.value,
      weight: this.itemWeight.value,
      quantity: this.itemQuantity.value
    }
    this.itemID++;
    this.itemList.push(items);
    console.log(this.itemList);
    }
  }
  // click remove item '-' button
  removeGoodDetails(id) {
    if (id !== "row_0") {
      let rownumber = id.split("_")[1];
      // decrement rowID after every deletion
      rownumber -= 1;
      var toRemoveRow = document.getElementById(id);
      toRemoveRow.remove();
      this.rowID = rownumber;
      // ToDo delete the itemList as well
    }
  }
  // submit item form via 'Order' button
  submitItemForm() {
    console.log("submit goods");
  }
}

function eventListeners() {
// when clicking on '+' or '-' button
//const addGood = document.getElementById('add-good-submit')
const modifyGood = document.getElementById('item-form')
// when submitting via'Orders' button
const itemSubmit = document.getElementById('item-submit')

// UI class instance
const ui = new UI()

// event listeners for user actions
modifyGood.addEventListener('click', function(event){
  event.preventDefault();
  // reference: https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/
  if (event.target.textContent === "+") {
    ui.addGoodDetails();
  }
  if (event.target.textContent === "-") {
    ui.removeGoodDetails(event.target.parentElement.id);
  }
});
itemSubmit.addEventListener('submit', function(event){
  ui.submitItemForm();
});
}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
});
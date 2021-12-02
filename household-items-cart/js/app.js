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
    this.rowNumber = 0;
  }
  // click add item '+' button
  addGoodDetails(rowid) {
    // when user clicks, I add new item rew to the DOM
    // perfrom form validation
    const currentItemName = document.getElementById(rowid).children[1].children[0].value;
    const currentItemWeight = document.getElementById(rowid).children[2].children[0].value;
    const currentItemQuantity = document.getElementById(rowid).children[3].value;
    if (currentItemName === "" || currentItemWeight === "" || currentItemQuantity === "Item quantity" ) {
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
          <input class="form-control item-input" type="checkbox" value="" id="item-status">
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
     this.rowNumber++;
     div.setAttribute('id','row_'+this.rowNumber);
     this.itemForm.appendChild(div);
     let items = {
      id: this.itemID,
      name: currentItemName,
      weight: currentItemWeight,
      quantity: currentItemQuantity
    }
    this.itemID++;
    this.itemList.push(items);
    //console.log(this.itemList);
    }
  }
  // click remove item '-' button
  removeGoodDetails(id) {
    if (id !== "row_0") {
      let rownumber = id.split("_")[1];
      // just remove the element from dom
      var toRemoveRow = document.getElementById(id);
      toRemoveRow.remove();
      console.log(this.itemList[rownumber]);
      this.makeRequest("delete",this.itemList[rownumber]);
      // delete the element in itemList as well
      this.itemList.splice(rownumber,1);
    }
  }
  // submit item form via 'Order' button
  submitItemForm() {
    this.makeRequest("submit", this.itemList);
  }
  // debug: skeletal function; needs refining
  makeRequest(type, obj) {
    if (type === "submit") {
      let xhr = new XMLHttpRequest();
      // debug placeholder URL
      let url = "http://127.0.0.1:8080/submit";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      // Create a state change callback
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            result.innerHTML = this.responseText;
        }
      };
      xhr.send(JSON.stringify(obj))
    }
    else if (type === "delete") {
      let xhr = new XMLHttpRequest();
      // debug placeholder URL
      let url = "http://127.0.0.1:8080/delete";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      // Create a state change callback
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            result.innerHTML = this.responseText;
        }
      };
      xhr.send(JSON.stringify(obj))
    }
  }
}

function eventListeners() {
// when clicking on '+' or '-' button
const modifyGood = document.getElementById('item-form')
// when changing item status
const modifyGoodStatus = document.getElementById('item-status')
// when submitting via'Orders' button
const itemSubmit = document.getElementById('item-submit')

// UI class instance
const ui = new UI()

// event listeners for user actions
modifyGood.addEventListener('click', function(event){
  event.preventDefault();
  // reference: https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/
  if (event.target.textContent === "+") {
    ui.addGoodDetails(event.target.parentElement.id);
  }
  if (event.target.textContent === "-") {
    ui.removeGoodDetails(event.target.parentElement.id);
  }
});

modifyGoodStatus.addEventListener('click', function(event){
  console.log('click');
});

itemSubmit.addEventListener('click', function(event){
  console.log("pressed");
  ui.submitItemForm();
});

}

document.addEventListener('DOMContentLoaded', function(){
  console.log("hi there")
  eventListeners();
});
var array = [];
var index = 0;
var idsOfInputs = [
  "id",
  "itemName",
  "department",
  "category",
  "quantity",
  "price",
  "rating",
  "brandname",
  "description",
];
function testarray() {
  window["global_array"] = eval(
    "(" + localStorage.getItem("global_array") + ")"
  );
  // const data = localStorage.getItem('mydata');
  console.log("shared array", array);
}
function createEditButton() {
  let editTd = document.createElement("td");
  let button = document.createElement("button");
  button.innerHTML = "Edit";
  button.setAttribute("myId", index);
  button.onclick = function () {
    //this -> button, this.parentNode->td,this.parentNode.parentNode->tr
    let childNodes = this.parentNode.parentNode.childNodes;
    this.parentNode.parentNode.setAttribute("editing", "true");
    for (let i = 0; i <= 9; i++) {
      console.log(document.getElementById(idsOfInputs[i]).value);
      document.getElementById(idsOfInputs[i]).value = childNodes[i].innerHTML;
    }
    document.getElementById("mode").value = "Edit";
    let myId = this.getAttribute("myId");
    array.forEach(function (item) {
      if (item.id == myId) {
        item.name = document.getElementById("itemName").value;
        item.category = document.getElementById("category").value;
        item.price = document.getElementById("price").value;
        item.rating = document.getElementById("rating").value;
        item.department = document.getElementById("department").value;
        item.quantity = document.getElementById("quantity").value;
        item.rating = document.getElementById("rating").value;
        item.brandname = document.getElementById("brandname").value;
        item.description = document.getElementById("description").value;
      }
    });
  };
  editTd.append(button);
  return editTd;
}
function createDeleteButton() {
  let td = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("myId", index);
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    document.getElementById("mode").value = "";
    let myId = this.getAttribute("myId");
    console.log(this.getAttribute("myId"));
    array = array.filter((item) => item.id != myId);
    console.log(this.parentNode.parentNode);
    this.parentNode.parentNode.remove();
  };
  td.append(deleteButton);
  return td;
}
function add() {
  let items = document.getElementById("items");

  if (document.getElementById("mode").value == "Edit") {
    document.getElementById("mode").value = "";
    let editTr = getEditedRow().childNodes;
    for (let i = 0; i <= 2; i++) {
      editTr[i].innerHTML = document.getElementById(idsOfInputs[i]).value;
    }
  } else {
    index++;
    var item = {
      id: index,
      name: document.getElementById("itemName").value,
      department: document.getElementById("department").value,
      category: document.getElementById("category").value,
      quantity: document.getElementById("quantity").value,
      price: document.getElementById("price").value,
      rating: document.getElementById("rating").value,
      brandname: document.getElementById("brandname").value,
      description: document.getElementById("description").value,
    };
    array.push(item);
    localStorage.setItem("global_array", JSON.stringify(array));
    localStorage.setItem("mydata", array);
    let tr = document.createElement("tr");
    for (let eachInput of idsOfInputs) {
      items.append(tr);
      let td = document.createElement("td");
      td.innerHTML = document.getElementById(eachInput).value;
      tr.append(td);
    }
    console.log(createEditButton());
    tr.append(createEditButton());
    tr.append(createDeleteButton());
  }
}

function filter() {
  document.getElementById("mode").value = "";
  console.log(array);
  let filteredArray = array.filter((item) => {
    return item.brandname == "hp";
  });
  console.log(filteredArray);
  //   let filteredArray = array.filter((item) =>
  //    Number(item.quantity) > 100);
  let children = document.getElementById("items").childNodes;
  console.log("the value of children:", children);
  for (let i = 0; i < children.length; i++) {
    let eachTr = children[i];
    console.log(eachTr.children[i]);
    if (eachTr.children[0].innerHTML != "hp") {
      eachTr.style.display = "none";
    }
  }
}
function sort() {
  let sort = array.sort((a, b) => {
    let fa = a.department.toLowerCase(),
      fb = b.department.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  console.log("sorted", sort);
  add();
}
function getEditedRow() {
  let children = document.getElementById("items").childNodes;
  for (let i = 2; i < children.length; i++) {
    let eachTr = children[i];
    if (eachTr.getAttribute("editing") === "true") {
      eachTr.setAttribute("editing", "");
      return eachTr;
    }
  }
}

function clearFilter() {
  document.getElementById("mode").value = "";
  console.log(array);
  let filteredArray = array.filter((item) => Number(item.quantity) > 100);
  let children = document.getElementById("items").childNodes;
  for (let i = 2; i < children.length; i++) {
    let eachTr = children[i];
    console.log(eachTr.children[2]);
    eachTr.style.display = "";
  }
}

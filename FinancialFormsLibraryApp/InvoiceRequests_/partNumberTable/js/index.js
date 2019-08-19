document.querySelector("#jsonMaker").addEventListener("click", numberOfItems);

function deleteRow(){
  var target = event.target || event.srcElement;
  var rowValue = target.id;
  rowValue = rowValue.slice(10);
  alert ( rowValue );
  document.querySelector("#partNumber"+rowValue).value = '';
  document.querySelector("#description"+rowValue).value = '';
  document.querySelector("#quantity"+rowValue).value = '';
  document.querySelector("#price"+rowValue).value = '';
  document.querySelector("#tax"+rowValue).value = '';
  document.querySelector("#amount"+rowValue).value = '';
  document.querySelector("#glDist"+rowValue).value = '';
}
var partsNumberArray = [];

function makeJsonBaby(i){
  var partNumber = document.querySelector("#partNumber"+i).value;
  var description = document.querySelector("#description"+i).value;
  var quantity = document.querySelector("#quantity"+i).value;
  var price = document.querySelector("#price"+i).value;
  var tax = document.querySelector("#tax"+i).value;
  var amount = (parseFloat(price) + parseFloat(tax)) * parseFloat(quantity);
  document.querySelector("#amount"+i).value = amount;
  var gldist = document.querySelector("#glDist"+i).value;
  var partNumberObject = {
    partNumber: partNumber,
    description: description,
    quantity: quantity,
    price: price,
    tax: tax,
    amount: amount,
    gldist: gldist
  };
  
  alert(JSON.stringify(partNumberObject));
  var stringObject = JSON.stringify(partNumberObject);
  partsNumberArray.push(stringObject);
};

  function numberOfItems(){
    
    var partNumberCaptured;
    var partsCounted = 0;
    for (var i = 1; i < 11; i++) { 
      partNumberCaptured = document.querySelector("#partNumber"+i).value;
      if(partNumberCaptured.length > 0){
        makeJsonBaby(i);
        partsCounted++;
        }
      }
      alert(partsNumberArray + "   " + partsCounted);
  };
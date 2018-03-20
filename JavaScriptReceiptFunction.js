var arr = [];

if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB

    var db = openDatabase('mydb', '1.0', 'my first database', 1024 * 1024);

    db.transaction(function(tx) {

      tx.executeSql('CREATE TABLE IF NOT EXISTS receiptVFINAL (type, value)');
    })
}
function myReceiptFunction() {
  var rowWhole = document.querySelectorAll(".row-whole");
  var arrayValue = [];




  for (var i = 0; i < rowWhole.length; i++) {
    var objValue = {};
    var tranDVal = document.getElementById("selectable_" + i).value;
    var tranTVal = document.getElementById("tType" + i).value;

    var isDuplicateTT = arrayValue.map(function(e) {
      return e.tTVal
    }).indexOf(tranTVal);

    var quantityVal = Number(document.getElementById("quanValue" + i).value);

    if (isNaN(quantityVal) || quantityVal == 0) {
      alert("Please Enter Number(s)")
      break

    } else if (isDuplicateTT == -1) {
      var quantityVal = Number(document.getElementById("quanValue" + i).value);
      objValue.tDVal = tranDVal;
      objValue.tTVal = tranTVal;
      objValue.qVal = quantityVal;
      arrayValue.push(objValue);
      let res = document.URL.replace("UserInput","Table1");
      window.open(res , '_self');

    } else {
      var quantityVal = Number(document.getElementById("quanValue" + i).value);
      var x = arrayValue[isDuplicateTT].qVal;
      var newDupQVal = Number(x + quantityVal);
      arrayValue[isDuplicateTT].qVal = newDupQVal;

      let res = document.URL.replace("UserInput","Table1");
      window.open(res , '_self');
    }

  }



  var startToEnd = document.getElementById(startEndDate);

  console.log(startToEnd);

  sessionStorage.dateVal = JSON.stringify(startToEnd);



  sessionStorage.arrayValue = JSON.stringify(arrayValue);

  // var tranTypeElemClass = document.querySelectorAll(".TTElem");
  // console.log(tranTypeElemClass);
  //
  //
  // for (var i = 0; i < tranTypeElemClass.length; i++) {
  //   var tranTypeElemInner = document.getElementById("c" + i).innerText;
  //   arr.push(tranTypeElemInner);
  // }

}
// window.onload = console.log(arr);

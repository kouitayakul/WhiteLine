if (window.openDatabase) {
  //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB

  var db = openDatabase("mydb", "1.0", "my first database", 1024 * 1024);

  db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS receiptVFINAL (type, value)");
  });
}

function myFucntionAdd() {
  var li0 = document.getElementById("li1").value;
  var tranType0 = [
    "Images",
    "GPS",
    "Checkbox",
    "Checklist",
    "Dropdown",
    "Number",
    "Radio",
    "Text",
    "Media Comment",
    "Text Comment",
  ];

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM receiptVFINAL");
    tx.executeSql("CREATE TABLE IF NOT EXISTS receiptVFINAL (type, value)");
  });

  db.transaction(function (tx) {
    for (i = 0; i < tranType0.length; i++) {
      var y = Number(document.getElementById("li" + i).value).toFixed(2);
      console.log(y);

      tx.executeSql("INSERT INTO receiptVFINAL (type, value) VALUES (?, ?)", [
        tranType0[i],
        y,
      ]);

      if (isNaN(y)) {
        alert("Please Enter Numbers");
        break;
      }
    }

    tx.executeSql(
      "SELECT SUM(value) as value FROM receiptVFINAL",
      [],
      function (tx, results) {
        var len = results.rows.length,
          i;
        console.log(results);
        console.log(tx);
        for (i = 0; i < len; i++) {
          var totalAmount = results.rows.item(i).value;
          console.log(totalAmount);
          document.getElementById("totalValue").value = totalAmount.toFixed(2);
        }
      }
    );
  });
}

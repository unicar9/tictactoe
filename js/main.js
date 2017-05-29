var clicks = 0;
var x = [];
var o = [];

$(document).ready(function() {
  // var $a1 = $("#a1");
  // var $a2 = $("#a2");
  // var $a3 = $("#a3");
  // var $b1 = $("#b1");
  // var $b2 = $("#b2");
  // var $b3 = $("#b3");
  // var $c1 = $("#c1");
  // var $c2 = $("#c2");
  // var $c3 = $("#c3");



  $("td").on("click", function () {
    alert(this.id);
    if (clicks % 2 === 0) {
      $(this).html("x");
      x.push(this.id);
      result(x);

    } else {
      $(this).html("o");
      o.push(this.id);
      result(o);
    }
    clicks++;
  });

  var result = function (player) {
    var row = [];
    var column = [];

    if (player.length >= 3) {
      if (player.includes("22")) {
        var index = player.indexOf("22");
        player.splice(index, 1);

        for (var i = 0; i < player.length; i++) {
          for (var j = 0; j < player.length; j++) {
            if (parseInt(x[i]) + parseInt(x[j]) === 44) {
              console.log("player wins!");
            }
          }
        }
      } else {

        for (var i = 0; i < player.length; i++) {
          row.push(parseInt(player[i][0]))
          column.push(parseInt(player[i][1]))
          row.sort();
          column.sort();
          console.log(row);
          console.log(column);
        }

        for (var i = 0; i < row.length; i++) {
          if (row[i] === row[i+1] && row[i] === row[i+2]) {
            console.log("player wins!");
          }
        }

        for (var i = 0; i < column.length; i++) {
          if (column[i] === column[i+1] && column[i] === column[i+2]) {
            console.log("player wins!");
          }
        }

      }


    }
  }





});

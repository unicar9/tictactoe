
var xMoves = [];
var oMoves = [];

$(document).ready(function() {
  var player = "x";

  $("td").on("click", function() {

    var marked = $(this);

    if (marked.hasClass("x") || marked.hasClass("o")) {
      alert("Please choose another square!")
    } else {
      if (player === "x") {
        $("#message").text("It's X's turn!")
        marked.addClass("x");
        xMoves.push(this.id);
        console.log(xMoves);
        if (checkDiag(diagArr(3, 1), xMoves) || checkDiag(diagArr(3, 0), xMoves) || checkOther(xMoves)) {
          alert("X wins!")
        } else {
          player = "o";
          $("#message").text("It's O's turn!")

        }
      } else {

        marked.addClass("o");
        oMoves.push(this.id);
        if (checkDiag(diagArr(3, 1), oMoves) || checkDiag(diagArr(3, 0), oMoves) || checkOther(oMoves)) {
          alert("O wins!")
        } else {
          player = "x";
          $("#message").text("It's X's turn!")
        }
      }
    }
  });

  var diagArr = function(size, booleanNum) {
      var row = [];
      var col = [];
      var diagonal = [];

      for (var i = 1; i <= size; i++) {
        i = String(i);
        row.push(i);

        if (booleanNum) {
            col.unshift(i);
          } else {
            col.push(i);
          }
        }

      for (var i = 0; i < row.length; i++) {
        diagonal.push(row[i] + col[i]);
      }
      return diagonal;
    };

  var checkDiag = function(diagonal, playerMoves) {

      for (var i = 0; i < diagonal.length; i++) {
        if (playerMoves.indexOf(diagonal[i]) === -1) {
          return false;
        }
      }
      return true;
  };

  var checkOther = function(playerMoves) {
    var row = [];
    var col = [];

    for (var i = 0; i < playerMoves.length; i++) {
      row.push(Number(playerMoves[i][0]));
      col.push(Number(playerMoves[i][1]));
    }

    row.sort();
    col.sort();

    for (var i = 0; i < row.length; i++) {
      if (row[i] === row[i+1] && row[i] === row[i+2]) {
        return true;
      }
    }

    for (var i = 0; i < col.length; i++) {
      if (col[i] === col[i+1] && col[i] === col[i+2]) {
        return true;
      }
    }

    return false;
  };

});

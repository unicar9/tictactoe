
var xMoves = [];
var oMoves = []; // store the square id to an array
var isOver = false; // see whether game is ended

$(document).ready(function() {
  var player = "x"; // switch player

  $("button").on("click", function() {
      location.reload();
  }); // START button click event, reload page

  $("td").on("click", function() {

    if (isOver) {
      return;
    } // if game is ended, function ends

    var marked = $(this); // get the square that player selects

    if (marked.hasClass("x") || marked.hasClass("o")) {
      // if the square has already been selected then alert else markes the square
      alert("Please choose another square!")
    } else {
      if (player === "x") {
        $("#message").text("It's X's turn!") // change the prompt message
        marked.addClass("x").addClass("animated bounceIn"); // place the token "X"
        xMoves.push(this.id); // store the sqaure id to an array

        if (checkDiag(diagArr(3, 1), xMoves) || checkDiag(diagArr(3, 0), xMoves) || checkOther(xMoves)) {
          $("#message").text("Player X wins!") // if either one of 3 winning conditions meet,
          isOver = true; // game is ended

        } else {

          if (xMoves.length === 5) {
            $("#message").text("It's a draw!")
            isOver = true;
            return;
          } // x reaches the last step (step 5) and not winning, it's a draw

          player = "o";
          $("#message").text("It's O's turn!")
          //normally switch to player O and change prompt message

        }
      } else {
        marked.addClass("o").addClass("animated bounceIn");
        oMoves.push(this.id);
        if (checkDiag(diagArr(3, 1), oMoves) || checkDiag(diagArr(3, 0), oMoves) || checkOther(oMoves)) {
          $("#message").text("Player O wins!")
          isOver = true;
        } else {
          player = "x";
          $("#message").text("It's X's turn!")
        }
      }
    }

  });

  // get 2 arrays with all the square ids on the diagonal directions
  // eg. ["11", "22", "33", "44"] and ["14", "23", "32", "41"]
  // pattern here is seperate first number and second number, reverse the array with second numbers
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

  // to check whether all the square ids are included in the player's selected squares.
  var checkDiag = function(diagonal, playerMoves) {

      for (var i = 0; i < diagonal.length; i++) {
        if (playerMoves.indexOf(diagonal[i]) === -1) {
          return false;
        }
      }
      return true;
  };

  // seperate row ids and column ids, and check if the player's selected squares have 3
  // same row ids or column ids.
  // to check whether it's winning horizontally or vertically
  var checkOther = function(playerMoves) { //check horizontally and vertically
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

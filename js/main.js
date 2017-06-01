
var gameData = {
  movesP1: [],
  movesP2: [], // store the square id to an array
  token1: 'x',
  token2: 'o',
  score1: 0,
  score2: 0
}; // store game data

var isOver = false; // see whether game is ended
var size = 3; //3x3 grid default
var turns = 0;
var toggle = true;

$(document).ready(function() {

  var restart = function() {
    gameData.movesP1 = [];
    gameData.movesP2 = [];
    turns = 0;
    isOver = false;
    $("td").removeClass(gameData.token1).removeClass(gameData.token2);
    $("#message").text("Let's play the game! X first.")
  };

  $("#restart").on("click", function() {
    restart();
  }); // START button click event, reset game

  $("#tokenPair1").on("click", function() {
    if (turns) {
      return;
    }
    gameData.token1 = "x";
    gameData.token2 = "o";
    $(this).addClass("selected");
    $("#tokenPair2").removeClass("selected");
  });
  // change token to X/O, and change background
  // color to indicate it's been selected

  $("#tokenPair2").on("click", function() {
    if (turns) {
      return;
    }
    gameData.token1 = "nigiri";
    gameData.token2 = "onigiri";
    $(this).addClass("selected");
    $("#tokenPair1").removeClass("selected");
  }); // change token to nigiri/onigiri

  $("#grid4").hide();
    $("#changeSize").click(function() {
      $("#grid4").slideToggle("fast");
      $("#grid3").slideToggle("fast");
      restart();

    if (toggle) {
      size = 4;
    } else {
      size = 3;
    }
    toggle = !toggle;
    return false;
  }); // toggle board size

  // when player clicks squares to play!!!!
  $("td").on("click", function() {

    if (isOver) {
      return;
    } // if game is ended, clicks become invalid

    var token1 = gameData.token1;
    var token2 = gameData.token2;

    var marked = $(this); // get the square that player selects

    if (marked.hasClass(token1) || marked.hasClass(token2)) {
      // if the square has already been selected then alert else markes the square
      alert("Please choose another square!")
      return;
    }

    // first see which turn
    if (turns % 2 === 0) {
      // $("#player1 .name").addClass("changecolor");
      // $("#player2 .name").removeClass("changecolor");

      $("#message").text("It's X's turn!") // change the prompt message

      marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
      gameData.movesP1.push(this.id); // store the sqaure id to an array

      turns++; //player2's turn

      if ( checkWin(gameData.movesP1, size) ) {
        $("#message").text("Player X wins!")
        isOver = true; // game is ended
        gameData.score1 += 1;
        $("#player1 .num").text('' + gameData.score1);

      } else {

        if ( turns === size ** 2 ) {
          $("#message").text("It's a draw!")
          isOver = true;
          return;
        } // players reach the last turn and not winning, it's a draw
        // $("#player2 .name").addClass("changecolor");
        // $("#player1 .name").removeClass("changecolor"); // change color to indicate current player
        $("#message").text("It's O's turn!")
        //normally switch to player O and change prompt message
      }

    } else {
      $("#message").text("It's O's turn!")
      marked.addClass(token2).addClass("animated bounceIn");
      gameData.movesP2.push(this.id);

      turns++;

      if ( checkWin(gameData.movesP2, size) ) {
        $("#message").text("Player O wins!")
        isOver = true;
        gameData.score2 += 1;
        $("#player2 .num").text('' + gameData.score2);

      } else {

        if ( turns === size ** 2 ) {
          $("#message").text("It's a draw!")
          isOver = true;
          return;
        }

        $("#message").text("It's X's turn!")
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
  var checkOther = function(playerMoves, size) { //check horizontally and vertically
    var row = [];
    var col = [];

    for (var i = 0; i < playerMoves.length; i++) {
      row.push(Number(playerMoves[i][0]));
      col.push(Number(playerMoves[i][1]));
    }

    row.sort();
    col.sort();

    if (size === 3) {
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
    } // works for 3x3 grid

    if (size === 4) {
      for (var i = 0; i < row.length; i++) {
        if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]) {
          return true;
        }
      }

      for (var i = 0; i < col.length; i++) {
        if (col[i] === col[i+1] && col[i] === col[i+2] && col[i] === col[i+3]) {
          return true;
        }
      }
      return false;
    } // works for 4x4 grid

  };

  var checkWin = function(moves, size) {
    var diagonal1 = diagArr(size, 0);
    var diagonal2 = diagArr(size, 1);

    if ( checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size) ) {
      return true;
    }
    return false;
  };


}); // the end

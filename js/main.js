
var gameData = {
  movesP1: [],
  movesP2: [], // store the square id to an array
  movesAI: [],
  token1: 'x',
  token2: 'o',
  score1: 0,
  score2: 0
}; // store game data

var isOver = false; // see whether game is ended
var size = 3; //3x3 grid default
var turns = 0;
var toggle = true;
var modeAI = false; // default AI mode off

var compMoves;
var boardCheck;
var canSave = true;
if (localStorage === undefined) {
  canSave = false;
}

var a1;
var a2;
var a3;
var b1;
var b2;
var b3;
var c1;
var c2;
var c3;

var arrayId = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];

// ===================all the functions below================================

$(document).ready(function() {

  // load game
  if (canSave) {
    if(localStorage.gameData !== undefined) {
      gameData = JSON.parse(localStorage.getItem('gameData'));
      turns = JSON.parse(localStorage.getItem('turns'));
      isOver = JSON.parse(localStorage.getItem('isOver'));
      size = JSON.parse(localStorage.getItem('size'));
      modeAI = JSON.parse(localStorage.getItem('modeAI'));
      toggle = JSON.parse(localStorage.getItem('toggle'));

      if(modeAI) {
        $(".icon").toggle();
        $(".name").toggle();
      }

      if(gameData.token1 === 'nigiri') {
        $("#tokenPair1").removeClass("selected");
        $("#tokenPair2").addClass("selected");
      }

      for (var i = 0; i < gameData.movesP1.length; i++) {
        $("#"+gameData.movesP1[i]).addClass(gameData.token1);
      }

      for (var i = 0; i < gameData.movesP2.length; i++) {
        $("#"+gameData.movesP2[i]).addClass(gameData.token2);
      }

      for (var i = 0; i < gameData.movesAI.length; i++) {
        $("#"+gameData.movesAI[i]).addClass(gameData.token2);
      }

      $("#player1 .num").text('' + gameData.score1);
      $("#player2 .num").text('' + gameData.score2);


      $('#message').text('Game continued!');
    }
  }


  var saveGame = function() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
    localStorage.setItem('turns', JSON.stringify(turns));
    localStorage.setItem('isOver', JSON.stringify(isOver));
    localStorage.setItem('size', JSON.stringify(size));
    localStorage.setItem('modeAI', JSON.stringify(modeAI));
    localStorage.setItem('toggle', JSON.stringify(toggle));
  };

  window.setTimeout(function () {
    $('#message').removeClass('fadeInUp');
  }, 1000); // remove animation so it won't affect submenu

  var restart = function() {
    gameData.movesP1 = [];
    gameData.movesP2 = [];
    gameData.movesAI = [];
    turns = 0;
    isOver = false;
    $("td").removeClass(gameData.token1).removeClass(gameData.token2);
    $("#message").text("Let's play the game! Player1 first.")
  };

  $("#restart").on("click", function() {
    restart();
    saveGame();
  }); // START button click event, reset game

  $("#tokenPair1").on("click", function() {
    if (turns) {
      return;
    }
    gameData.token1 = "x";
    gameData.token2 = "o";
    $(this).addClass("selected");
    $("#tokenPair2").removeClass("selected");
    saveGame();
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
    saveGame();
  }); // change token to nigiri/onigiri

//===================================toggle 3x3 or 4x4 game board============================
  // $("#grid4").hide();
  $("#changeSize").click(function() {
    if (modeAI) {
      return;
    }
    $("#grid4").slideToggle("fast");
    $("#grid3").slideToggle("fast");
    restart();

    if (toggle) {
      size = 4;
      $("#toggleAI").hide(); // NO AI opponent for 4x4 grid
    } else {
      size = 3;
      $("#toggleAI").show();
    }
    toggle = !toggle;
    saveGame();
    return false;
  }); // toggle board size
//================================toggle AI mode=================================================
  $("#toggleAI").click(function() {
    if (turns) {
      return;
    }
    $(".icon").toggle();
    $(".name").toggle();
    gameData.score1 = 0;
    $("#player1 .num").text('' + gameData.score1);
    gameData.score2 = 0;
    $("#player2 .num").text('' + gameData.score2);

    modeAI = !modeAI;
    saveGame();
  });

  $("#newgame").on("click", function() {
    gameData.score1 = 0;
    gameData.score2 = 0;
    restart();
    saveGame();
  });
    // if (!modeAI) {
    // when player clicks squares to play!!!!
    $("td").on("click", function() {

      if(modeAI === true){
        return;
      }
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

        $("#message").text("It's Player1's turn!"); // change the prompt message

        marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
        gameData.movesP1.push(this.id); // store the sqaure id to an array

        turns++; //player2's turn

        if ( checkWin(gameData.movesP1, size) ) {
          $("#message").text("Player1 wins!")
          isOver = true; // game is ended
          gameData.score1 += 1;
          $("#player1 .num").text('' + gameData.score1);
          saveGame();

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            saveGame();
            return;
          } // players reach the last turn and not winning, it's a draw

          $("#message").text("It's Player2's turn!")
          saveGame();
          //normally switch to player O and change prompt message
        }

      } else {
        $("#message").text("It's Players's turn!")
        marked.addClass(token2).addClass("animated bounceIn");
        gameData.movesP2.push(this.id);

        turns++;

        if ( checkWin(gameData.movesP2, size) ) {
          $("#message").text("Player2 wins!")
          isOver = true;
          gameData.score2 += 1;
          $("#player2 .num").text('' + gameData.score2);
          saveGame();

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            saveGame();
            return;
          }

          $("#message").text("It's Player1's turn!")
          saveGame();
        }
      }

    }); // all the moves ---> not AI mode

  //==================================AI mode on======================================
    // all the moves ---> AI mode
    $("td").on("click", function() {
      if (modeAI === false) {
        return;
      }
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

        $("#message").text("It's Player's turn!") // change the prompt message

        marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
        gameData.movesP1.push(this.id); // store the sqaure id to an array

        turns++; //player2's turn

        if ( checkWin(gameData.movesP1, size) ) {
          $("#message").text("Player wins!")
          isOver = true; // game is ended
          gameData.score1 += 1;
          $("#player1 .num").text('' + gameData.score1);
          saveGame();

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            saveGame();
            return;
          } // players reach the last turn and not winning, it's a draw
          // $("#player2 .name").addClass("changecolor");
          // $("#player1 .name").removeClass("changecolor"); // change color to indicate current player
          $("#message").text("It's Player2's turn!")
          saveGame();
          //normally switch to player O and change prompt message
        }

        if (turns === 1) {
          compMove1();
        } else if (turns === 3) {
          compMove2();
        } else if (turns === 5) {
          compMove3();
        } else if (turns === 7) {
          compMove4();
        }

        if ( checkWin(gameData.movesAI, size) ) {
          $("#message").text("Computer wins!")
          isOver = true;
          gameData.score2 += 1;
          $("#player2 .num").text('' + gameData.score2);
          saveGame();

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            saveGame();
            return;
          }

          $("#message").text("It's Player's turn!")
          saveGame();
        }

    }
  });// all the moves --->AI mode, function ends
// }

//===========================all the check for WIN functions=============================

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

  //=====================================total check to win function===============================
  //=====================================take size (3 or 4) as an argument===============================

  var checkWin = function(moves, size) {
    var diagonal1 = diagArr(size, 0);
    var diagonal2 = diagArr(size, 1);

    if ( checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size) ) {
      return true;
    }
    return false;
  };

  //==========================below is AI logic!!!!!!!==================================
  //==========================below is AI logic!!!!!!!==================================
  //==========================below is AI logic!!!!!!!==================================

  var compMove1 = function() {

    boardCheck(gameData.token1);
    if (!b2) {
      $("#22").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("22");
      turns++;
    } else {
      $("#13").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("13");
      turns++;
    }
  }; // 1st computer move

  //=======================Computer's 2nd move===============================================



  var compMove2 = function() {

    boardCheck(gameData.token1);
    if ((a1&&c3) || (a3&&c1)) {
      $("#23").addClass(gameData.token2).addClass("animated bounceIn"); // 2 x on diagonal direction, o on the edge;
      gameData.movesAI.push("23");
      turns++;
    } else if ((a2&&c2) || (b1&&b3) || (a2&&c1) || (b1&&a3)) {
      $("#11").addClass(gameData.token2).addClass("animated bounceIn"); //
      gameData.movesAI.push("11");
      turns++;
    } else if ((a3&&c2) || (b3&&c1)|| (c1&&b2)) {
      $("#33").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("33");
      turns++;
    } else if ((a1&&c2) || (b1&&c3) || (a2&&b3) || (a2&&b1)) {
      $("#31").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("31");
      turns++;
    } else if ((a1&&b3) || (a2&&c3) || (b1&&c2) || (b3&&c2)) {
      $("#13").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("13");
      turns++;
    } else {
      var id = blockOrWin(gameData.token1);
      $("#"+id).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(id);
      turns++;
    }
  }; // 2nd computer move

//===================get an array with true of false to indicate whether it's an empty suqare or not=============
  var getEmpty = function(){
    var boardX = boardCheck(gameData.token1);
    var boardO = boardCheck(gameData.token2);
    var empty = [];
    for (var i = 0; i < boardX.length; i++) {
      if( !boardX[i] && !boardO[i] ){
        return i;
      }
    }
  };

  //=======================Computer's 3rd move===============================================

  var compMove3 = function() {
    var win = blockOrWin(gameData.token2);
    var block = blockOrWin(gameData.token1);

    if (win) {
      $("#"+win).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(win);
      turns++;
    } else if (block) {
      $("#"+block).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(block);
      turns++;
    } else {
      var i = getEmpty();
      var id = arrayId[i];
      $("#"+id).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(id);
      turns++;
    }

  }; // 3rd computer move
//=======================Computer's 4th move===============================================

  var compMove4 = function() {
    compMove3();
  }; // 4th computer move

//=======================block: in every possible directions, there are 2 "x"===============================================
//=======================win: in every possible directions, there are 2 "o"===============================================

  var blockOrWin = function(token) {
    var empty = checkEmpty();
    boardCheck(token);
    if (!empty[0] && ((a2&&a3) || (b1&&c1) || (b2&&c3))) {
      return "11";
    } else if (!empty[1] && ((a1&&a3) || (b2&&c2))) {
        return "12";
      } else if (!empty[2] && ((a1&&a2) || (b3&&c3) || (b2&&c1))) {
          return "13";
        } else if (!empty[3] && ((a1&&c1) || (b2&&b3))) {
            return "21";
          } else if (!empty[5] && ((a3&&c3) || (b1&&b2))) {
              return "23";
            } else if (!empty[6] && ((c2&&c3) || (a1&&b1) || (b2&&a3))) {
                return "31";
              } else if (!empty[7] && ((a2&&b2) || (c1&&c3))) {
                  return "32";
                } else if (!empty[8] && ((c1&&c2) || (a3&&b3) || (a1&&b2))) {
                    return "33";
                  } else {
                    return false;
                  }
  }; // blockOrWin function ends

  //==================false or true array to check the situation of either "X" or "O"===============================================

  var boardCheck = function(token) {
    a1 = $("#11").hasClass(token);
    a2 = $("#12").hasClass(token);
    a3 = $("#13").hasClass(token);
    b1 = $("#21").hasClass(token);
    b2 = $("#22").hasClass(token);
    b3 = $("#23").hasClass(token);
    c1 = $("#31").hasClass(token);
    c2 = $("#32").hasClass(token);
    c3 = $("#33").hasClass(token);

    return [a1, a2, a3, b1, b2, b3, c1, c2, c3];
  };

///==================get the first empty square to fill an AI move===================================
  var checkEmpty = function() {
    var boardX = boardCheck(gameData.token1);
    var boardO = boardCheck(gameData.token2);
    var empty = [];

    for (var i = 0; i < boardX.length; i++) {
      empty[i] = boardX[i] || boardO[i];
    }
    return empty;
  }


}); // the end


var turns = 0;
var isOver = false;
var modeAI = false;

var token1 = "x";
var token2 = "o";

var compMoves;
var boardCheck;

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

$(document).ready(function() {

  var compMove1 = function() {
    boardCheck("x");
    if (!b2) {
      $("#22").addClass("o");
      turns++;
    } else {
      $("#13").addClass("o");
      turns++;
    }
  }; // 1st computer move

  var compMove2 = function() {
    boardCheck("x");
    if ((a1&&c3) || (a3&&c1)) {
      $("#23").addClass("o"); // 2 x on diagonal direction, o on the edge;
      turns++;
    } else if ((a2&&c2) || (b1&&b3) || (a2&&c1) || (b1&&a3)) {
      $("#11").addClass("o"); //
      turns++;
    } else if ((a3&&c2) || (b3&&c1)|| (c1&&b2)) {
      $("#33").addClass("o");
      turns++;
    } else if ((a1&&c2) || (b1&&c3) || (a2&&b3) || (a2&&b1)) {
      $("#31").addClass("o");
      turns++;
    } else if ((a1&&b3) || (a2&&c3) || (b1&&c2) || (b3&&c2)) {
      $("#13").addClass("o");
      turns++;
    } else {
      blockOrWin("x");
    }
  }; // 2nd computer move


  var getEmpty = function(){
    var boardX = boardCheck("x");
    var boardO = boardCheck("o");
    for (var i = 0; i < boardX.length; i++) {
      if( !boardX[i] && !boardO[i] ){
        return i;
      }
    }
  };

  var compMove3 = function() {
      blockOrWin("o");

    if (!blockOrWin("o")) {
      blockOrWin("x");
    }

    if (!blockOrWin("x")) {
      var i = getEmpty();
      var id = arrayId[i];
      $("#" + id).addClass("o");
      turns++;
    }
  }; // 3rd computer move

  var compMove4 = function() {
    compMove3();
  }; // 4th computer move

  var blockOrWin = function(token) {
    var boardX = boardCheck('x');
    boardCheck(token);
    if (!boardX[0] && ((a2&&a3) || (b1&&c1) || (b2&&c3))) {
      $("#11").addClass("o");
      turns++;
    } else if (!boardX[1] && ((a1&&a3) || (b2&&c2))) {
        $("#12").addClass("o");
        turns++;
    } else if (!boardX[2] && ((a1&&a2) || (b3&&c3) || (b2&&c1))) {
        $("#13").addClass("o");
        turns++;
    } else if (!boardX[3] && ((a1&&a3) || (b2&&b3))) {
        $("#21").addClass("o");
        turns++;
    } else if (!boardX[5] && ((a3&&c3) || (b1&&b2))) {
        $("#23").addClass("o");
        turns++;
    } else if (!boardX[6] && ((c2&&c3) || (a1&&b1) || (b2&&a3))) {
          $("#31").addClass("o");
          turns++;
    } else if (!boardX[7] && ((a2&&b2) || (c1&&c3))) {
        $("#32").addClass("o");
        turns++;
    } else if (!boardX[8] && ((c1&&c2) || (a3&&b3) || (a1&&b2))) {
        $("#33").addClass("o");
        turns++;
    } else {
      return false;
    }
  }; // blockOrWin function ends

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

  $("#toggleAI").click(function() {
    $(".icon").toggle();
    $(".name").toggle();

    modeAI = !modeAI;

  });

}); //the end

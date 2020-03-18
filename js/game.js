'use strict';

// eslint-disable-next-line no-unused-vars
var gBoard;
var gSize = 4;
var gViruses = 2;
// eslint-disable-next-line no-unused-vars
var gLevel = 'beginner';
// eslint-disable-next-line no-unused-vars
var gIsGameOn = false;

var EMPTY = '';
var VIRUS = '😷';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function buildBoard(size = 4, virusesCnt = 2) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = EMPTY;
    }
  }
  console.log(board);

  for (var k = virusesCnt; k > 0; k--) {
    var iIdx = getRandomIntInclusive(0, size - 1);
    var jIdx = getRandomIntInclusive(0, size - 1);
    board[iIdx][jIdx] = VIRUS;
  }
  // console.table(board)
  return board;
}

// eslint-disable-next-line no-unused-vars
function setLevel(button) {
  var level = button.id;
  gLevel = level;
  switch (level) {
    case 'beginner':
    default:
      gSize = 4;
      gViruses = 2;
      break;
    case 'medium':
      gSize = 8;
      gViruses = 12;
      break;
    case 'expert':
      gSize = 12;
      gViruses = 30;
      break;
  }
  buildBoard(gSize, gViruses);
}

// eslint-disable-next-line no-unused-vars
function initGame() {
  gBoard = buildBoard();
  // renderBoard(gBoard, '.board');
}

/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
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
  // Hardcoding:
  // board[1][1] = VIRUS;
  // board[3][3] = VIRUS;
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

function isVirus(cellLocation) {
  return gBoard[cellLocation.i][cellLocation.j] === VIRUS;
}

function getVirusesNegsCount(cellLocation) {
  var cnt = 0;
  for (let i = cellLocation.i - 1; i <= cellLocation.i + 1; i++) {
    for (let j = cellLocation.j - 1; j <= cellLocation.j + 1; j++) {
      if (i === cellLocation.i && j === cellLocation.j) continue;
      if (i >= 0 && i < gSize && j >= 0 && j < gSize && isVirus({ i, j })) {
        cnt++;
      }
    }
  }
  return cnt;
}

function setVirusesNegsCount(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== VIRUS) {
        var cnt = getVirusesNegsCount({ i, j });
        board[i][j] = cnt > 0 ? cnt : EMPTY;
      }
    }
  }
  console.table(board);
}

// eslint-disable-next-line no-unused-vars
function initGame() {
  gBoard = buildBoard();
  setVirusesNegsCount(gBoard);
  // renderBoard(gBoard, '.board');
}

/* eslint-disable no-loop-func */
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
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0
};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function buildBoard(size, virusesCnt) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        virusesAroundCount: 0,
        isShown: false,
        isVirus: false,
        isMarked: false,
      };
    }
  }

  // Infect random cells:
  for (var k = virusesCnt; k > 0; k--) {
    var iIdx = getRandomIntInclusive(0, size - 1);
    var jIdx = getRandomIntInclusive(0, size - 1);
    board[iIdx][jIdx].isVirus = true;
  }
  return board;
}

function showGameOver(i, j) {
  gBoard[i][j].isShown = true;
  var infectedCells = document.querySelectorAll('.infected');
  infectedCells.forEach(function (cell) {
    cell.style.backgroundColor = 'white';
    cell.style.backgroundImage = 'url("img/corona.png")';
  });
  var elCurrentInfectedCell = document.querySelector(`.cell-${i}-${j}`);
  elCurrentInfectedCell.style.backgroundColor = 'red';
}

function revealCell(i, j, num) {
  gBoard[i][j].isShown = true;
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  elCell.style.backgroundColor = 'white';
  elCell.innerText = num > 0 ? num : '';
}

function expandShown(iIdx, jIdx) {
  for (var i = iIdx - 1; i <= iIdx + 1; i++) {
    for (var j = jIdx - 1; j <= jIdx + 1; j++) {
      if (i >= 0 && i < gSize && j >= 0 && j < gSize) {
        var cell = gBoard[i][j];
        var cnt = cell.virusesAroundCount;
        if (cell.isVirus) continue;
        if (cell.isShown) continue;
        cell.isShown = true;
        if (cnt > 0) {
          revealCell(i, j, cnt);
        } else {
          revealCell(i, j, cnt);
          expandShown(i, j);
        }
      }
    }
  }
}

function cellClicked(elCell, i, j) {
  var cell = gBoard[i][j];
  if (!cell.isShown && !cell.isMarked) {
    var cnt = cell.virusesAroundCount;
    if (!cell.isVirus) {
      if (cnt) {
        revealCell(i, j, cnt);
      } else {
        expandShown(i, j);
      }
      return;
    }
    showGameOver(i, j);
  }
}

function cellMarked(elCell) {
  // Todo:
  // Called on right click to mark a
  // cell (suspected to be a mine)
  // Search the web (and
  // implement) how to hide the
  // context menu on right click

  // Right click to flag/unflag a suspected cell (you cannot reveal a
  //   flagged cell)
}

function renderBoard() {
  var elBoard = document.querySelector('.board-container');
  var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var width = 0;
  var height = 0;
  switch (gSize) {
    case 4:
    default:
      width = height = `${vw * 0.3 * 0.24}px`;
      break;
    case 8:
      width = height = `${vw * 0.3 * 0.116}px`;
      break;
    case 12:
      width = height = `${vw * 0.3 * 0.075}px`;
      break;
  }
  for (let i = 0; i < gSize; i++) {
    for (let j = 0; j < gSize; j++) {
      var elCell = document.createElement('div');
      elCell.classList.add('cell', `cell-${i}-${j}`);
      if (gBoard[i][j].isVirus) {
        elCell.classList.add('infected');
      }
      elCell.style.width = width;
      elCell.style.height = height;
      elCell.addEventListener('click', function () {
        cellClicked(elCell, i, j);
      });
      elCell.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        cellMarked(elCell);
        return false;
      });
      elBoard.appendChild(elCell);
    }
  }
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
  return gBoard[cellLocation.i][cellLocation.j].isVirus;
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
      if (!board[i][j].isVirus) {
        var cnt = getVirusesNegsCount({ i, j });
        board[i][j].virusesAroundCount = cnt;
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
function initGame() {
  setLevel(document.querySelector('.expert-level-button')); // hardcoding
  gBoard = buildBoard(gSize, gViruses);
  setVirusesNegsCount(gBoard);
  renderBoard();
}

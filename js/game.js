/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
'use strict';

// eslint-disable-next-line no-unused-vars
var gBoard;
var gTimer;
var gSize = 4;
var gViruses = 2;
// eslint-disable-next-line no-unused-vars
var gLevel = 'beginner';
var gLives = 3;
var gFinds = 3;
// eslint-disable-next-line no-unused-vars
var gGame = {
  isOn: false,
  isHintOn: false
};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function buildBoard(size) {
  var board = [];
  var id = 1;
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        id,
        virusesAroundCount: 0,
        isShown: false,
        isVirus: false,
        isMarked: false,
      };
      id++;
    }
  }
  return board;
}

function infectCells() {
  var emptyCells = gBoard.flat();
  for (var i = 0; i < gViruses; i++) {
    var idx = getRandomIntInclusive(0, emptyCells.length - 1);
    var randomCell = emptyCells[idx];
    var cell;
    gBoard.forEach(function (row) {
      if (row.includes(randomCell)) {
        cell = row[row.indexOf(randomCell)];
      }
    });
    cell.isVirus = true;
    emptyCells.splice(emptyCells.indexOf(randomCell), 1);
  }
}

function isVictory() {
  var victory = true;
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      var cell = gBoard[i][j];
      if (gViruses !== 0) victory = false;
      if (!cell.isShown && !cell.isMarked) victory = false;
    }
  }
  return victory;
}

function stopTimer() {
  clearInterval(gTimer);
}

function showTimer() {
  if (gTimer) stopTimer();
  var time = 0;
  gTimer = setInterval(function () {
    var timer = document.querySelector('.timer');
    timer.innerHTML = time;
    time++;
  }, 1000);
}

function showVictory() {
  gGame.isOn = false;
  stopTimer();
  var cells = document.querySelectorAll('.cell');
  cells.forEach(function (c) {
    c.onclick = null;
    c.oncontextmenu = null;
  });
  var startOverButton = document.querySelector('.start-over');
  startOverButton.classList.remove('normal');
  startOverButton.classList.add('win');
}

function showGameOver(i, j) {
  gBoard[i][j].isShown = true;
  gGame.isOn = false;
  stopTimer();
  var cells = document.querySelectorAll('.cell');
  cells.forEach(function (c) {
    c.onclick = null;
    c.oncontextmenu = null;
  });
  var infectedCells = document.querySelectorAll('.infected');
  infectedCells.forEach(function (cell) {
    if (cell.classList.contains('virus-found')) {
      cell.style.backgroundColor = 'red';
    } else {
      cell.style.backgroundColor = 'white';
    }
    cell.style.backgroundImage = 'url("img/corona.png")';
  });
  var markedCells = document.querySelectorAll('.marked');
  markedCells.forEach(function (cell) {
    if (!cell.classList.contains('infected')) {
      var elWrongLayer = document.createElement('div');
      elWrongLayer.classList.add('wrong');
      cell.appendChild(elWrongLayer);
    }
  });
  var elCurrentInfectedCell = document.querySelector(`.cell-${i}-${j}`);
  elCurrentInfectedCell.style.backgroundColor = 'red';
  var startOverButton = document.querySelector('.start-over');
  startOverButton.classList.remove('normal');
  startOverButton.classList.add('lose');

  var hints = document.querySelectorAll('.hint');
  hints.forEach(function (hint) {
    hint.style.display = 'none';
  });
}

function revealCell(i, j, num) {
  var color = '';
  switch (num) {
    case 1:
      color = 'blue';
      break;
    case 2:
      color = 'green';
      break;
    case 3:
      color = 'red';
      break;
    case 4:
      color = 'purple';
      break;
    case 5:
      color = 'black';
      break;
    case 6:
      color = 'maroon';
      break;
    case 7:
      color = 'gray';
      break;
    case 8:
      color = 'turquoise';
      break;
    default:
  }
  gBoard[i][j].isShown = true;
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  elCell.classList.add('shown');
  elCell.style.backgroundColor = 'white';
  if (elCell.classList.contains('infected')) {
    var lives = document.querySelector('.lives');
    lives.removeChild(lives.children[0]);
    if (gLives === 0) {
      showGameOver(i, j);
      return;
    }
    elCell.classList.add('virus-found');
    elCell.style.backgroundColor = 'red';
    elCell.style.backgroundImage = 'url(img/corona.png)';
    // todo: add sound
    return;
  }
  elCell.style.color = color;
  elCell.innerText = num > 0 ? num : '';
  if (isVictory()) showVictory();
}

function expandShown(iIdx, jIdx) {
  for (var i = iIdx - 1; i <= iIdx + 1; i++) {
    for (var j = jIdx - 1; j <= jIdx + 1; j++) {
      if (i >= 0 && i < gSize && j >= 0 && j < gSize) {
        var cell = gBoard[i][j];
        var cnt = cell.virusesAroundCount;
        if (cell.isVirus) continue;
        if (cell.isShown) continue;
        if (cell.isMarked) continue;
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

function showVirusesCount() {
  var elVirusesCount = document.querySelector('.viruses-count');
  elVirusesCount.innerText = gViruses;
}

function decreaseVirusesCount() {
  gViruses--;
  var elVirusesCount = document.querySelector('.viruses-count');
  elVirusesCount.innerText = gViruses;
}

function increaseVirusesCount() {
  gViruses++;
  var elVirusesCount = document.querySelector('.viruses-count');
  elVirusesCount.innerText = gViruses;
}

function cellMarked(elCell) {
  var i = elCell.classList[1].split('-')[1];
  var j = elCell.classList[1].split('-')[2];
  var cell = gBoard[i][j];
  if (!cell.isShown) {
    if (!cell.isMarked) {
      cell.isMarked = true;
      elCell.classList.add('marked');
      elCell.style.backgroundImage = 'url(img/biohazard.png)';
      decreaseVirusesCount();
      if (isVictory()) showVictory();
    } else {
      cell.isMarked = false;
      elCell.classList.remove('marked');
      elCell.style.backgroundImage = 'none';
      increaseVirusesCount();
    }
  }
}

function showHint(iIdx, jIdx) {
  gGame.isHintOn = false;
  for (var i = iIdx - 1; i <= iIdx + 1; i++) {
    for (var j = jIdx - 1; j <= jIdx + 1; j++) {
      if (i >= 0 && i < gSize && j >= 0 && j < gSize) {
        var cell = gBoard[i][j];
        var cnt = cell.virusesAroundCount;
        var color = '';
        switch (cnt) {
          case 1:
            color = 'blue';
            break;
          case 2:
            color = 'green';
            break;
          case 3:
            color = 'red';
            break;
          case 4:
            color = 'purple';
            break;
          case 5:
            color = 'black';
            break;
          case 6:
            color = 'maroon';
            break;
          case 7:
            color = 'gray';
            break;
          case 8:
            color = 'turquoise';
            break;
          default:
        }
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.style.backgroundColor = 'white';
        elCell.style.color = color;
        if (elCell.classList.contains('infected')) {
          if (elCell.classList.contains('virus-found')) {
            elCell.style.backgroundColor = 'red';
          }
          elCell.style.backgroundImage = 'url(img/corona.png)';
        } else {
          elCell.innerText = cnt > 0 ? cnt : '';
        }
      }
    }
  }
  setTimeout(function () {
    var cellElements = document.querySelectorAll('.cell');
    cellElements.forEach(function (el) {
      var hoverHandler = function (e) {
        e.target.style.cursor = 'auto';
      };
      el.onmouseover = hoverHandler;
      var rightClickHandler = function (e) {
        e.preventDefault();
        cellMarked(e.target);
        showVirusesCount();
      };
      el.oncontextmenu = rightClickHandler;
      if (!el.classList.contains('shown')) {
        el.style.backgroundColor = 'silver';
        el.style.backgroundSize = 'contain';
        el.innerText = '';
        el.style.backgroundImage = 'none';
        if (el.classList.contains('marked')) {
          el.style.backgroundImage = 'url(img/biohazard.png)';
        }
      }
      if (el.classList.contains('virus-found')) {
        el.style.backgroundColor = 'red';
      }
    });
  }, 1000);
}

function startGame() {
  gGame.isOn = true;
  var startOverButton = document.querySelector('.start-over');
  startOverButton.classList.remove('smile');
  startOverButton.classList.add('normal');
  showVirusesCount();
  showTimer();
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

function cellClicked(elCell, i, j) {
  if (!gGame.isOn) startGame();
  if (gGame.isHintOn) {
    showHint(i, j);
    return;
  }
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
    if (gLives > 0) {
      gLives--;
      gViruses--;
      revealCell(i, j, cnt);
      showVirusesCount();
      return;
    }
    showGameOver(i, j);
  }
}

function renderBoard() {
  var elBoard = document.querySelector('.board-container');
  elBoard.innerHTML = '';
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
      var clickHandler = function () {
        cellClicked(elCell, i, j);
      };
      var rightClickHandler = function (e) {
        e.preventDefault();
        if (!gGame.isOn) startGame();
        cellMarked(e.target);
        showVirusesCount();
      };
      var hoverHandler = function (e) {
        if (gGame.isHintOn) {
          e.target.style.cursor = 'url(img/hint-pointer.png), pointer';
        }
      };
      elCell.onclick = clickHandler;
      elCell.oncontextmenu = rightClickHandler;
      elCell.onmouseover = hoverHandler;
      elBoard.appendChild(elCell);
    }
  }
}

function startOver() {
  switch (gLevel) {
    case 'beginner':
    default:
      gSize = 4;
      gViruses = 2;
      gLives = 2;
      break;
    case 'medium':
      gSize = 8;
      gViruses = 12;
      gLives = 3;
      break;
    case 'expert':
      gSize = 12;
      gViruses = 30;
      gLives = 3;
      break;
  }
  gBoard = buildBoard(gSize, gViruses);
  infectCells();
  setVirusesNegsCount(gBoard);
  renderBoard();
  gGame.isOn = true;
  var startOverButton = document.querySelector('.start-over');
  startOverButton.classList.remove('win');
  startOverButton.classList.remove('lose');
  startOverButton.classList.remove('smile');
  startOverButton.classList.add('normal');
  var hintButtons = document.querySelectorAll('.hint');
  hintButtons.forEach(function (button) {
    button.style.display = 'inline-block';
  });

  if (gViruses < 3) gLives = gViruses;
  var livesContainer = document.querySelector('.lives');
  var lifeStr = '<div class="live"></div>';
  livesContainer.innerHTML = lifeStr.repeat(gLives);
  showVirusesCount();
  showTimer();
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
  startOver();
}

// eslint-disable-next-line no-unused-vars
function getHint(elButton) {
  elButton.style.display = 'none';
  gGame.isHintOn = true;
}

// eslint-disable-next-line no-unused-vars
function showRandomHealthyCell(elButton) {
  if (gFinds <= 0) return;
  gFinds--;
  elButton.innerText = gFinds;
  var cells = [...document.querySelectorAll('.cell')];
  var healthyCells = cells.filter(function (cell) {
    var i = cell.classList[1].split('-')[1];
    var j = cell.classList[1].split('-')[2];
    return !cell.classList.contains('infected') &&
    !cell.classList.contains('marked') &&
    !gBoard[i][j].isShown;
  });
  var randomHealthyCell = healthyCells[getRandomIntInclusive(0, healthyCells.length - 1)];
  randomHealthyCell.style.backgroundImage = 'url(img/healthy.png)';
  setTimeout(function () {
    randomHealthyCell.style.backgroundImage = 'none';
  }, 1000);
}

// eslint-disable-next-line no-unused-vars
function initGame() {
  gLevel = 'expert';
  gSize = 12;
  gViruses = 30;
  gBoard = buildBoard(gSize, gViruses);
  infectCells();
  setVirusesNegsCount(gBoard);
  renderBoard();
  var startOverButton = document.querySelector('.start-over');
  startOverButton.classList.add('smile');
  showVirusesCount();
}

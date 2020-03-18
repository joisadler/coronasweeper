/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
'use strict';

function renderBoard(mat, selector) {
  var strHTML = '';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value, direction) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
  switch (direction) {
    case 'left':
    default:
      elCell.style.transform = 'rotate(0deg)';
      break;
    case 'right':
      elCell.style.transform = 'rotate(180deg)';
      break;
    case 'up':
      elCell.style.transform = 'rotate(90deg)';
      break;
    case 'down':
      elCell.style.transform = 'rotate(-90deg)';
      break;
  }
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

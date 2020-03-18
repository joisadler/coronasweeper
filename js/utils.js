/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

// Getting a random integer between two values
// This example returns a random integer between the specified values.
// The value is no lower than min (or the next integer greater than min if min isn't an integer),
// and is less than (but not equal to) max.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

// Getting a random integer between two values, inclusive
// While the getRandomInt() function above is inclusive at the minimum,
// it's exclusive at the maximum. What if you need the results to be
// inclusive at both the minimum and the maximum?
// The getRandomIntInclusive() function below accomplishes that.

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max - min) + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// Bubble sort
function bubbleSort(nums) {
  var clone = nums.slice();
  for (let i = (clone.length - 1); i >= 0; i--) {
    for (let j = (clone.length - i); j > 0; j--) {
      if (clone[j] < clone[j - 1]) {
        var tmp = clone[j - 1];
        clone[j - 1] = clone[j];
        clone[j] = tmp;
        // [clone[j - 1], clone[j]] = [clone[j], clone[j - 1]]; - swapping two values with ES6 destructuring assignment
      }
    }
  }
  return clone;
}

function sumCol(mat, colIdx) {
  var sum = 0;
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      if (j === colIdx) {
        sum += mat[i][j];
      }
    }
  }
  return sum;
}

function sumRow(mat, rowIdx) {
  var sum = 0;
  var row = mat[rowIdx];
  for (var i = 0; i < row.length; i++) {
    sum += row[i];
  }
  return sum;
}

function printPrimaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][d];
    console.log(item);
  }
}
function printSecondaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][squareMat.length - d - 1];
    console.log(item);
  }
}

function sumPrimaryDiagonal(squareMat) {
  var sum = 0;
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][d];
    sum += item;
  }
  return sum;
}

function sumSecondaryDiagonal(squareMat) {
  var sum = 0;
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][squareMat.length - d - 1];
    sum += item;
  }
  return sum;
}

function getArrayOfNumbers(num) {
  return [...Array(num).keys()].slice(1);
}

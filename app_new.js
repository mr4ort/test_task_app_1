"use strict";

var DataTable = function (tableSelector) {
  this.table = document.querySelector(tableSelector);
};

DataTable.prototype = {
  constructor: DataTable,
  init: function() {
    var table = this.table;
    var tHead = table.querySelector('thead');

    table.addEventListener('dblclick', this.changeCell);
    tHead.addEventListener('click', this.sort)
  },
  changeCell: function(e) {
    var elTag = e.target.tagName;

    if (elTag !== 'TD') return;

    //table.editCell(e.target.parentElement.rowIndex, e.target.cellIndex);

    var table = this;
    var rowIndex = e.target.parentElement.rowIndex;
    var cellIndex = e.target.cellIndex;
    var activeCell = table.rows[rowIndex].cells[cellIndex];

    if (activeCell) {
      var val = activeCell.innerHTML;
      // clean cell content
      activeCell.innerHTML = '';
      // create new element
      var inputEl = document.createElement('input');
      inputEl.setAttribute('type', 'text');
      inputEl.setAttribute('value', val);
      // add input element to cell
      activeCell.appendChild(inputEl);
      // add focus into input;
      inputEl = activeCell.querySelector('input');
      inputEl.focus();

      // add event Listener
      inputEl.addEventListener('blur', function() {
        var input = this;
        var activeCell = input.parentElement;
        input.removeEventListener('blur', this.saveCell);
        var val = input.value;
        //
        activeCell.removeChild(input);
        activeCell.innerHTML = val;
      });
    }

  },
  sort: function(e) {
    var cell;
    var table = this.parentElement;
    var tBody = table.querySelector('tbody');
    var rowsArray = [].slice.call(tBody.rows);
    var compare;
    var colIndex;
    var type;

    if (e.target.tagName !== 'TH') {
      cell = e.target.parentElement;
    } else {
      cell = e.target;
    }

    type = cell.getAttribute('data-sort');
    colIndex = cell.cellIndex;

    switch (type) {
      case 'number':
        compare = function (rowA, rowB) {
          return rowA.cells[colIndex].innerHTML - rowB.cells[colIndex].innerHTML;
        };
        break;
      case 'string':
        compare = function (rowA, rowB) {
          return rowA.cells[colIndex].innerHTML > rowB.cells[colIndex].innerHTML;
        };
        break;
    }

    rowsArray.sort(compare);

    table.removeChild(tBody);

    tBody = document.createElement('tbody');

    for (var i = 0; i < rowsArray.length; i++){
      tBody.appendChild(rowsArray[i]);
    }

    table.appendChild(tBody);
  },
  removeRows: function () {
    var table = this.table;
    var inputs = table.querySelectorAll('input[type="checkbox"]');
    var tBody = table.querySelector('tbody');
    var length = inputs.length;
    var i;
    var tr;

    for ( i = length - 1; i >= 0; i--) {
      if (inputs[i].checked == true) {
        // select current row
        tr = inputs[i].parentElement.parentElement;
        // remove row
        tBody.removeChild(tr);
      }
    }
  }
};

//
var table = new DataTable(".table");
table.init();

var btnRemove = document.querySelector('.btn-remove');
btnRemove.addEventListener('click', function() {
  table.removeRows();
});



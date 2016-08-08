(function () {
  "use strict";

  var table = document.querySelector('.table');
  var tHead = table.querySelector('thead');
  var btnRemove = document.querySelector('.btn-remove');
  var activeCell;

  // Function for removing checked rows;
  function removeRows() {
    var inputs = table.querySelectorAll('input[type="checkbox"]');
    var tBody = table.querySelector('tbody');
    var length = inputs.length;
    var tr;

    while (length--) {
      if (inputs[length].checked == true) {
        //tr = inputs[length].closest("tr");
        // select current row
        tr = inputs[length].parentElement.parentElement;
        // remove row
        tBody.removeChild(tr);
      }
    }
  }

  function changeCell(e) {
    var elTag = e.target.tagName;

    // if click was no on TD element exit
    if (elTag !== "TD") return;

    editCell(e.target.parentElement.rowIndex, e.target.cellIndex);
  }

  function editCell(rowIndex, colIndex) {
    activeCell = table.rows[rowIndex].cells[colIndex];
    var val;

    if (activeCell) {
      val = activeCell.innerHTML;
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
      inputEl.addEventListener('blur', saveCell);
    }
  }

  function saveCell() {
    // remove event listener
    var input = activeCell.querySelector('input');
    input.removeEventListener('blur', saveCell);
    var val = input.value;
    //
    activeCell.removeChild(input);
    activeCell.innerHTML = val;
  }

  function sort(e) {
    if (e.target.tagName !== 'I') return;
    var cell = e.target.parentElement;
    sortTable(cell.cellIndex, cell.getAttribute('data-sort'));
  }

  // function for sorting
  function sortTable(colNumb, type) {
    var tBody = table.querySelector('tbody');
    var rowsArray = [].slice.call(tBody.rows);
    var compare;
    switch (type) {
      case 'number':
        compare = function (rowA, rowB) {
          return rowA.cells[colNumb].innerHTML - rowB.cells[colNumb].innerHTML;
        };
        break;
      case 'string':
        compare = function (rowA, rowB) {
          return rowA.cells[colNumb].innerHTML > rowB.cells[colNumb].innerHTML ? 1 : -1;
        };
        break;
    }
    rowsArray.sort(compare);
    table.removeChild(tBody);
    tBody = document.createElement('tbody');
    for (var i = 0; i < rowsArray.length; i++) {
      tBody.appendChild(rowsArray[i]);
    }
    table.appendChild(tBody);
  }

  btnRemove.addEventListener('click', removeRows);
  table.addEventListener('dblclick', changeCell);
  tHead.addEventListener('click', sort);
})();



(function () {
  "use strict";

  var table = document.querySelector('.table');
  var tHead = table.querySelector('thead');
  var btnRemove = document.querySelector('.btn-remove');
  var activeCell;
  var people;

  people = [
    {
      "first-name": "Andrey",
      "last-name": "Petrov"
    },
    {
      "first-name": "Boris",
      "last-name": "Grigorev"
    },
    {
      "first-name": "Sergey",
      "last-name": "Kyrchenko"
    },
    {
      "first-name": "Margarita",
      "last-name": "Yashkina"
    }
  ];

  function addElementsToTable(el) {
    if (!el.length) return;
    var i;
    var length = el.length;
    //
    table.removeChild(table.querySelector('tbody'));
    var tBody = document.createElement('tbody');
    //
    for (i = 0; i < length; i++) {
      var text;
      var index = i + 1;
      var tr = document.createElement('tr');

      text += '<th>' + index + "</th>";
      text += '<td>' + el[i]['first-name'] + '</td>';
      text += '<td>' + el[i]['last-name'] + '</td>';
      text += '<input type="checkbox">';

      tr.innerHTML = text;
      console.log(tr);
      tBody.appendChild(tr);
    }
    table.appendChild(tBody);
  }

  (function init() {
    addElementsToTable(people);
  })();

  // Function for removing checked rows;
  function removeRows() {
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



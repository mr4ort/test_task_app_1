(function() {
  "use strict";

  var table = document.querySelector('[data-table]');
  var tHead = table.querySelector('thead');
  var btnClose = document.querySelector('[data-remove-row]');
  var tds = table.querySelectorAll('td');
  var activeCol;

  var input;
  function removeRows() {
    var inputs = table.querySelectorAll('input[type="checkbox"]');
    var tBody = table.querySelector('tbody');
    var length = inputs.length;
    var tr;

    while (length--){
      if (inputs[length].checked == true) {
        //tr = inputs[length].closest("tr");
        // select current row
        tr = inputs[length].parentElement.parentElement;
        // remove row
        tBody.removeChild(tr);
      }
    }
  }

  function changeCol(e) {
    var elTag = e.target.tagName;

    // if click was no on TD element exit
    if (elTag !== "TD") return;

    var val;
    var el;

    activeCol = e.target;
    // save content from html element
    val = activeCol.innerHTML;
    // cleaning html element
    activeCol.innerHTML = '';
    // create new element input
    el = document.createElement('input');
    el.setAttribute('type', 'text');
    el.setAttribute('value', val);
    // add input element to TD
    activeCol.appendChild(el);
    input = activeCol.querySelector('input');
    input.focus();
    // add event Listener
    input.addEventListener('blur', saveTd);

  }

  function saveTd() {
    // remove event listener
    input.removeEventListener('blur', saveTd);
    var val = input.value;
    //
    activeCol.removeChild(input);
    activeCol.innerHTML = val;
  }

  function sort(e) {
    if (e.target.tagName !== 'TH') return;

    sortTable(e.target.cellIndex, e.target.getAttribute('data-sort'));
  }

  // function for sorting
  function sortTable(colNumb, type) {
    var tBody = table.querySelector('tbody');
    var rowsArray = [].slice.call(tBody.rows);
    var compare;
    switch (type) {
      case 'number':
        compare = function(rowA, rowB) {
          return rowA.cells[colNumb].innerHTML - rowB.cells[colNumb].innerHTML;
        };
        break;
      case 'string':
        compare = function(rowA, rowB) {
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

  btnClose.addEventListener('click', removeRows);
  table.addEventListener('dblclick', changeCol);
  tHead.addEventListener('click', sort);
})();



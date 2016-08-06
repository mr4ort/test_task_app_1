(function() {
  "use strict";

  var table = document.querySelector('[data-table]');
  var tBody = table.querySelector('tbody');
  var btnClose = document.querySelector('[data-remove-row]');
  var tds = table.querySelectorAll('td');
  var activeTD;

  var input;
  function removeRows() {
    var inputs = table.querySelectorAll('input[type="checkbox"]');
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

  function changeTd(e) {
    var elTag = e.target.tagName;
    var val;
    var el;

    if (elTag === "TD") {
      activeTD = e.target;
      // save content from html element
      val = activeTD.innerHTML;
      // cleaning html element
      activeTD.innerHTML = '';
      // create new element input
      el = document.createElement('input');
      el.setAttribute('type', 'text');
      el.setAttribute('value', val);
      // add input element to TD
      activeTD.appendChild(el);
      input = activeTD.querySelector('input');
      input.focus();
      // add event Listener
      input.addEventListener('dblclick', saveTd);
      input.addEventListener('blur', saveTd);
    }
  }

  function saveTd() {
    // remove event listener
    input.removeEventListener('dblclick', saveTd);
    input.removeEventListener('blur', saveTd);
    var val = activeTD.querySelector('input').value;
    //
    activeTD.removeChild(input);
    activeTD.innerHTML = val;
  }

  btnClose.addEventListener('click', removeRows);
  table.addEventListener('dblclick', changeTd);
})();



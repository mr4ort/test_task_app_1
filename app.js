(function() {
  "use strict";

  var table = document.querySelector('[data-table]');
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
        tr = inputs[length].closest("tr");
        tr.remove();
      }
    }
  }

  function changeTd(e) {
    var elTag = e.target.tagName;
    var val;

    if (elTag === "TD") {
      activeTD = e.target;
      val = activeTD.innerHTML;
      activeTD.innerHTML = '';
      // create new element input
      var el = document.createElement('input');
      el.setAttribute('type', 'text');
      el.setAttribute('value', val);
      // add input element to TD
      activeTD.appendChild(el);
      input = activeTD.querySelector('input');
      input.focus();
      // add event Listener to save changes
      input.addEventListener('dblclick', saveTd);
      input.addEventListener('blur', saveTd);
    }
  }
  
  function saveTd() {
    input.removeEventListener('dblclick', saveTd);
    input.removeEventListener('blur', saveTd);
    var val = activeTD.querySelector('input').value;
    activeTD.querySelector('input').remove();
    activeTD.innerHTML = val;
  }

  btnClose.addEventListener('click', removeRows);
  table.addEventListener('dblclick', changeTd);
})();



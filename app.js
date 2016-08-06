(function() {
  "use strict";

  var table = document.querySelector('[data-table]');
  var btnClose = document.querySelector('[data-remove-row]');
  var tds = table.querySelectorAll('td');
  var activeTD;

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

  function changeDd(e) {
    var activeTD = e.target;
    var elTag = target.tagName;
    var val;

    if (elTag === "TD") {
      val = activeTD.innerHTML;
      activeTD.innerHTML = '';
      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', val);
      activeTD.appendChild(input);
    }


  }
  function saveTd() {

  }

  btnClose.addEventListener('click', removeRows);
  table.addEventListener('dblclick', changeDd);
})();



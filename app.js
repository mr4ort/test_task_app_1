var table = document.querySelector('[data-table]'),
    tBody =
    btnClose = document.querySelector('[data-remove-row]');

function removeRows() {
 var inputs = table.querySelectorAll('input[type="checkbox"]'),
     tBody = table.querySelector('tbody'),
     length = inputs.length;

  while (length--){
    
  }
}

btnClose.addEventListener('click', removeRows);
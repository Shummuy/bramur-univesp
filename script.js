document.addEventListener('DOMContentLoaded', function() {
  var calendar = document.getElementById('calendar');
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();

  var months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var firstDayOfMonth = new Date(year, month, 1).getDay();

  var table = '<table class="tabela">';
  table += '<tr><th colspan="7">' + months[month] + ' ' + year + '</th></tr>';
  table += '<tr><th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th></tr>';
  table += '<tr>';

  var dayCount = 1;

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        table += '<td></td>';
      } else if (dayCount > daysInMonth) {
        break;
      } else {
        // Checa se é sábado ou domingo
        if (j === 0 || j === 6) {
          table += '<td class="disabled">' + dayCount + '</td>';
        } else {
          table += '<td data-day="' + dayCount + '">' + dayCount + '</td>';
        }
        dayCount++;
      }
    }
    if (dayCount > daysInMonth) {
      break;
    } else {
      table += '</tr><tr>';
    }
  }

  table += '</tr></table>';

  calendar.innerHTML = table;


  var cells = document.querySelectorAll('#calendar td:not(.disabled)');
  cells.forEach(function(cell) {
    if (cell.innerHTML !== '') { // Verifica se o dia não está em branco
      cell.addEventListener('click', function() {
        if (this.classList.contains('selectable')) {
          var selectedCell = document.querySelector('.selected');
          if (selectedCell) {
            selectedCell.classList.remove('selected');
          }
          this.classList.add('selected');
        }
      });
    }
  });

  document.getElementById('modalidade').addEventListener('change', function() {
    var modality = this.value;
    var weekdays = document.querySelectorAll('#calendar td:not(.disabled)');
    weekdays.forEach(function(day) {
      if (day.innerHTML !== '') { // Verifica se o dia não está em branco
        day.classList.remove('selectable');
        if (modality === 'muay_thai') {
          if (day.cellIndex === 2 || day.cellIndex === 4) { // Terça e Quinta
            day.classList.add('selectable');
          }
        } else if (modality === 'boxe') {
          if (day.cellIndex === 1 || day.cellIndex === 3 || day.cellIndex === 5) { // Segunda, Quarta e Sexta
            day.classList.add('selectable');
          }
        }
      }
    });
  });
});

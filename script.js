var grid = document.getElementById('game-container');
var msg = document.querySelector('.message');
var chooser = document.querySelector('form');
var mark;
var cells;


function setPlayer() {
  mark = this.value;
  chooser.classList.add('game-on');
  this.checked = false;
  getGameGrid();
}

function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    checkRow();
    switchMark();
    computerMove();
  }
}


function computerMove() {
  var emptyCells = [];
  var random;
  
  cells.forEach(function(cell){
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });
  
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  checkRow();
  switchMark();
}


function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}


function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + ' is the winner!';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    for (var i = 1; i <= 9; i++) {
        var cell=document.getElementById(`${i}`)
        cell.removeEventListener('click', playerMove, false);
    }
    return true;

  } else {
    return false;
  }
}


function checkRow() {
  winner(document.getElementById('1'), document.getElementById('2'), document.getElementById('3'));
  winner(document.getElementById('4'), document.getElementById('5'), document.getElementById('6'));
  winner(document.getElementById('7'), document.getElementById('8'), document.getElementById('9'));
  winner(document.getElementById('1'), document.getElementById('4'), document.getElementById('7'));
  winner(document.getElementById('2'), document.getElementById('5'), document.getElementById('8'));
  winner(document.getElementById('3'), document.getElementById('6'), document.getElementById('9'));
  winner(document.getElementById('1'), document.getElementById('5'), document.getElementById('9'));
  winner(document.getElementById('3'), document.getElementById('5'), document.getElementById('7'));
}



function getGameGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell=document.getElementById(`${i}`)
    cell.addEventListener('click', playerMove, false);
  }
  cells = Array.prototype.slice.call(grid.getElementsByTagName('div'));
}

var players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
  choice.addEventListener('click', setPlayer, false);
});


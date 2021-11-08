const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const boardElement = document.getElementById('board');
const winningMessage = document.getElementById('winning-message');
const winningMessageText = document.querySelector('[data-winning-message]');
const button = document.getElementById('restartButton');


let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
let cnt;

startGame();

button.addEventListener('click', startGame);

function startGame(){
    cnt = 0;
    for( let i = 0; i < 3; i++ ){
        for( let j = 0; j < 3; j++ )
        {
            board[i][j] = -1;
            const cell = document.getElementById(""+(i*3+j));
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener('click', cellClicked);
            cell.addEventListener('click', cellClicked, {once: true});
        }
    }
    winningMessage.classList.remove('show');
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(CIRCLE_CLASS);
    boardElement.classList.add(CIRCLE_CLASS);
}

function placeMark(cell, cnt){
    if( cnt%2 == 0 ){
        cell.classList.add(CIRCLE_CLASS);
    }
    else{
        cell.classList.add(X_CLASS);
    }
}

function showResult(draw) {
    let message;
    if( draw ){
        message = "Draw!!"
    }
    else{
        if( cnt%2 == 0 ) message = "O's Wins!!";
        else message = "X's Wins!!";
    }
    winningMessageText.innerText = message;
    winningMessage.classList.add('show');
}

function cellClicked(event){
    let id = event.target.id;
    let i = Math.floor(id/3);
    let j = id%3;
    board[i][j] = cnt%2;
    placeMark(event.target, cnt);
    if( check(i, j, cnt%2) ) {
        //console.log("Winner Player" + (cnt%2 + 1));
        showResult(false);
        //resetBoard();
        return;
    }
    cnt++;
    if( cnt == 9 ) {
        //console.log("Draw");
        showResult(true);
        //resetBoard();
    }
    if( cnt%2 == 0 ) {
        boardElement.classList.remove(X_CLASS);
        boardElement.classList.add(CIRCLE_CLASS);
    }
    else{
        boardElement.classList.remove(CIRCLE_CLASS);
        boardElement.classList.add(X_CLASS);
    }
}

function check(i, j, s){
    let flag = true;
    for( let k = 0; k < 3; k++ ){
        if( board[i][k] != s ){
            flag = false;
            break;
        }
    }
    if( flag ) return true;
    flag = true;
    for( let k = 0; k < 3; k++ ){
        if( board[k][j] != s ){
            flag = false;
            break;
        }
    }
    if( flag ) return true;

    if( i == j ){
        flag = true;
        for( let k = 0; k < 3; k++ ){
            if( board[k][k] != s ){
                flag = false;
                break;
            }
        }
        if( flag ) return true;
    }

    if( i+j == 2 ){
        flag = true;
        for( let k = 0; k < 3; k++ ){
            if( board[k][2-k] != s ){
                flag = false;
                break;
            }
        }
        if( flag ) return true;
    }

    return false;
}

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]")

let isCirculoTurn;



const winningCombination = [
    [0, 1, 2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

const checkWin = (currentPlayer)=>{
    return winningCombination.some(combination=>{

        return combination.every(index=>{
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw =()=>{
    return[...cellElements].every((cell)=>{
     return   cell.classList.contains("x")|| cell.classList.contains("circle");
    });
}

const startGame =()=>{
    isCirculoTurn = false;
    for (const cell of cellElements){
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick,{once:true});
    }

  
setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message")
    
}

const endGame =(isDraw)=>{
 if(isDraw){
    winningMessageTextElement.innerText = "Empate"

 }else{
    winningMessageTextElement.innerText = isCirculoTurn ? "O venceu!" : "X venceu!";
 }
 winningMessage.classList.add("show-winning-message")
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

};
const setBoardHoverClass =()=>{
    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCirculoTurn){
        board.classList.add("circle");
    } else{
        board.classList.add("x");
    }
}
const swapTurns = () => {
    isCirculoTurn = !isCirculoTurn;
setBoardHoverClass();
    
};
const handleClick = (e) => {

    // colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCirculoTurn ? "circle" : "x";
    
    placeMark(cell,classToAdd);
    // checar por vitoria
    const isWin = checkWin(classToAdd);
    //verificar empate
    const isDraw = checkForDraw();
    if(isWin){
        endGame(false);
    }else if(isDraw){
        endGame(true)
    }else{
        //mudar jogador
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame)
// player Score

const playerResult = {
    player1: 0,
    player2: 0
}

// Dice Values

document.querySelector(".header__button").addEventListener("click",()=>{
    changeDisplay();
    displayResults();
})

document.querySelector(".main__button").addEventListener("click",()=> {
    resetContent();
    displayResults();
})

// changes the display of the html once the start button is clicked

function changeDisplay(){
    // document.querySelector(".header").classList.add("header__after");
    const top =  document.querySelector(".header")
    top.textContent="";
    createScoreBoard(top);
    document.querySelector(".main").classList.add("main__after");   
}

function resetContent() {
    Array.from(document.querySelector(".main").children)
          .map((element) =>{
            element.textContent =""
            element.removeAttribute("src")
          });
}

function countDownTimer(value,element){
    let promise = new Promise((resolve,reject)=>{
       const timer =  setInterval(()=> {
        element.textContent = value - 1;
        value -=1;        
        if(value <=0){
          clearInterval(timer);
          resolve(element);
        }
      },1000)  
     })
    
     return promise;
}

// creates the scoreboard for the dice game

function createScoreBoard(header) {

    const board = document.createElement("h1");
    board.textContent = "Score :";
    const result = document.createElement("h1");
    result.classList.add("header__result");
    result.textContent = `Player 1  ${playerResult.player1} :
                          Player 2  ${playerResult.player2};`
    header.appendChild(board);
    header.appendChild(result);

}



function displayResults() {

    countDownTimer(4,document.querySelector(".main__text"))
    .then((element)=>element.textContent="")
    .then(()=> {
             const diceValues = [];

             Array.from(document.querySelectorAll(".main__image"))
              .map((image)=>{
                const random = Math.floor((Math.random() * 6) + 1);
                image.setAttribute("src",`./images/dice${random}.png`)
                diceValues.push(random);
             });
              return diceValues;
    }).then((array) => {
        const winner = array.indexOf(Math.max(...array));
        const loser = array.indexOf(Math.min(...array));
        result(winner,loser);
        // document.querySelector(".main__winner").textContent = checkDraw(winner,loser);
    }).then(()=>{
        const replay =  document.querySelector(".main__button");
        replay.textContent =" Play Again? ";
        return replay;
    })
}


function result (winner,loser){

    if(winner === loser) {
        document.querySelector(".main__winner").textContent = "Its a draw!";
    }else {
        document.querySelector(".main__winner").textContent = `Player ${winner +1} is the winner!`;
        playerResult[`player${winner+1}`]++;
    
        const update =  document.querySelector(".header__result");
        update.textContent = `Player 1 ${playerResult.player1} : 
                              Player 2 ${playerResult.player2};`
    }

    // return winner === loser ? "Its a draw!" : `Player ${winner +1} is the winner!`;
}



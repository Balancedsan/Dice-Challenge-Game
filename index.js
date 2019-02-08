// player Score

const playerResult = {
    player1: 0,
    player2: 0
}

 // button the header button

document.querySelector(".header__button").addEventListener("click", () => {
    renderHeader();
    document.querySelector(".header").classList.add("header__after");
    displayResults();
})


// button for the main button

document.querySelector(".main__button").addEventListener("click",()=> {
    resetContent();
    document.querySelector(".main__button").classList.add("hide__display");
    displayResults();
})

// renders the header score

function renderHeader(){
    const currentContent = document.querySelector(".header");
    currentContent.style.fontSize = "x-large";
    const replaceWith =   `<h1>Current   Score: <br> Player 1: ${playerResult.player1}  <br> Player 2: ${playerResult.player2}</h1>`;
    changeElementContent(currentContent ,replaceWith);
}



// changes the element content

function changeElementContent(element, content) {
    saferInnerHTML(element, content);
}

// countdown timer used to display before running the content

function countDownTimer(value, element) {
    element.textContent = " Are You Ready? ";
    const promise = new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            element.style.fontSize = "xx-large";
            element.textContent = value - 1;
            value -= 1;
            if (value <= 0) {
                clearInterval(timer);
                resolve(element);
            }
        }, 1000)
    })

    return promise;
}



function toggleDisplay(element) {
    element.toggle("hide__display");
}

// display the results

function displayResults() {

    countDownTimer(4, document.querySelector(".main__text"))
    .then((element)=> {
        renderBody(element);
     })
}

// renders the body of the game

function renderBody(element){
    element.textContent = "";
    generateImages()
    result(getDiceResult());
    document.querySelector(".main__button").textContent = "Play again?";
    document.querySelector(".main__button").classList.remove("hide__display");
}



// generate random dice result from 1-6

function generateImages() {
    Array.from(document.querySelectorAll(".main__image"))
         .map((image,index)=> {
            document.querySelector(`.main__player${index+1}`).textContent = `Player ${index+1}`;
            image.setAttribute("src",`./images/dice${Math.floor((Math.random() * 6) + 1)}.png`)
         });
}




// return the dice number from the image src tag

function getDiceResult() {
    const diceValues = [];
    Array.from(document.querySelectorAll(".main__image"))
    .map((image)=> {
                const valueToExtract = image.getAttribute("src");
                diceValues.push(parseInt(...valueToExtract.match(/\d+/g)));

    });

    return diceValues;
}


// display result of the winner

function result(array) {
    const winner = array.indexOf(Math.max(...array));
    const loser = array.indexOf(Math.min(...array));
    return winner === loser ? document.querySelector(".main__winner").textContent = "Its a draw! No one wins" : updateWinnerScore(winner);
}

// updates Score Board

function updateWinnerScore(winner) {
        document.querySelector(".main__winner").textContent = `Player ${winner +1} is the winner!`;
        playerResult[`player${winner+1}`]++;
        renderHeader();
}


// resets the content 

function resetContent() {

    Array.from(document.querySelectorAll(".main__content"))
                       .map((element)=> {
                           element.textContent = ""
                       });
     Array.from(document.querySelectorAll(".main__image"))
                         .map((element)=> {
                             element.removeAttribute("src")
                         });

}   





// maybe in future usage

// // generate element 

// function createElement(element,text,...classes) {

//     // adds the optional class value to the element

//     const result = document.createElement(element)
//     result.textContent = text;
//     // result.classList.add(...classes);
//     return result;
// }




// // current header content

// function createHeaderContent() {
//     const currentContent = document.querySelector(".header");

//     const ScoreBoard =    createElement("h1","Current Score:","header__score");
//     const Player1Score =  createElement("h1",`Player 1: ${playerResult.player1}`,"header__score  ");
//     const Player2Score =  createElement("h1",` Player 2: ${playerResult.player2}`,"header__score ");
//     appendToParentElement(currentContent,ScoreBoard,Player1Score,Player2Score);
// }




// // append child elements to parent element

// function appendToParentElement(parent,...children){
//     for(let iteratable of children){
//         parent.appendChild(iteratable);
//     }
// }
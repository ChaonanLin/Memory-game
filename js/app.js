
document.addEventListener("DOMContentLoaded", resetGame, true);

// Create a list that holds all of your cards

const cards= document.querySelectorAll('.card')
const deck = document.querySelector('.deck')
let openCard=[];
let matchedCards=0;
let move = 0;
let minutes = 0;
let seconds = 0;
let hours =0;
let t;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// resetGame
function resetGame() {
    deck.innerHTML='';
    const suffledCards = shuffle(Array.from(cards));

    // - loop through each card and create its HTML
    for (let i = 0; i < suffledCards.length; i++) {
        let card = suffledCards[i];
        card.classList.remove("show", "open", "match");

        // - add each card's HTML to the page
        deck.appendChild(card);
    }

    //reset move and timer
    document.querySelector('.moves').innerText= 0 + ' Move';
    move= 0;
    matchedCards = 0;
    minutes = 0;
    seconds = 0;
    hours = 0;

    resetStars();
}

//change the move display
function changemove(){
    if (move<2) {
        document.querySelector('.moves').innerText= move + ' Move';
    }
    if (move>=2) {
        document.querySelector('.moves').innerText= move + ' Moves';
    }
}

const stars=document.querySelectorAll('.fa-star');

function resetStars(){
    stars.forEach(function(el){
        el.style.display="inline-block";
    })
};

function changestar() {
    if (move>=25) {
        // remove the third star on game page
        stars[2].style.display="none";
        // remove the third star on finish game message page
        stars[5].style.display="none";
        if (move>=35) {
            stars[1].style.display="none";
            stars[4].style.display="none";
            if (move>=40){
                stars[0].style.display="none";
                stars[3].style.display="none";
            }
        }
    }
}

function displayTime() {
    seconds ++;
    if (seconds>= 60) {
        minutes++;
        seconds=0;
    }
    if (minutes>=60) {
        hours++;
        minutes=0;
    }
    timer();
}


function timer(){
    t= setTimeout(displayTime,1000);
}

//add restart addEventListener
document.querySelector('.restart').addEventListener('click',resetGame,true);

//when clicked, the card will be flipped
const flipcard=function (event) {
    const clickedCard = event.target;

    //start timer
    timer();

    // check if it is the first click
     if (openCard.length<2) {
         clickedCard.classList.add('open', 'show')
         // add the card to a *list* of "open" cards
         openCard.push(clickedCard);
     }

     //if the list already has another card, check to see if the two cards match
     if (openCard.length === 2) {
         if (openCard[0].firstElementChild.className === openCard[1].firstElementChild.className ) {
             openCard.forEach(function(card){
                 card.classList.add('match')
             });
             matchedCards = matchedCards + 2;
             openCard.forEach(function(card){
                 card.removeEventListener('click',flipcard,true)
             });
         }

         //if the cards do not match, remove the cards from the list and hide the card's symbol
         else {
             openCard.forEach(function(card){
                 card.classList.add('shake')
             });
             openCard.forEach(function(card){
                 setTimeout(function(){card.classList.remove('open' ,'show','shake')
             },650);
             });
         }
         openCard.splice(0,openCard.length);
     }
     move += 1;
     //increment the move counter and display it on the page
     changemove();
     //decrease stars when moves increase
     changestar();

     if (matchedCards === 16) {
         finishGame();
     }
 };

// set up the event listener for a card. If a card is clicked:
for (let i=0; i<=16; i++) {
        cards[i].addEventListener('click',flipcard,true);
}

function playagain () {
    document.querySelector('.finishPopup').style.display="none";
    resetGame();
}

function finishGame() {
    clearTimeout(t);
    document.querySelector('.finishPopup').style.display="flex";
    document.querySelector('.play-again').firstElementChild.addEventListener('click',playagain,true);
    document.querySelector('.finishMessage').innerHTML="Congratulations! <br /> Moves: "+ move +" moves <br/> Time:"+minutes+" mins "+seconds+" seconds </br/>"
};





//bugs: 点击图标时，无法找到firstChild导致down机

/*
 *    + if the cards do match, lock the cards in the open position
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

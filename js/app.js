
document.addEventListener("DOMContentLoaded", createCard, true);

// Create a list that holds all of your cards

const cards= document.querySelectorAll('.card')
const deck = document.querySelector('.deck')
let openCard=[];
let matchedCards=0;
let move = 0;


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

// - loop through each card and create its HTML
// - add each card's HTML to the page
function createCard() {
    deck.innerHTML='';
    const suffledCards = shuffle(Array.from(cards));
    for (let i = 0; i < suffledCards.length; i++) {
        let card = suffledCards[i];
        card.classList.remove("show", "open", "match");
        deck.appendChild(card);
    }
    move = 0;
}

function changemove(){
    if (move<2) {
        document.querySelector('.moves').innerText= move + ' Move';
    }
    if (move>=2) {
        document.querySelector('.moves').innerText= move + ' Moves';
    }
}
//add restart addEventListener
document.querySelector('.restart').addEventListener('click',createCard,true);

const flipcard=function (event) {
    const clickedCard = event.target;
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
         }
         //if the cards do not match, remove the cards from the list and hide the card's symbol
         else {
             openCard.forEach(function(card){
                 setTimeout(function(){card.classList.remove('open' ,'show')
             },650);
             });
         }
         openCard.splice(0,openCard.length);
     }
     move += 1;
     changemove();
 };

// set up the event listener for a card. If a card is clicked:
for (let i=0; i<=16; i++) {
        cards[i].addEventListener('click',flipcard,true);
}


/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

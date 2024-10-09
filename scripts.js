const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;

//in case you have multiple cards of different types
let lockBoard = false;

let firstCard, secondCard;

function flipCard(){
    if(lockBoard){
        return;
    }
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this; //this 
    }
    else{
        //second click
        hasFlippedCard = false;
        secondCard = this;
       checkForMatch();
    }
    // you can also put "return;" in  if(!hasFlippedCard){}
    // then remove the else{} and leave the rest out in the function
    // then if it's not true, it will just exit the function
    // just like what we did with lockBoard and if===firstcard above
}

function checkForMatch(){
    //do they match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? disableCards() : unFlipCards();
    //SAME AS:
    //  if(firstCard.dataset.framework === secondCard.dataset.framework){
    //      disableCards();
    //  }
    //  else{
    //      unFlipCards();
    //  }
}

function disableCards(){
    //it's a match!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unFlipCards(){
    lockBoard = true;
    //not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        //unlock the board
        lockBoard = false;
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        // generate number between 0-11
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Lesson Notes

// document.querySelector('#current-' + activePlayer).textContent = dice; // A SETTER - we set a value!
//textContent can only set plain text/numbers, NOT html - otherwise use innerHTML if you want to append HTML elements with text/numbers

// innerHTML requires a STRING input
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; 

// var x = document.querySelector('#score-0').textContent; // A GETTER - we get a value!

/* ***EVENT HANDLING */
// Events are handled as soon as the execution stack is empty, when all the functions have returned

// * Message queue - exe stack, click event(clickHandler()), scroll event

// * Callback functions and anonymous functions *

// addEventListner calls the btn func for us = CALLBACK function
// document.querySelector('.btn-roll').addEventListener('click', btn())


// STATE VARIABLE = tells us the condition of a system
// We need state to remember something or determine whether or not our game is playing

// Lesson Notes END

var log = console.log;

var scores, roundScore, activePlayer, dice1, dice2, gamePlaying, deathRoll, userScore, winningScore;

winningScore = 100;

initGame();

// function after 'click' is anonymous = means we can't use the function outside of this below context
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // ** DICE ROLLS
        // Math.random to generate a random number 1 through 6 and round down to whole integer with Math.floor
        dice1 = Math.floor((Math.random() * 6) + 1);
        dice2 = Math.floor((Math.random() * 6) + 1);
        log("1:", dice1, "2:", dice2);
        // Next, display the result (the die value the player rolled)
        var diceDom1 = document.querySelector('.dice1');
        diceDom1.style.display = 'block';
        diceDom1.src = 'dice-' + dice1 + '.png';

        // Next, display the result (the die value the player rolled)
        var diceDom2 = document.querySelector('.dice2');
        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-' + dice2 + '.png';

        // if player rolls two 6's
        if (dice1 === 6 && dice2 === 6) {
            // current player looses ALL points (both roundScore and total score 'score-0 or score-1')!
            deathRoll();
        // otherwise run the regular game routine    
        } else {
            // Update roundScore ('current score') IF player did NOT roll a 1
            if (dice1 !== 1 && dice2 !==1) {
                // Add dice score to roundScore
                roundScore += dice1 + dice2;
                // update score to DOM via textContent
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // otherwise, if player rolls a 1, run nextPlayer()
            } else {
                // switch player, hide dice, change player panel class for next player to active
                nextPlayer();
            }
        }   
    }
});

/** HOLD Function */
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check player score to see if they won
        if (scores[activePlayer] >= winningScore) {
            // swap winning player's title with 'Winner!'
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            // hide both dice
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            // and apply the css effects that highlights the winning player's 'player-panel'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // turn the game off so player's can no longer roll the dice or hold anymore points
            gamePlaying = false;
        } else {
            // switch player
            nextPlayer();
        }
    }
});

// switch active player, hide dice, change player panel class for next player to active
function nextPlayer() {
    // Next player's turn - using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // 0 out the current score - prevents previous player's score from being added to opposing player's score
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // You could build an if-else statement to employ add and remove methods to switch active class between player panels - but toggle method to the rescue!
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    // ||
    // \/
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // change dice display style to none
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

// if player rolls TWO sixes, they're screwed and they lose ALL their points!
function deathRoll() {
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    // document.getElementById('score-1').textContent = '0';

    // Next player's turn - using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // 0 out the current score - prevents previous player's score from being added to opposing player's score
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // toggle the opposing players active state
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // change dice display style to none
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    scores = [0, 0]; // index 0 and 1 for player 1 & 2
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // changing the css display property on the dice class to none
    // style = method, display = css property, 'none' = css property value
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    // zero out all scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // change display back to player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // remove the winner css styling
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // remove the active class from both players
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // set player 1 as the activePlayer and now we're ready for another game!
    document.querySelector('.player-0-panel').classList.add('active');
}

// handles custom score entered by user to win - this will fire only if players click the 'set score' button
// otherwise, winningScore is by default set to 100 and
// players can just skip entering a value and skip clicking 'set score'
function customScore() {
    // get the value from the input field
    var userScore = document.getElementById('winningScore').value;
    log('target score: ', userScore)
    // if the user score exists
    if (userScore) {
        winningScore = userScore;
        document.getElementById('displayWinningScore').innerHTML = winningScore; 
    }
}
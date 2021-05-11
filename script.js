'use strict'

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const btnSet = document.querySelector('.btn--set')
let scoreTarget;

btnSet.addEventListener('click', function(){
  let selectedScore = document.querySelector('.select-score').value
  scoreTarget = parseInt(selectedScore)
})


//Starting conditions

let scores, playing, activePlayer, currentScore

const init = function() {
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  
  diceEl.classList.add('hidden')
  
  activePlayer = Math.trunc(Math.random() * 2)
  if(activePlayer === 0) {
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
  } else {
    player0El.classList.remove('player--active')
    player1El.classList.add('player--active')
  }

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  playing = true
  scores = [0, 0]
  currentScore = 0
}

init()

const rollDice = function() {
  if(playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1
    // 2. Display dice
    diceEl.classList.remove('hidden')
    diceEl.src = `images/side-${dice}.png`
    // 3. Check for rolled 1, if true, switch to next player
    if(dice !== 1) {
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }
  }
}

const holdScore = function() {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    // 2. Check if player's score is >= 30
    if(scores[activePlayer] >= scoreTarget) {
      // Finish the game
      playing = false
      diceEl.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      // document.getElementById(`name--${activePlayer}`).textContent = 'YOU WIN!'
    } else {
    // Switch to the next player
    switchPlayer()
    }
  }
}

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

if(activePlayer === 0) {
  player0El.classList.add('player--active')
} else {
  player1El.classList.add('player--active')
}

//Rolling dice functionality
btnRoll.addEventListener('click', rollDice)

// Holding score functionality
btnHold.addEventListener('click', holdScore)

//New game functionality
btnNew.addEventListener('click', init)



// Modal Button Rules

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const btnsOpenModal = document.querySelectorAll('.show-modal')

const openModal = function() {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = function() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

for(let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal)
  btnCloseModal.addEventListener('click', closeModal)
  overlay.addEventListener('click', closeModal)
}

document.addEventListener('keydown', function(e) {
  // console.log(e.key)

  if(e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

// Press TAB button = New Game
document.addEventListener('keydown', function(newKey) {
   if(newKey.key === 'Tab' && modal.classList.contains('hidden') && modal1.classList.contains('hidden')) {
    init()
  }
})  

// Press ENTER button = Roll Dice
document.addEventListener('keydown', function(rollKey) {
   if(rollKey.key === 'Enter' && modal.classList.contains('hidden') && modal1.classList.contains('hidden')) {
    rollDice()
  }
}) 

// Press Space button = Hold Current Score
document.addEventListener('keydown', function(holdKey) {
   if(holdKey.code === 'Space' && modal.classList.contains('hidden') && modal1.classList.contains('hidden')) {
    holdScore()
  }     
})    


// Modal Button Options

const modal1 = document.querySelector('.modal-1')
const overlay1 = document.querySelector('.overlay-1')
const btnCloseModal1 = document.querySelector('.close-modal-1')
const btnsOpenModal1 = document.querySelectorAll('.show-modal-1')

const openModal1 = function() {
  modal1.classList.remove('hidden')
  overlay1.classList.remove('hidden')
}

const closeModal1 = function() {
  modal1.classList.add('hidden')
  overlay1.classList.add('hidden')
}

for(let x = 0; x < btnsOpenModal1.length; x++) {
  btnsOpenModal1[x].addEventListener('click', openModal1)
  btnCloseModal1.addEventListener('click', closeModal1)
  overlay1.addEventListener('click', closeModal1)
}

document.addEventListener('keydown', function(event) {
  // console.log(e.key)

  if(event.key === 'Escape' && !modal1.classList.contains('hidden')) {
    closeModal1()
  }
})
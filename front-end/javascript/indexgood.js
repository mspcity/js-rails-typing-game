const GAME_TIME = 5;
let score = 0;
let time = GAME_TIME
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const baseUrl = 'http://localhost:3000'


const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = () => document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const form = () => document.querySelector('form');
const userName = () => document.querySelector('input#user-name')
const userList = () => document.getElementById('records')
// const users = [];
// const games = [];

document.addEventListener("DOMContentLoaded", callOnLoad)

function callOnLoad() {

  // getUsers();

  loadUsers();
  form().addEventListener('submit', createUser)
}

init();

function init() {
  WordAPI.getWords();
  
  wordInput.addEventListener('input', checkMatch)
}

function run() {
  if(isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay().innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50)
  buttonChange('Game playing')
}
// could move into game class as static method Game.checkStatus()
function checkStatus(){
  if (!isPlaying && time === 0) {
    buttonChange("start")
    clearInterval(checkInterval);
    // location.reload()
     
  }
}
WordAPI.getWords();

// function getWords() {
//   axios.get('https://random-word-api.herokuapp.com/word?number=1000')
//   .then(function (response) {
    
//     response.data.forEach((word) => {
//       if(word.length > 9) {
        
//         words.push(word)
//       }
//     })
//     // words = response.data;
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
  
//   buttonChange('start')
// }

// make an could move to Game class and make instance method
function checkMatch () {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay().innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex]

    
  }
}

// could move to game class as instance method
function countDown() {
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying) {
    clearInterval(timeInterval)
  }
  timeDisplay.innerText = time;
}

//in game class, make a static method for start new game, this will create a new game instance, 
//start the game running and tell it when its finished, Game.startNewGame()



function buttonChange(text) {
  button.innerText = text;
  text === 'start' ? button.classList.remove('loading') : button.classList.add('loading');
}

// callonload

function loadUsers(){
  // when data comes back  will need to display to page

  fetch(baseUrl + '/users')
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json()
    })
    .then(data => {
      User.createUsers(data)
      User.displayUsers();
    })
    .catch(errors => console.log(errors))

      
      // displayUsers(data)
}

async function getUsers() {
  const promise = await fetch(baseUrl + '/users');
  const users = await promise.json();
  // displayUsers(users);
  User.displayUsers();
}

function createUser(e) {
  e.preventDefault();
  const strongParams = {
    user: {
      name: userName().value
    },
    game: {
      score: parseInt(scoreDisplay().innerText, 10)
    }
  }  
  
  fetch(baseUrl + '/users', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
  })
  .then(resp => resp.json())
  .then(user => {
    
    let player = User.create(user.id, user.name, user.games)
   player.addGame();
  })
  // users.push(user)

  // displayUser(user);
  
  resetInputs();
}

// function displayUsers(users) {
//   users.forEach(user => displayUser(user))
  
// }


// function displayUser(user) {
//     const div = document.createElement('div');
//     const h4 = document.createElement('h4');
//     const deleteButton = document.createElement('button');
//     deleteButton.classList.add('btn');
//     deleteButton.innerText = "delete";
//     deleteButton.id = user.id;

//     deleteButton.addEventListener('click', deleteUser) 

//     h4.innerText = `${user.name} : ${user.games[user.games.length - 1 ].score}`
    
//     div.appendChild(h4);
//     div.appendChild(deleteButton);
//     userList().appendChild(div);

//   }

  /*
  <div>
    <h4>name</h4> 
    
  </div>
  */
 function deleteUser(e) {
   
   this.id 
   this.parentNode

   fetch(baseUrl + '/users/' + this.id, {
     method: 'delete'
   })
   .then(resp => {
     return resp.json();
   })
   .then(data => {
      this.parentNode.remove();
   })
 }


// function createGame() {
  
//   let game = {
//     score: parseInt(scoreDisplay().innerText, 10)
//   }
//   games.push(game)
//   displayGame(game)
// }

// function displayGame(game) {
//   const h4 = document.createElement('h4');
//   h4.innerText = game.score
//   userList().appendChild(h4);
  
// }

function resetInputs() {
  userName().value = "";
}



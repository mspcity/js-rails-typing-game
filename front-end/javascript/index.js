const GAME_TIME = 5;
let score = 0;
let time = GAME_TIME
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
let players = [];
let userInput = [];


const baseUrl = 'http://localhost:3000'

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = () => document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const form = () => document.querySelector('form');
const userName = () => document.querySelector('input#user-name')
const userList = () => document.getElementById('records')
const inputList = () => document.getElementById('inputList');



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

function checkStatus(){
  if (!isPlaying && time === 0) {
    buttonChange("start")
    clearInterval(checkInterval);
    // location.reload()
     
  }
}
WordAPI.getWords();

function checkMatch () {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    word = wordInput.value
    addInput(word);
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

function addInput(word) {
  const ul = document.querySelector('#inputList ul')
  const li = document.createElement('li')
  li.innerText = word
  if (word !== undefined) {
  ul.appendChild(li)
  }
}




  
  
  
  

function countDown() {
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying) {
    clearInterval(timeInterval)
  }
  timeDisplay.innerText = time;
}


function buttonChange(text) {
  button.innerText = text;
  text === 'start' ? button.classList.remove('loading') : button.classList.add('loading');
}

function loadUsers(){
  
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
}

// async function getUsers() {
//   const promise = await fetch(baseUrl + '/users');
//   const users = await promise.json();
//   // displayUsers(users);
//   User.displayUsers();
// }

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
   player.display();
  })
  
  
  resetInputs();
}
  
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

 

function resetInputs() {
  userName().value = "";
}



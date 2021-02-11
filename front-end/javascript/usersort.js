class User {
  static all = [];
  static games = [];

  constructor(id, name, games) {
    this.id = id;
    this.name = name;
    this.games = games;
    User.games = User.games.concat(games)
  }

  display() {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.innerText = "delete";
    deleteButton.id = this.id;
    
    deleteButton.addEventListener('click', deleteUser) 
    
    h4.innerText = `${this.name} : ${this.games[this.games.length - 1].score}`
 
    // debugger;
    div.appendChild(h4);
    div.appendChild(deleteButton);
    userList().appendChild(div);

  }
  static createUsers(usersData) {
    usersData.forEach(data => User.create(data.id, data.name, data.games));

  }

  static create(id, name, games) {
    let user = new User(id, name, games);

    User.all.push(user);
    return user
  }

  static displayUsers() {
    userList().innerHTML = '';
    //User.all.forEach(user => user.display())
    User.sortByScore().forEach(hash => displayHash(hash))
  }

  
  // static orderUsers() {
  //   orderUser.innerHTML = '';
  //   User.all.forEach(user => User.order_by_score)
  // }

  static sortByScore(){
    let sortedGames = User.games.sort(function(a, b) {
      return b.score - a.score
    })
    return sortedGames.map(game=> {
      return {
        name: User.all.find(x => x.id === game.user_id).name,
        score: game.score
      }
    })
 }

}

function displayHash(hash) {
  const div = document.createElement('div');
  const h4 = document.createElement('h4');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn');
  deleteButton.innerText = "delete";
  deleteButton.id = this.id;
  debugger;
  deleteButton.addEventListener('click', deleteUser) 
  
  // h4.innerText = `${this.name} : ${this.games[this.games.length - 1].score}`
  h4.innerText = `${hash.name} : ${hash.score}`
  // debugger;
  div.appendChild(h4);
  div.appendChild(deleteButton);
  userList().appendChild(div);

}
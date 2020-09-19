class User {
  static all = [];

  constructor(id, name, games) {
    this.id = id;
    this.name = name;
    this.games = games;

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
    
    User.all.forEach(user => user.display())
  }
}
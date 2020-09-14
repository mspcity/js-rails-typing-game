class API {
static getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=1000')
    .then(function (response) {
      
      response.data.forEach((word) => {
        if(word.length > 9) {
          
          words.push(word)
        }
      })
      // words = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
    buttonChange('start')
  }
}
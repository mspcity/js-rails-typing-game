class WordAPI {
  static getWords() {
      axios.get('https://random-word-api.herokuapp.com/word?number=1000')
      .then(function (response) {
      
        response.data.forEach((word) => {
          if(word.length > 3) {
          
            words.push(word)
          }
        })
        // words = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      // words = ['Hello', 'Phone', 'Computer']
      buttonChange('start')
  }
}


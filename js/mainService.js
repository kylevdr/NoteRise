angular.module('noteRiseApp').service('mainService', function($http) {

    var sampleNotes = [
        {
            title: 'Sample note',
            text: 'You haven\'t created any notes yet. This is a sample note to get you started. You can edit this note, or delete it and create your own.',
            time: new Date(),
            id: 0
        }
    ];

    var sampleQuote = {
      text: "Sample Quote Text",
      author: "Sample Author"
    };

    this.getNotes = function() {
        return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : sampleNotes;
    };

    this.setNotes = function(noteList) {
        localStorage.setItem('notes', JSON.stringify(noteList));
    };

    this.getQuote = function() {

      //forismatic

      // doesn't work:

      // return $http({
      //   // method: 'POST',
      //   method: 'getQuote',
      //   url: 'http://api.forismatic.com/api/1.0/',
      //   format: 'json',
      //   lang: 'en'
      // });

      // doesn't work:

      // return $http({
      //   method: 'GET',
      //   url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp='
      // });

      // quotesondesign

      // return $http({
      //   method: 'GET',
      //   url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      // }).then(function(result) {
      //   var text = result.data[0].content;
      //   var text = text.slice(3, -6);
      //   var author = result.data[0].title;
      //
      //   return [text, author];
      // });

      //theysaidso
      //Limit 10 API calls/hour
      //Requires paid subscription for more API calls or for random quote

      return $http({
        method: 'GET',
        url: 'http://quotes.rest/qod.json?category=inspire'
      }).then(function(result) {
        return result.data.contents.quotes[0];
      });

    };

});

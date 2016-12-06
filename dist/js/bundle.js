"use strict";

$(document).ready(function () {
    $(".sortable").sortable({ cancel: ".note-list-heading" });
    $(".sortable").disableSelection();
});
'use strict';

angular.module('noteRiseApp', ['ui.router']);
'use strict';

angular.module('noteRiseApp').directive('editor', function () {
  return {
    restrict: 'AE',
    templateUrl: './views/editorDirective.html'
  };
});
'use strict';

angular.module('noteRiseApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.getNotes = function () {
        $scope.notes = mainService.getNotes();
    }();

    // $scope.getQuote = function() {
    //   $scope.quote = mainService.getQuote();
    //   $scope.quoteString = `"${$scope.quote.text}" -- ${$scope.quote.author}`;
    // }();

    $scope.getQuote = function () {
        mainService.getQuote().then(function (result) {
            $scope.quote = result;
            $scope.quote.text = result.quote;
            $scope.quote.author = result.author;
            $scope.quoteString = '"' + $scope.quote.text + '" -- ' + $scope.quote.author;
            console.dir($scope.quote);
        });
    };

    $scope.getQuote();

    $scope.saveNotes = function () {
        mainService.setNotes($scope.notes);
    };

    $scope.setNote = function (note) {
        $scope.currentNote = note;
        $scope.editorNote = {
            title: $scope.currentNote.title,
            text: $scope.currentNote.text
        };
    };

    $scope.createNote = function () {
        var newNote = {
            title: "New Note",
            text: "",
            time: new Date(),
            id: $scope.notes.length
        };
        $scope.notes.unshift(newNote);
        $scope.currentNote = newNote;
        $scope.editorNote = {
            title: $scope.currentNote.title,
            text: $scope.currentNote.text
        };
        $scope.saveNotes();
    };

    $scope.saveNote = function () {
        if ($scope.editorNote.title) {
            $scope.currentNote.title = $scope.editorNote.title;
            $scope.currentNote.text = $scope.editorNote.text;
            $scope.currentNote.time = new Date();
            $scope.saveNotes();
        } else {
            alert("Please add a title.");
        }
    };

    $scope.saveNewNote = function () {
        if ($scope.editorNote.title) {
            var newNote = {
                title: $scope.editorNote.title,
                text: $scope.editorNote.text,
                time: new Date(),
                id: $scope.notes.length
            };
            $scope.notes.unshift(newNote);
            $scope.currentNote = newNote;
            $scope.saveNotes();
        } else {
            alert("Please add a title.");
        }
    };

    $scope.archiveNote = function (note) {
        note.archived = true;
        $scope.saveNotes();
        $scope.clearCurrentNote();
    };

    $scope.clearCurrentNote = function () {
        $scope.currentNote = null;
        $scope.editorNote = null;
        $scope.fullscreen = false;
    };

    $scope.toggleFullScreen = function () {
        $scope.fullscreen = !$scope.fullscreen;
    };
});
'use strict';

angular.module('noteRiseApp').service('mainService', function ($http) {

    var sampleNotes = [{
        title: 'Sample note',
        text: 'You don\'t have any notes yet. Here is a sample note to get you started.',
        time: new Date(),
        id: 0
    }];

    var sampleQuote = {
        text: "Sample Quote Text",
        author: "Sample Author"
    };

    this.getNotes = function () {
        return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : sampleNotes;
    };

    this.setNotes = function (noteList) {
        localStorage.setItem('notes', JSON.stringify(noteList));
    };

    // this.getQuote = function() {
    //   return sampleQuote;
    // };

    this.getQuote = function () {

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
        //TODO: include attribution on about posts_per_page
        //Limit 10 API calls/hour
        //Requires paid subscription for more API calls or for random quote

        return $http({
            method: 'GET',
            url: 'http://quotes.rest/qod.json?category=inspire'
        }).then(function (result) {
            return result.data.contents.quotes[0];
        });
    };
});
'use strict';

angular.module('noteRiseApp').directive('noteList', function () {
  return {
    restrict: 'AE',
    templateUrl: './views/noteListDirective.html',
    link: function link(scope, element, attributes) {
      $(document).ready(function () {
        $(".sortable").sortable({ cancel: ".note-list-heading" });
        $(".sortable").disableSelection();
      });
    }
  };
});
'use strict';

angular.module('noteRiseApp').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/home.html'
    }).state('about', {
        url: '/about',
        templateUrl: './views/about.html'
    });

    $urlRouterProvider.otherwise('/');
});
//# sourceMappingURL=bundle.js.map

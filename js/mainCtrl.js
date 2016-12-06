angular.module('noteRiseApp').controller('mainCtrl', function($scope, mainService) {

    $scope.getNotes = function() {
      $scope.notes = mainService.getNotes();
    }();

    // $scope.getQuote = function() {
    //   $scope.quote = mainService.getQuote();
    //   $scope.quoteString = `"${$scope.quote.text}" -- ${$scope.quote.author}`;
    // }();

    $scope.getQuote = function() {
      mainService.getQuote().then(function(result) {
        $scope.quote = result;
        $scope.quote.text = result.quote;
        $scope.quote.author = result.author;
        $scope.quoteString = `"${$scope.quote.text}" -- ${$scope.quote.author}`;
        console.dir($scope.quote);
      });
    };

    $scope.getQuote();

    $scope.saveNotes = function() {
        mainService.setNotes($scope.notes);
    }

    $scope.setNote = function(note) {
        $scope.currentNote = note;
        $scope.editorNote = {
            title: $scope.currentNote.title,
            text: $scope.currentNote.text
        };
    };

    $scope.createNote = function() {
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

    $scope.saveNote = function() {
        if ($scope.editorNote.title) {
          $scope.currentNote.title = $scope.editorNote.title;
          $scope.currentNote.text = $scope.editorNote.text;
          $scope.currentNote.time = new Date();
          $scope.saveNotes();
        } else {
          alert("Please add a title.");
        }
    };

    $scope.saveNewNote = function() {
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

    $scope.archiveNote = function(note) {
        note.archived = true;
        $scope.saveNotes();
        $scope.clearCurrentNote();
    };

    $scope.clearCurrentNote = function() {
        $scope.currentNote = null;
        $scope.editorNote = null;
        $scope.fullscreen = false;
    }

    $scope.toggleFullScreen = function() {
        $scope.fullscreen = !$scope.fullscreen;
    }
});

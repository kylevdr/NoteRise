angular.module('noteRiseApp').controller('mainCtrl', function($scope, mainService) {

    $scope.getNotes = mainService.getNotes;

    $scope.notes = $scope.getNotes();
    // $scope.getNotes().then(function(results) {
    //     $scope.notes = results;
    // })

    $scope.setNote = function(note) {
        $scope.currentNote = note;
    };

    $scope.createNote = function() {
        var newNote = {
            title: "New Note",
            text: "",
            time: new Date()
        };
        $scope.notes.push(newNote);
        $scope.currentNote = newNote;
    };

    $scope.saveNewNote = function() {
        var newNote = {
            title: $scope.currentNote.title,
            text: $scope.currentNote.text,
            time: new Date()
        };
        $scope.notes.push(newNote);
        $scope.currentNote = newNote;
    }
});
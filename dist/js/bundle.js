"use strict";

$(document).ready(function () {
    $(".sortable").sortable({ cancel: ".note-list-heading" });
    $(".sortable").disableSelection();
});
'use strict';

angular.module('noteRiseApp', []);
'use strict';

angular.module('noteRiseApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.getNotes = function () {
        $scope.notes = mainService.getNotes();
    }();

    // $scope.getNotes().then(function(results) {
    //     $scope.notes = results;
    // })

    $scope.getQuote = function () {
        $scope.quote = mainService.getQuote();
        $scope.quoteString = '"' + $scope.quote.text + '" -- ' + $scope.quote.author;
    }();

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
        $scope.currentNote.title = $scope.editorNote.title;
        $scope.currentNote.text = $scope.editorNote.text;
        $scope.currentNote.time = new Date();
        $scope.saveNotes();
    };

    $scope.saveNewNote = function () {
        var newNote = {
            title: $scope.editorNote.title,
            text: $scope.editorNote.text,
            time: new Date(),
            id: $scope.notes.length
        };
        $scope.notes.unshift(newNote);
        $scope.currentNote = newNote;
        $scope.saveNotes();
    };

    $scope.archiveNote = function (note) {
        note.archived = true;
        $scope.saveNotes();
    };

    $scope.clearCurrentNote = function () {
        $scope.currentNote = null;
        $scope.editorNote = null;
    };
});
'use strict';

angular.module('noteRiseApp').service('mainService', function ($q) {

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

    this.getQuote = function () {
        return sampleQuote;
    };
});
//# sourceMappingURL=bundle.js.map

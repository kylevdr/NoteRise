angular.module('noteRiseApp').service('mainService', function($q) {

    var sampleNotes = [
        {
            title: 'Sample note',
            text: 'You don\'t have any notes yet. Here is a sample note to get you started.',
            time: new Date(),
            id: 0
        }
    ];

    this.getNotes = function() {
        return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : sampleNotes;
    };

    this.setNotes = function(noteList) {
        localStorage.setItem('notes', JSON.stringify(noteList));
    };

});
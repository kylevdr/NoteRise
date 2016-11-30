angular.module('noteRiseApp').service('mainService', function($q) {

    var notes = [
        {
            title: 'Sample note',
            text: 'Sample note text',
            time: '2016-11-29T23:39:38.341Z'
        },
        {
            title: 'Sample note 2',
            text: 'Sample note text 2',
            time: '2016-11-29T23:39:38.341Z'
        }
    ];

    this.getNotes = function() {
        return notes;
    }

});
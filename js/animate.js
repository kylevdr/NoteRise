$(document).ready(function() {
    $(".sortable").sortable({cancel: ".note-list-heading"});
    $(".sortable").disableSelection();
});
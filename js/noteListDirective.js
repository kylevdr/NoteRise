angular.module('noteRiseApp').directive('noteList', function() {
  return {
    restrict: 'AE',
    templateUrl: './views/noteListDirective.html',
    link: function(scope, element, attributes) {
      $(document).ready(function() {
          $(".sortable").sortable({cancel: ".note-list-heading"});
          $(".sortable").disableSelection();
      });
    }
  };
});

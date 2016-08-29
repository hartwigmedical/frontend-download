import angular from 'angular';
import Clipboard from 'clipboard';

angular.module('ngclipboard', []).directive('ngclipboard', function() {
  return {
    restrict: 'A',
    scope: {
      ngclipboardSuccess: '&',
      ngclipboardError: '&'
    },
    link: (scope, element) => {
      const clipboard = new Clipboard(element[0]);

      clipboard.on('success', function(evnt) {
        scope.$apply(function () {
          scope.ngclipboardSuccess({
            $event: evnt
          });
        });
      });

      clipboard.on('error', function(evnt) {
        scope.$apply(function () {
          scope.ngclipboardError(evnt);
        });
      });
    }
  };
});

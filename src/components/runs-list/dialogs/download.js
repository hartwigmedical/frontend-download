import angular from 'angular';

function DownloadSelectedDialogController($scope, $mdDialog, downloadActions) {
  $scope.fileTypes = {};

  // Find the filetypes
  $scope.runsList.selected.forEach(run => {
    run.files.forEach(file => {
      if (!$scope.fileTypes[file.name]) {
        $scope.fileTypes[file.name] = false;
      }
    });
  });

  // Close dialog
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  // Download the files
  $scope.download = function() {
    const files = $scope.getSelectedFiles();

    downloadActions.generateDownloadLinks(files)
      .then(links => {
        return downloadActions.download(links);
      })
      .catch(() => {
        // @TODO handle error
      });
  };

  // Checks if any of the checkboxes is checked
  $scope.canDownload = function() {
    let selected = false;

    for (const key in $scope.fileTypes) {
      if ($scope.fileTypes.hasOwnProperty(key) && $scope.fileTypes[key]) {
        selected = true;
      }
    }
    return selected;
  };

  $scope.getSelectedFiles = function() {
    const files = [];

    $scope.runsList.selected.forEach(run => {
      if (run.files && run.files.length > 0) {
        run.files.forEach(file => {
          if ($scope.fileTypes[file.name]) {
            files.push(file);
          }
        });
      }
    });

    return files;
  };

  $scope.getNumberOfFiles = function() {
    const files = $scope.getSelectedFiles();

    if (files.length > 0) {
      return files.length;
    }
  };
}

DownloadSelectedDialogController.$inject = ['$scope', '$mdDialog', 'DownloadActions'];


export function downloadSelectedDialog($event, $scope) {
  return {
    controller: DownloadSelectedDialogController,
    clickOutsideToClose: true,
    scope: $scope,
    preserveScope: true,
    parent: angular.element(document.body),
    targetEvent: $event,
    template: `
      <md-dialog class="download-selected-dialog">
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>Download selection</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <md-icon aria-label="Close dialog">
                <span class="mdi mdi-close"></span>
              </md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-dialog-content>
          <div class="checkboxes" layout="column">
            <md-checkbox ng-repeat="(key, value) in fileTypes" ng-model="fileTypes[key]" aria-label="{{key}}">{{key}}</md-checkbox>
          </div>
          <md-button ng-disabled="!canDownload()" ng-click="download()">DOWNLOAD {{getNumberOfFiles()}} FILES</md-button>
        </md-dialog-content>
      </md-dialog>
    `
  };
}



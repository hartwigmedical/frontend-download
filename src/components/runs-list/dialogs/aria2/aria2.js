import angular from 'angular';

function Aria2DialogController($scope, $mdDialog, downloadActions) {
  $scope.fileTypes = {};
  $scope.selectAll = false;

  // Find the filetypes
  $scope.runsList.selected.forEach(run => {
    run.files.forEach(file => {
      if (!$scope.fileTypes[file.name]) {
        $scope.fileTypes[file.name] = false;
      }
    });
  });

  $scope.selectAllFileTypes = function() {
    for (const name in $scope.fileTypes) {
      if ($scope.fileTypes.hasOwnProperty(name)) {
        $scope.fileTypes[name] = $scope.selectAll;
      }
    }
  };

  $scope.selectFileType = function(selected) {
    if (!selected) {
      $scope.selectAll = false;
    }
  };

  // Close dialog
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  // Download the files
  $scope.download = function() {
    $scope.error = false;

    downloadActions.generateDownloadLinksForRuns($scope.runsList.selected, $scope.fileTypes)
      .then(() => {
        downloadActions.generateAria2Config($scope.runsList.selected, $scope.fileTypes);
      })
      .catch(() => {
        $scope.error = true;
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

Aria2DialogController.$inject = ['$scope', '$mdDialog', 'DownloadActions'];


export function aria2SelectedDialog($event, $scope) {
  return {
    controller: Aria2DialogController,
    clickOutsideToClose: true,
    scope: $scope,
    preserveScope: true,
    parent: angular.element(document.body),
    targetEvent: $event,
    template: `
      <md-dialog class="aria2-selected-dialog">
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>Aria 2 config</h2>
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
            <md-checkbox ng-model="selectAll" ng-change="selectAllFileTypes()">All Files</md-checkbox>
            <md-checkbox ng-repeat="(key, value) in fileTypes"
                         ng-change="selectFileType(filesTypes[key])"
                         ng-model="fileTypes[key]"
                         aria-label="{{key}}">{{key}}</md-checkbox>
          </div>
          <p class="error" ng-if="error">An error occured try again later...</p>
          <md-button ng-disabled="!canDownload()" ng-click="download()">DOWNLOAD CONFIG</md-button>
        </md-dialog-content>
      </md-dialog>
    `
  };
}



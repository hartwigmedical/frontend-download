import angular from 'angular';

function CopySelectedDialogController($scope, $mdDialog) {
  $scope.fileTypes = {};
  $scope.selectAll = false;

  $scope.links = '';
  $scope.generatingLinks = false;

  $scope.selectAllFileTypes = function() {
    for (const name in $scope.fileTypes) {
      if ($scope.fileTypes.hasOwnProperty(name)) {
        $scope.fileTypes[name] = this.selectAll;
      }
    }

    $scope.generateLinks();
  };

  $scope.selectFileType = function(selected) {
    if (!selected) {
      $scope.selectAll = false;
    }

    $scope.generateLinks();
  };

  // Find the filetypes
  $scope.runsList.selected.forEach(run => {
    run.files.forEach(file => {
      if (!$scope.fileTypes[file.name]) {
        $scope.fileTypes[file.name] = false;
      }
    });
  });

  $scope.generateLinks = function() {
    $scope.generatingLinks = true;

    $scope.runsList.downloadActions.generateDownloadLinksForRuns($scope.runsList.selected, $scope.fileTypes)
      .then(() => {
        let linksText = '';

        $scope.runsList.selected.forEach(run => {
          run.files.forEach(file => {
            if ($scope.fileTypes[file.name]) {
              linksText += `\n\n${file.link}`;
            }
          });
        });

        $scope.links = linksText.trim();
      })
      .catch(() => {
        $scope.error = true;
      })
      .finally(() => {
        $scope.generatingLinks = false;
      });
  };

  $scope.canCopy = function() {
    return $scope.links.length > 0;
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}

CopySelectedDialogController.$inject = ['$scope', '$mdDialog'];

export function copySelectedDialog($event, $scope) {
  return {
    controller: CopySelectedDialogController,
    clickOutsideToClose: true,
    scope: $scope,
    preserveScope: true,
    parent: angular.element(document.body),
    targetEvent: $event,
    template: `
      <md-dialog class="copy-selected-dialog">
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>Copy URL's</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="cancel()">
              <md-icon aria-label="Close dialog">
                <span class="mdi mdi-close"></span>
              </md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-dialog-content>
          <textarea rows="10" readonly="true" id="copy-selected-modal-text">{{links}}</textarea>
          <div class="checkboxes">
            <md-checkbox ng-model="selectAll"
                         ng-change="selectAllFileTypes()"
                         ng-disabled="generatingLinks">All Files</md-checkbox>
            <md-checkbox ng-disabled="generatingLinks"
                         ng-change="selectFileType()"
                         ng-repeat="(key, value) in fileTypes"
                         ng-model="fileTypes[key]"
                         aria-label="{{key}}">{{key}}</md-checkbox>
          </div>
          <p class="error" ng-if="error">An error occured try again later...</p>
          <div class="actions" flex layout="row" layout-align="end center">
            <md-progress-circular ng-if="generatingLinks"
                                  md-mode="indeterminate"
                                  md-diameter="20px"></md-progress-circular>
            <md-button ng-disabled="generatingLinks || !canCopy()"
                      ngclipboard
                      data-clipboard-target="#copy-selected-modal-text">COPY</md-button>
          </div>
        </md-dialog-content>
      </md-dialog>
    `
  };
}

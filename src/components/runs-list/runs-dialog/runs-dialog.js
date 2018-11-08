import angular from 'angular';

/* eslint-disable max-params */
const RunsDialogController = [
  '$scope',
  '$mdDialog',
  'selectedRuns',
  'RunsDetailsActions',
  'RunsDetailsStore',
  'RestoreActions',
  'DownloadActions',
  function($scope, $dialog, runs, runsDetailsActions, runsDetailsStore, restoreActions, downloadActions) {
    // Setup the initial scope
    $scope.$dialog = $dialog;
    $scope.currentPage = 0;
    $scope.runsDetailsStore = runsDetailsStore;

    // Load the initially needed data
    runsDetailsActions.loadDetails(runs.map(run => {
      return run.id;
    }));
    restoreActions.getRestoreLimit();

    // Check or uncheck a fileType
    $scope.toggleFileType = (fileType, checked) => {
      runsDetailsActions.toggleFileType(fileType, checked);
    };

    // Go to the next step in the wizard
    $scope.next = () => {
      $scope.currentPage = $scope.currentPage === 0 && runsDetailsStore.tieredFiles.length > 0 ? 1 : 2;

      if ($scope.currentPage === 2 && runsDetailsStore.selectedFiles.length > 0) {
        downloadActions.generateDownloadLinks(runsDetailsStore.selectedFiles.map(file => {
          return file.fileid;
        }));
      }
    };

    // Go to the previous page in the wizard
    $scope.previous = () => {
      $scope.currentPage = $scope.currentPage === 2 && runsDetailsStore.tieredFiles.length > 0 ? 1 : 0;
    };

    // Check if you can continue to the next step
    $scope.canContinue = () => {
      if ($scope.currentPage === 0) {
        for (const fileType in runsDetailsStore.fileTypes) {
          if (runsDetailsStore.fileTypes[fileType] === true) {
            return true;
          }
        }

        return false;
      }

      return true;
    };

    // Check whether all files can be restored
    $scope.canRestoreAll = () => {
      let totalRestoreSize = 0;
      let numberOfFiles = 0;

      runsDetailsStore.tieredFiles.forEach(file => {
        if (file.tier_status === 'COLD') {
          totalRestoreSize += file.filesize;
          numberOfFiles += 1;
        }
      });

      return totalRestoreSize < runsDetailsStore.restoreLimit && numberOfFiles > 1;
    };

    // Start the restoring of the given file
    $scope.restore = file => {
      if (file.filesize < runsDetailsStore.restoreLimit) {
        file.restore_loading = true;
        file.restore_error = false;

        restoreActions.restoreFiles([file.fileid])
          .then(() => {
            restoreActions.getRestoreLimit();
            file.tier_status = 'RESTORE';
            file.restore_loading = false;
          })
          .catch(() => {
            file.restore_loading = false;
            file.restore_error = true;
          });
      }
    };

    $scope.restoreAll = () => {
      runsDetailsStore.tieredFiles.forEach(file => {
        if (file.tier_status === 'COLD') {
          $scope.restore(file);
        }
      });
    };

    $scope.generateAria2 = () => {
      downloadActions.generateAria2Config(runsDetailsStore.downloadLinks);
    };

    $scope.downloadFiles = () => {
      downloadActions.downloadFiles(runsDetailsStore.downloadLinks);
    };
  }
];
/* eslint-enable max-params */
/* eslint-disable max-len */
export function runsDialog($event, selectedRuns) {
  return {
    controller: RunsDialogController,
    clickOutsideToClose: false,
    locals: {
      selectedRuns
    },
    parent: angular.element(document.body),
    targetEvent: $event,
    template: `
      <md-dialog class="runs-dialog" aria-label="Checkout">
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>Checkout</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="$dialog.cancel()" aria-label="Close dialog">
              <md-icon>
                <span class="mdi mdi-close"></span>
              </md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-dialog-content>
          <div class="stepper" layout="row" layout-align="center center">
            <hr />
            <div class="step" ng-class="{'active': currentPage === 0}" layout="row" layout-align="start center">
              <span>1</span>
              <div>
                <label>Filetypes</label>
              </div>
            </div>
            <div class="step" ng-class="{'active': currentPage === 1}" layout="row" layout-align="start center">
              <span>2</span>
              <div>
                <label>Availability</label>
                <label class="optional">Optional</label>
              </div>
            </div>
            <div class="step" ng-class="{'active': currentPage === 2}" layout="row" layout-align="start center">
              <span>3</span>
              <div>
                <label>Checkout</label>
              </div>
            </div>
          </div>
          <div class="steps">
            <div class="step filetypes-step clearfix" ng-if="currentPage === 0">
              <md-progress-circular md-mode="indeterminate" ng-if="runsDetailsStore.loading"></md-progress-circular>
              <div class="checkbox-container" ng-repeat="(key, value) in runsDetailsStore.fileTypes | orderObject">
                <md-checkbox ng-model="runsDetailsStore.fileTypes[key]"
                             ng-change="toggleFileType(key, !value)"
                             aria-label="{{key}}">{{key}}</md-checkbox>
              </div>
            </div>
            <div class="step availability-step" ng-if="currentPage === 1">
              <p>The file(s) listed below are currently not directly available. If you wish to have access to them
              you can start a recovery process which will take time. A retrieval time estimation is given per file.
              After starting a recovery you can come back later to retrieve these files. The recovered files will be
              available for 14 days after requesting the recovery.</p>

              <p class="warn">Any actions you undertake on the next screen will NOT include these files.</p>

              <table>
                <thead>
                  <tr>
                    <th class="run-name-column">Run</th>
                    <th class="filetype-column">Filetype</th>
                    <th class="status-column">Restore</th>
                    <th class="action-column"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="file in runsDetailsStore.tieredFiles">
                    <td>{{file.run_name}}</td>
                    <td>{{file.name}}</td>
                    <td>
                      <span ng-if="file.tier_status === 'RESTORE' && !file.restore_error && !file.restore_loading">In progress</span>
                      <span ng-if="file.tier_status === 'COLD' && file.filesize < runsDetailsStore.restoreLimit && !file.restore_error && !file.restore_loading">{{file.restore_time | restoreTime}}</span>
                      <span class="error" ng-if="file.tier_status === 'COLD' && file.filesize > runsDetailsStore.restoreLimit && !file.restore_error && !file.restore_loading"">Insufficient capacity</span>
                      <span class="error" ng-if="file.restore_error && !file.restore_loading">Restore error</span>
                      <md-progress-circular ng-if="file.restore_loading" md-mode="indeterminate" md-diameter="20px"></md-progress-circular>
                    </td>
                    <td>
                      <md-button ng-if="file.tier_status === 'COLD' && file.filesize < runsDetailsStore.restoreLimit && !file.restore_loading && !file.restore_error" ng-click="restore(file)">Restore</md-button>
                    </td>
                  </tr>
                  <tr ng-if="canRestoreAll()">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <md-button ng-click="restoreAll()">RESTORE ALL</md-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="step checkout-step" ng-if="currentPage === 2">
              <p ng-if="runsDetailsStore.selectedFiles.length === 0">Currently none of the files you selected is available. If you started a restore, please come back later.</p>
              <div ng-if="runsDetailsStore.selectedFiles.length > 0">
                <md-progress-circular md-mode="indeterminate" ng-if="runsDetailsStore.generatingLinks"></md-progress-circular>
                <p ng-if="runsDetailsStore.downloadLinksError && !runsDetailsStore.generatingLinks">An error occured try again later...</p>
                <div ng-if="!runsDetailsStore.generatingLinks && !runsDetailsStore.downloadLinksError">
                  <div class="actions">
                    <md-button ng-click="generateAria2()">DOWNLOAD ARIA2 CONFIG</md-button>
                    <md-button ng-click="downloadFiles()">DOWNLOAD FILES</md-button>
                    <md-button ngclipboard data-clipboard-target="#download-links">COPY LINKS TO CLIPBOARD</md-button>
                  </div>
                  <textarea rows="10" readonly="true" id="download-links">{{runsDetailsStore.downloadLinksString}}</textarea>
                </div>
              </div>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
          <md-button ng-if="currentPage > 0" ng-click="previous()">BACK</md-button>
          <span flex></span>
          <md-button ng-if="currentPage < 2"
                     ng-click="next()"
                     ng-disabled="!canContinue()">NEXT</md-button>
        </md-dialog-actions>
      </md-dialog>
    `
  };
}
/* eslint-enable max-len */

import angular from 'angular';

import {
  Component,
  Inject,
  SortableComponent,
  PaginatableComponent,
  SearchableComponent
} from 'anglue/anglue';

const fileTypes = ['BAM', 'VCF', 'Report'];


@Component()
@SortableComponent()
@PaginatableComponent({
  initialLimit: 10
})
@SearchableComponent()
export class RunsListComponent {
  @Inject() $scope;
  @Inject() $mdDialog;
  @Inject() runsStore;
  @Inject() runsActions;

  fileTypes = fileTypes

  startDate = new Date();
  endDate = new Date();

  // Multi select
  selected = [];

  // Individual download types
  downloadTypes = [];

  activate() {
    this.runsActions.loadRuns();
  }

  download(event, run) {
    event.preventDefault();

    // @TODO implement this
  }

  toggleDownloadType($event, type) {
    $event.preventDefault();

    const index = this.downloadTypes.indexOf(type);

    if (index === -1) {
      this.downloadTypes.push(type);
    } else {
      this.downloadTypes.splice(index, 1);
    }
  }

  downloadTypeIsChecked(type) {
    return this.downloadTypes.indexOf(type) > -1;
  }

  // Open the download selected runs dialog
  downloadSelected($event) {
    this.$mdDialog.show({
      controller: DownloadSelectedDialogController,
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
              <md-checkbox ng-repeat="type in fileTypes" aria-label="{{type}}">{{type}}</md-checkbox>
            </div>
            <md-button>DOWNLOAD 12 FILES</md-button>
          </md-dialog-content>
        </md-dialog>
      `,
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  }

  // Open the copy selected runs dialog
  copySelected($event) {
    this.$mdDialog.show({
      controller: CopySelectedDialogController,
      template: `
        <md-dialog class="copy-selected-dialog">
          <md-toolbar>
            <div class="md-toolbar-tools">
              <h2>Download URL's selection</h2>
              <span flex></span>
              <md-button class="md-icon-button" ng-click="cancel()">
                <md-icon aria-label="Close dialog">
                  <span class="mdi mdi-close"></span>
                </md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <md-dialog-content>
            <textarea rows="10"></textarea>
            <div class="checkboxes" layout="row">
              <md-checkbox ng-repeat="type in fileTypes" aria-label="{{type}}">{{type}}</md-checkbox>
            </div>
            <md-button>COPY</md-button>
          </md-dialog-content>
        </md-dialog>
      `,
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  }
}

function CopySelectedDialogController($scope, $mdDialog) {
  $scope.fileTypes = fileTypes;

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
CopySelectedDialogController.$inject = ['$scope', '$mdDialog'];

function DownloadSelectedDialogController($scope, $mdDialog) {
  $scope.fileTypes = fileTypes;

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}

DownloadSelectedDialogController.$inject = ['$scope', '$mdDialog'];

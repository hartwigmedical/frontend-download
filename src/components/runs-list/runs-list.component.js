import angular from 'angular';
import moment from 'moment';

import {
  Component,
  Inject,
  SortableComponent,
  PaginatableComponent,
  SearchableComponent
} from 'anglue/anglue';

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
  @Inject() downloadActions;

  loadingError = false;

  today = new Date();
  startDate = new Date(`01/01/${new Date().getFullYear()}`);
  endDate = new Date();

  // Multi select
  selected = [];

  activate() {
    // Set the initial filter
    this.setFilter();

    this.runsActions.load().catch(() => {
      this.loadingError = true;
    });
  }

  setFilter() {
    this.runsActions.changeFilter('date', run => {
      const createTime = moment(run.createTime);
      return createTime.isSameOrAfter(this.startDate, 'day') && createTime.isSameOrBefore(this.endDate, 'day');
    });
  }

  download(event, run) {
    event.preventDefault();

    this.generateLinks(run).then(links => {
      startDownloads(links);
    });
  }

  canDownloadOrCopy(files) {
    return files.find(file => {
      return file.selected;
    });
  }

  generateLinks(run) {
    const files = run.files.filter(file => {
      return file.selected;
    });

    const promise = this.downloadActions.generateDownloadLinks(files);

    promise.then(links => {
      let linksText = '';

      links.forEach(link => {
        linksText += `${link.fileURL}\n\n`;
      });

      run.linksText = linksText;

      run.links = links;
    });

    return promise;
  }

  // Open the download selected runs dialog
  downloadSelected($event) {
    this.$mdDialog.show({
      controller: DownloadSelectedDialogController,
      clickOutsideToClose: true,
      scope: this.$scope,
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
            <md-button ng-disabled="!canDownload()" ng-click="download()">DOWNLOAD FILES</md-button>
          </md-dialog-content>
        </md-dialog>
      `
    });
  }

  // Open the copy selected runs dialog
  copySelected($event) {
    this.$mdDialog.show({
      controller: CopySelectedDialogController,
      clickOutsideToClose: true,
      scope: this.$scope,
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
            <div class="checkboxes" layout="row">
              <md-checkbox ng-change="onChange()" ng-repeat="(key, value) in fileTypes" ng-model="fileTypes[key]" aria-label="{{key}}">{{key}}</md-checkbox>
            </div>

            <md-button ngclipboard data-clipboard-target="#copy-selected-modal-text">COPY</md-button>
          </md-dialog-content>
        </md-dialog>
      `
    });
  }
}

function startDownloads(links) {
  links.forEach(link => {
    window.open(link.fileURL);
  });
}


function CopySelectedDialogController($scope, $mdDialog) {
  $scope.fileTypes = {};

  $scope.links = '';

  // Find the filetypes
  $scope.runsList.selected.forEach(run => {
    run.files.forEach(file => {
      if (!$scope.fileTypes[file.name]) {
        $scope.fileTypes[file.name] = false;
      }
    });
  });

  $scope.onChange = function() {
    const files = [];

    $scope.runsList.selected.forEach(run => {
      run.files.forEach(file => {
        if ($scope.fileTypes[file.name]) {
          files.push(file);
        }
      });
    });


    $scope.runsList.downloadActions.generateDownloadLinks(files)
      .then(links => {
        let linksText = '';

        links.forEach(link => {
          linksText += `${link.fileURL}\n\n`;
        });

        $scope.links = linksText;
      })
      .catch(() => {
        // @TODO handle error
      });
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}

CopySelectedDialogController.$inject = ['$scope', '$mdDialog'];

function DownloadSelectedDialogController($scope, $mdDialog) {
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

    $scope.runsList.downloadActions.generateDownloadLinks(files)
      .then(links => {
        startDownloads(links);
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
}

DownloadSelectedDialogController.$inject = ['$scope', '$mdDialog'];

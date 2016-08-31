import angular from 'angular';
import moment from 'moment';

import {
  Component,
  Inject,
  SortableComponent,
  PaginatableComponent,
  SearchableComponent
} from 'anglue/anglue';

import { copySelectedDialog } from './dialogs/copy';
import { downloadSelectedDialog } from './dialogs/download';

@Component()
@SortableComponent()
@PaginatableComponent({
  initialLimit: 10
})
@SearchableComponent()
export class RunsListComponent {
  @Inject() $scope;
  @Inject() $mdDialog;
  @Inject() $mdMenu;
  @Inject() $timeout;
  @Inject() runsStore;
  @Inject() runsActions;
  @Inject() downloadActions;

  loadingError = false;

  // Multi select
  selected = [];

  activate() {
    // Set the initial filter
    this.changeDateFilter();

    this.runsActions.load().catch(() => {
      this.loadingError = true;
    });
  }

  selectAllFileTypes(run) {
    run.files.forEach(file => {
      file.selected = run.selectAll;
    });
  }

  selectFileType(run, file) {
    if (!file.selected) {
      run.selectAll = false;
    }
  }

  changeDateFilter() {
    this.runsActions.changeFilter('date', run => {
      const createTime = moment(run.createTime);
      return createTime.isSameOrAfter(this.runsStore.startDate, 'day') && createTime.isSameOrBefore(this.runsStore.endDate, 'day');
    });
  }

  download(event, run) {
    this.generateLinks(run).then(() => {
      this.downloadActions.download(run.files);
    });
  }

  canDownloadOrCopy(files) {
    return files.find(file => {
      return file.selected;
    });
  }

  generateLinks(run) {
    return this.downloadActions.generateDownloadLinksForRun(run);
  }

  copySuccess() {
    this.$mdMenu.hide();
    const $message = angular.element(document.getElementById('copy-success'));

    this.$timeout(() => {
      $message.addClass('opened');

      this.$timeout(() => {
        $message.removeClass('opened');
      }, 800);
    }, 200);
  }

  // Open the download selected runs dialog
  downloadSelected($event) {
    this.$mdDialog.show(downloadSelectedDialog($event, this.$scope));
  }

  // Open the copy selected runs dialog
  copySelected($event) {
    this.$mdDialog.show(copySelectedDialog($event, this.$scope));
  }
}


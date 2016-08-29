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

  today = new Date();
  startDate = new Date(`01/01/${new Date().getFullYear()}`);
  endDate = new Date();

  // Multi select
  selected = [];

  activate() {
    // Set the initial filter
    this.setDateFilter();

    this.runsActions.load().catch(() => {
      this.loadingError = true;
    });
  }

  setDateFilter() {
    this.runsActions.changeFilter('date', run => {
      const createTime = moment(run.createTime);
      return createTime.isSameOrAfter(this.startDate, 'day') && createTime.isSameOrBefore(this.endDate, 'day');
    });
  }

  download(event, run) {
    event.preventDefault();

    this.generateLinks(run).then(links => {
      this.downloadActions.download(links);
    });
  }

  canDownloadOrCopy(files) {
    return files.find(file => {
      return file.selected;
    });
  }

  generateLinks(run) {
    run.generatingLinks = true;

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

      run.generatingLinks = false;
    });

    return promise;
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


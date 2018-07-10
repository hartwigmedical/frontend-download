import moment from 'moment';

import {
  Component,
  Inject,
  SortableComponent,
  PaginatableComponent,
  SearchableComponent
} from 'anglue/anglue';

import { FaqComponent } from './faq/faq';
// import { copySelectedDialog } from './dialogs/copy/copy';
// import { downloadSelectedDialog } from './dialogs/download/download';
// import { aria2SelectedDialog } from './dialogs/aria2/aria2';
import { runsDialog } from './runs-dialog/runs-dialog';

@Component({
  components: [
    FaqComponent
  ]
})
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
  @Inject() disclaimerActions;
  @Inject() $cookies;
  @Inject('logoutEndpoint') logoutEndpoint;
  @Inject('faqService') faqService;

  loadingError = false;

  paginationLimits = [1, 10, 25, 50, 100];

  // Multi select
  selected = [];

  activate() {
    // Set the initial filter
    this.changeDateFilter();

    this.runsActions.load()
      .catch(() => {
        this.loadingError = true;
      });
  }

  showDisclaimer() {
    this.disclaimerActions.activateDisclaimer();
  }

  changeDateFilter() {
    this.runsActions.changeFilter('date', run => {
      const createTime = moment(run.createTime);
      return createTime.isSameOrAfter(this.runsStore.startDate, 'day') && createTime.isSameOrBefore(this.runsStore.endDate, 'day');
    });
  }

  checkout($event) {
    this.$mdDialog.show(runsDialog($event, this.selected));
  }
}


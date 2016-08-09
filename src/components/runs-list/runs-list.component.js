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
  @Inject() runsStore;
  @Inject() runsActions;

  selected = [];

  activate() {
    this.runsActions.loadRuns();
  }
}

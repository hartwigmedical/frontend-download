import {
  Actions,
  FilterableActions,
  SortableActions,
  PaginatableActions
} from 'anglue/anglue';

@Actions()
@FilterableActions()
@SortableActions()
@PaginatableActions()
export class RunsActions {

  // @TODO actually call service
  loadRuns() {
    let counter = 1;
    const runs = [];

    while (counter <= 100) {
      runs.push({
        name: `Sample ${counter}`,
        coverage: { value: 38 },
        state: 'done'
      });
      counter += 1;
    }

    this.dispatch('RUNS_LOAD_COMPLETED', runs);
  }
}

export default RunsActions;

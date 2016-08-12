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

    const status = ['done', 'in progress'];

    while (counter <= 100) {
      runs.push({
        name: `Sample ${counter}`,
        coverage: { value: Math.floor(Math.random() * 100 + 1) },
        state: status[Math.round(Math.random())],
        createDate: new Date()
      });
      counter += 1;
    }

    this.dispatch('RUNS_LOAD_COMPLETED', runs);
  }
}

export default RunsActions;

import {
  Actions,
  AsyncAction,
  Inject,
  FilterableActions,
  SortableActions,
  PaginatableActions
} from 'anglue/anglue';

import './../resources/runs-resource';

@Actions()
@FilterableActions()
@SortableActions()
@PaginatableActions()
export class RunsActions {
  @Inject() runsResource;

  @AsyncAction()
  load() {
    return this.runsResource.list().$promise;
  }

  @AsyncAction()
  loadDetails(runs) {
    return this.runsResource.details(runs).$promise;
  }
}

export default RunsActions;

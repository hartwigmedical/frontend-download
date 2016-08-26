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
  @Inject() $q;
  @Inject() runsResource;

  @AsyncAction()
  load() {
    return this.runsResource.query().$promise;
  }
}

export default RunsActions;

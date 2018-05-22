import {
  Actions,
  Action,
  AsyncAction,
  Inject
} from 'anglue/anglue';

import './../resources/runs-resource';

@Actions()
export class RunsDetailsActions {
  @Inject() runsResource;

  @AsyncAction()
  loadDetails(runs) {
    return this.runsResource.details(runs).$promise;
  }

  /* eslint-disable no-unused-vars */
  @Action()
  toggleFileType(fileType, checked) {}
}

export default RunsDetailsActions;

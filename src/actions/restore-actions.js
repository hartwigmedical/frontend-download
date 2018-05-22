import {
  Actions,
  AsyncAction,
  Inject
} from 'anglue/anglue';

import './../resources/restore-resource';

@Actions()
export class RestoreActions {
  @Inject() restoreResource;

  @AsyncAction()
  restoreFiles(files) {
    return this.restoreResource.restore(files).$promise;
  }

  @AsyncAction()
  getRestoreLimit() {
    return this.restoreResource.limit().$promise;
  }
}

export default RestoreActions;

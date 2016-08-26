import {
  Actions,
  Inject,
} from 'anglue/anglue';

import './../resources/download-resource';

@Actions()
export class DownloadActions {
  @Inject() $q;
  @Inject() downloadResource;

  generateDownloadLinks(files) {
    const promises = [];

    files.forEach(file => {
      promises.push(this.downloadResource.download({
        fileId: file.fileid
      }).$promise);
    });

    return this.$q.all(promises);
  }
}

export default DownloadActions;

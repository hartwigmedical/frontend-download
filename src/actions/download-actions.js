import angular from 'angular';

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

  download(links) {
    if (links && angular.isArray(links)) {
      links.forEach(link => {
        const iframe = document.createElement('iframe');
        iframe.src = link.fileURL;

        iframe.onload = () => {
          document.body.removeChild(iframe);
        };

        document.body.appendChild(iframe);
      });
    }
  }
}

export default DownloadActions;

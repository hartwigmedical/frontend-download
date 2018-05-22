import {
  Action,
  AsyncAction,
  Actions,
  Inject,
} from 'anglue/anglue';

import './../resources/download-resource';

@Actions()
export class DownloadActions {
  @Inject() downloadResource;

  @AsyncAction()
  generateDownloadLinks(files) {
    return this.downloadResource.download(files).$promise;
  }

  @Action()
  downloadFiles(files) {
    for (const file of files) {
      window.open(file.fileURL);
    }
  }

  @Action()
  generateAria2Config(files) {
    let config = '';

    files.forEach(file => {
      config += `${file.fileURL}\n`;
      config += `  dir=${file.run_name}\n`;

      if (file.hash) {
        config += `  checksum=md5=${file.hash}\n`;
      }
      config += '\n';
    });

    const data = new Blob([config], { type: 'text/plain' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data, 'aria2.txt');
    } else {
      const textFile = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.style.display = 'none';
      link.href = textFile;
      link.download = 'aria2.txt';
      link.click();
      window.URL.revokeObjectURL(link);
      document.body.removeChild(link);
    }
  }
}

export default DownloadActions;

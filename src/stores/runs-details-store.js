import {
  Store,
  Handler
} from 'anglue/anglue';

@Store()
export class RunsDetailsStore {
  runDetails = [];
  selectedFiles = [];
  tieredFiles = [];
  fileTypes = {};
  loading = false;
  restoreLimit = 0;
  totalFileSizeCold = 0;

  generatingLinks = false;
  downloadLinks = [];
  downloadLinksError = false;
  downloadLinksString = '';

  @Handler()
  onRunsDetailsLoadDetailsStarted() {
    this.fileTypes = {};
    this.loading = true;
  }

  @Handler()
  onRunsDetailsLoadDetailsCompleted(runDetails) {
    this.runDetails = runDetails;

    // Determine available file types
    runDetails.forEach(run => {
      run.files.forEach(file => {
        if (this.fileTypes[file.name] === undefined) {
          this.fileTypes[file.name] = false;
        }
      });
    });

    this.loading = false;
  }

  @Handler()
  onRestoreGetRestoreLimitCompleted(result) {
    this.restoreLimit = result.remaining_bytes;
    this._sortTieredFiles();
  }

  @Handler()
  onRunsDetailsToggleFileType(fileType, checked) {
    this.fileTypes[fileType] = checked;
    this._determineTieredFiles();
  }

  @Handler()
  onDownloadGenerateDownloadLinksStarted() {
    this.generatingLinks = true;
    this.downloadLinks = [];
    this.downloadLinksString = '';
  }

  @Handler()
  onDownloadGenerateDownloadLinksCompleted(files) {
    this.downloadLinksError = false;
    this.generatingLinks = false;
    this.downloadLinks = files;

    // Enrich the files with the run name
    files.forEach(file => {
      // Find the run the file is related to and add the run name and run id to it
      // needed for the aria2 config dir property
      const run = this.runDetails.find(runDetails => {
        return runDetails.files.find(runFile => {
          return runFile.fileid === file.fileid;
        });
      });

      file.run_name = run.name;
      file.run_id = run.id;

      this.downloadLinksString += `\n\n${file.fileURL}`;
    });

    this.downloadLinksString = this.downloadLinksString.trim();
  }

  @Handler()
  onDownloadGenerateDownloadLinksFailed() {
    this.generatingLinks = false;
    this.downloadLinks = [];
    this.downloadLinksError = true;
  }

  _determineTieredFiles() {
    this.tieredFiles = [];
    this.selectedFiles = [];

    this.runDetails.forEach(run => {
      run.files.forEach(file => {
        if (this.fileTypes[file.name]) {
          file.run_name = run.name;

          if (file.tier_status === 'COLD' || file.tier_status === 'RESTORE') {
            this.tieredFiles.push(file);
          } else {
            this.selectedFiles.push(file);
          }
        }
      });
    });

    this._sortTieredFiles();
  }

  _sortTieredFiles() {
    this.tieredFiles = this.tieredFiles.sort((fileA, fileB) => {
      if (fileA.tier_status === 'COLD' && fileB.tier_status !== 'COLD') {
        return -1;
      }

      if (fileA.tier_status !== 'COLD' && fileB.tier_status === 'COLD') {
        return 1;
      }

      if (fileA.tier_status === 'COLD' && fileB.tier_status === 'COLD') {
        if (fileA.filesize < this.restoreLimit && fileB.filesize > this.restoreLimit) {
          return -1;
        } else if (fileA.filesize > this.restoreLimit && fileB.filesize < this.restoreLimit) {
          return 1;
        }

        return 0;
      }

      return 0;
    });
  }
}

export default RunsDetailsStore;

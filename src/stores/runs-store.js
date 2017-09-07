import {
  Store,
  Handler,
  EntityStore,
  SortableStore,
  FilterableStore,
  PaginatableStore
} from 'anglue/anglue';

@Store()
@EntityStore()
@SortableStore({
  initial: '-createTime'
})
@FilterableStore()
@PaginatableStore({
  initialLimit: 10
})
export class RunsStore {
  startDate = new Date('01/01/2016');
  endDate = new Date();
  today = new Date();

  @Handler()
  onDownloadGenerateDownloadLinksForRunStarted(run) {
    run.generatingLinks = true;
    run.error = false;
  }

  @Handler()
  onDownloadGenerateDownloadLinksForRunCompleted(run) {
    run.generatingLinks = false;

    let linksText = '';

    run.files.forEach(file => {
      if (file.selected) {
        linksText += `\n\n${file.link}`;
      }
    });

    run.linksText = linksText.trim();
  }

  @Handler()
  onDownloadGenerateDownloadLinksForRunFailed(run) {
    run.generatingLinks = false;
    run.error = true;
  }

  @Handler()
  onDownloadGeneratingLinksForRunStarted(run) {
    run.error = false;
    run.generatingLinks = true;
  }

  @Handler()
  onDownloadGenerateDownloadLinkCompleted(payload) {
    payload.file.link = payload.link.fileURL;
    payload.file.hash = payload.link.hash;
    payload.file.error = false;
  }
}

export default RunsStore;

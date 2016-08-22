import {
  Actions,
  Inject,
  FilterableActions,
  SortableActions,
  PaginatableActions
} from 'anglue/anglue';

@Actions()
@FilterableActions()
@SortableActions()
@PaginatableActions()
export class RunsActions {
  @Inject() $q;

  // TO DO: actually call service
  loadRuns() {
    const status = ['done', 'in progress'];
    const startDate = new Date(`${new Date().getFullYear()}/01/01`).getTime();
    const endDate = new Date().getTime();

    function randomDate() {
      return new Date(Math.floor(Math.random() * (endDate - startDate + 1)) + startDate);
    }

    let counter = 1;
    const runs = [];

    while (counter <= 100) {
      runs.push({
        name: `Sample ${counter}`,
        id: counter,
        status: status[Math.round(Math.random())],
        createTime: randomDate(),
        files: [
          {
            name: 'BAM Tumor',
            fileid: '7/bam_tumor'
          }, {
            name: 'BAM Reference',
            fileid: '7/bam_ref'
          }, {
            name: 'VCF',
            filedid: '7/vcf'
          }, {
            name: 'Report',
            filed: '7/report'
          }
        ]
      });
      counter += 1;
    }

    this.dispatch('RUNS_LOAD_COMPLETED', runs);

    const defered = this.$q.defer();
    defered.resolve();
    return defered.promise;
  }

  generateDownloadLinks(files) {
    // TO DO actually call a service...
    const defered = this.$q.defer();
    const links = [];

    files.forEach(file => {
      links.push(`https://api.schubergphilis.com/s3hmf/hmf-output-2016-23/assafasf/asfasf/${file.name.toLowerCase()}`);
    });

    defered.resolve(links);

    return defered.promise;
  }
}

export default RunsActions;

export const srcPath = '/src/';
export const componentsPath = `${srcPath}components/`;

export default {
  'defaultRoute': '/runs-list/',

  'downloads': {
    url: '/',
    templateUrl: `${srcPath}hmfdownloads.html`,
    abstract: true
  },

  'downloads.runs-list': {
    url: 'runs-list/',
    templateUrl: `${componentsPath}runs-list/runs-list.html`
  }
};

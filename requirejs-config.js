/* global require: true*/
require.config({
  baseUrl: 'src_transpiled',
  paths: {
    'anglue'               : '../bower_components/anglue/dist/amd',
    'anglue-md'            : '../bower_components/anglue-md/dist/umd',
    'angular'              : '../bower_components/angular/angular',
    'angular-animate'      : '../bower_components/angular-animate/angular-animate',
    'angular-aria'         : '../bower_components/angular-aria/angular-aria',
    'angular-cookies'      : '../bower_components/angular-cookies/angular-cookies',
    'angular-local-storage': '../bower_components/angular-local-storage/dist/angular-local-storage',
    'angular-material'     : '../bower_components/angular-material/angular-material',
    'angular-md-data-table': '../bower_components/angular-material-data-table/dist/md-data-table',
    'angular-messages'     : '../bower_components/angular-messages/angular-messages',
    'angular-mocks'        : '../bower_components/angular-mocks/angular-mocks',
    'angular-resource'     : '../bower_components/angular-resource/angular-resource',
    'angular-sanitize'     : '../bower_components/angular-sanitize/angular-sanitize',
    'angular-touch'        : '../bower_components/angular-touch/angular-touch',
    'angular-ui-router'    : '../bower_components/angular-ui-router/release/angular-ui-router',
    'babel-polyfill'       : '../node_modules/babel-polyfill/browser',
    'jquery'               : '../bower_components/jquery/jquery.min',
    'logger'               : '../bower_components/js-logger/src/logger',
    'luxyflux'             : '../bower_components/luxyflux/dist/amd',
    'moment'               : '../bower_components/moment/moment',
    'clipboard'            : '../bower_components/clipboard/dist/clipboard',
    'ngclipboard'          : '../bower_components/ngclipboard/dist/ngclipboard',
    'underscore'           : '../bower_components/underscore/underscore',
    'vp-pubsub'            : '../bower_components/vp-pubsub/vp-pubsub'
  },
  shim: {
    'angular'              : {
      exports: 'angular'
    },
    'anglue'               : ['angular'],
    'anglue-md'            : ['anglue'],
    'angular-animate'      : ['angular'],
    'angular-cookies'      : ['angular'],
    'angular-resource'     : ['angular'],
    'angular-aria'         : ['angular'],
    'angular-material'     : ['angular'],
    'angular-md-data-table': ['angular'],
    'angular-messages'     : ['angular'],
    'angular-mocks'        : ['angular'],
    'angular-sanitize'     : ['angular'],
    'angular-local-storage': ['angular'],
    'angular-touch'        : ['angular'],
    'angular-ui-router'    : ['angular'],
    'clipboard': {
      deps: [],
      exports: 'Clipboard'
    },
    'ngclipboard': {
      deps: ['angular', 'clipboard']
    }
  }
});

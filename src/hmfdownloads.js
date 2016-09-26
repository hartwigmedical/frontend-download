import connectPortal from 'connect-portal-component';

// All the Angular packages that we use in our app
import angular from 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-local-storage';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-md-data-table';
import './directives/clipboard';

import moment from 'moment';

import { Application } from 'anglue/anglue';
import 'luxyflux/ng-luxyflux';

// Helper methods that configure the App module's ui-router with our app routes
import configRoutes from './config/routes';

import { configureMaterial } from './config/material-config';

// This is the angular module that contains all the defined services
import resourcesModule from './resources/_module';

// Application root components
import { RunsListComponent } from './components/runs-list/runs-list.component';

// Application Flux stores
import { RunsStore } from './stores/runs-store';

// Application Flux ActionCreators
import { DownloadActions } from './actions/download-actions';
import { RunsActions } from './actions/runs-actions';

@Application({
  routes: configRoutes,
  dependencies: [
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ngAria',
    'ngSanitize',
    'md.data.table',
    'ngclipboard',
    resourcesModule.name
  ],
  actions: [
    DownloadActions,
    RunsActions
  ],
  components: [
    RunsListComponent
  ],
  stores: [
    RunsStore
  ]
})
export default class Main {
  static initialize(config) {
    const appModule = Main.annotation.module;

    appModule.filter('filesize', function() {
      return function(bytes) {
        if (bytes >= 1000000000) {
          return `${(bytes / 1000000000).toFixed(2)} GB`;
        } else if (bytes >= 1000000) {
          return `${(bytes / 1000000).toFixed(2)} MB`;
        } else if (bytes >= 1000) {
          return `${(bytes / 1000).toFixed(2)} KB`;
        } else if (bytes > 1) {
          return `${bytes} bytes`;
        } else if (bytes === 1) {
          return `${bytes} byte`;
        }

        return '0 byte';
      };
    });

    // Setup the theming of Angular Material
    configureMaterial(appModule);

    // Configure the Angular providers
    appModule.config(['$compileProvider', '$httpProvider', '$resourceProvider', '$mdDateLocaleProvider',
    function ($compileProvider, $httpProvider, $resourceProvider, $mdDateLocaleProvider) {
      $compileProvider.debugInfoEnabled(false);
      $httpProvider.defaults.withCredentials = true;
      $resourceProvider.defaults.stripTrailingSlashes = true;

      // Make the angular material date format correct
      $mdDateLocaleProvider.formatDate = dateString => {
        const date = moment(dateString);
        return date.isValid() ? date.format('DD/MM/YYYY') : '';
      };
    }]);

    // Configure the prefix for all the resources in the app:
    if (!config.apiEndpoint) {
      if (window.location.hostname.indexOf('acc.') > -1 || window.location.hostname.indexOf('localhost.') > -1) {
        config.apiEndpoint = 'https://api.acc.schubergphilis.com';
      } else {
        config.apiEndpoint = 'https://api.schubergphilis.com';
      }
    }
    appModule.value('apiEndpoint', config.apiEndpoint);


    angular.element(document).ready(function () {
      connectPortal.initialize(document.getElementById('region-portal'), {
        menu: [{
          title: 'HMF Downloads',
          items: [{
            title: 'Downloads',
            hash: 'runs-list'
          }]
        }],
        theme: {
          primaryColor: '#284C99'
        }
      });

      angular.bootstrap(config.appEl, [appModule.name], {
        strictDi: true
      });
    });
  }
}

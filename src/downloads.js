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
    resourcesModule.name
  ],
  actions: [
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

    // Setup the theming of Angular Material
    configureMaterial(appModule);

    // Configure the Angular providers
    appModule.config([
      '$compileProvider', '$httpProvider', '$resourceProvider', function ($compileProvider, $httpProvider, $resourceProvider) {
        $compileProvider.debugInfoEnabled(false);
        $httpProvider.defaults.withCredentials = true;
        $resourceProvider.defaults.stripTrailingSlashes = true;
      }]);

    angular.element(document).ready(function () {
      angular.bootstrap(config.appEl, [appModule.name], {
        strictDi: true
      });
    });
  }
}

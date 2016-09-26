import angular from 'angular';
import 'angular-resource';
import 'angular-cookies';

const resourcesModule = angular.module('app.resources', [
  'ngResource',
  'ngCookies'
]);
export default resourcesModule;

import angular from 'angular';
import 'angular-resource';
import 'angular-cookies';

const resourcesModule = angular.module('app.resources', [
  'ngResource',
  'ngCookies'
]);
export default resourcesModule;

// resourcesModule.config([
//   '$httpProvider', $httpProvider => {
//     $httpProvider.interceptors.push('apiHttpInterceptor');
//   }
// ]);

// resourcesModule.factory('apiHttpInterceptor', [
//   '$cookies',
//   '$q',
//   ($cookies, $q) => {
//     return {
//       request(config) {
//         if (config.url.indexOf('/api/v2') === 0) {
//           Object.assign(config.headers, {
//             'X-CSRFToken': $cookies.get('csrftoken')
//           });
//           config.isApiCall = true;
//         }
//         return config;
//       },

//       response(response) {
//         const config = response.config;
//         if (config.isApiCall) {
//           let rawResponseData = null;
//           if (angular.isString(response.data)) {
//             if (response.data.length) {
//               rawResponseData = JSON.parse(response.data);
//             }
//           } else if (angular.isObject(response.data)) {
//             rawResponseData = response.data;
//           }

//           const statusCode = rawResponseData && rawResponseData.status;
//           if (statusCode >= 200 && statusCode < 300) {
//             if (config.transformItem) {
//               const data = rawResponseData.data;
//               if (angular.isArray(data)) {
//                 data.forEach((item, index) => {
//                   data[index] = config.transformItem(item);
//                 });
//                 rawResponseData.data = data;
//               } else if (angular.isObject(data)) {
//                 rawResponseData.data = config.transformItem(data);
//               }
//             }
//             response.data = rawResponseData.data;
//           } else {
//             response.data = rawResponseData;
//           }
//         }

//         return response;
//       },

//       responseError(response) {
//         const rejection = {
//           status: response.status,
//           errors: []
//         };

//         if (response.data.errors) {
//           rejection.errors = response.data.errors;
//         } else if (response.data.error) {
//           rejection.errors.push(response.data.error);
//         } else if (response.statusText) {
//           rejection.errors.push(response.statusText);
//         } else {
//           rejection.errors.push(response.data);
//         }

//         return $q.reject(rejection);
//       }
//     };
//   }
// ]);

import angular from 'angular';
import _module from './_module';

_module.factory('RunsResource', ['$resource', 'apiEndpoint',
  function ($resource, apiEndpoint) {
    const Resource = $resource(`${apiEndpoint}/hmf/v1/portal/runs`, {}, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: response => {
          return angular.fromJson(response);
        }
      }
    });

    return Resource;
  }
]);

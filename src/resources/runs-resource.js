import angular from 'angular';
import _module from './_module';

_module.factory('RunsResource', ['$resource', 'apiEndpoint',
  function ($resource, apiEndpoint) {
    const Resource = $resource(`${apiEndpoint}/hmf/v1/portal/runs`, {}, {
      list: {
        url: `${apiEndpoint}/hmf/v1/portal/list`,
        method: 'GET',
        isArray: true,
        transformResponse: response => {
          return angular.fromJson(response);
        }
      },
      details: {
        url: `${apiEndpoint}/hmf/v1/portal/detail`,
        method: 'POST',
        isArray: true,
        transformRequest(data) {
          return data.join('|');
        }
      }
    });

    return Resource;
  }
]);

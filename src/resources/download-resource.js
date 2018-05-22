import _module from './_module';

_module.factory('DownloadResource', ['$resource', 'apiEndpoint',
  function ($resource, apiEndpoint) {
    const Resource = $resource(`${apiEndpoint}/hmf/v1/portal/downloadlink`, {}, {
      download: {
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

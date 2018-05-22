import _module from './_module';

_module.factory('RestoreResource', ['$resource', 'apiEndpoint',
  function ($resource, apiEndpoint) {
    const Resource = $resource(`${apiEndpoint}/hmf/v1/portal/restore`, {}, {
      restore: {
        method: 'POST',
        isArray: true,
        transformRequest(data) {
          return data.join('|');
        }
      },
      limit: {
        url: `${apiEndpoint}/hmf/v1/portal/restore_limit`,
        method: 'GET',
        responseType: 'text',
        isArray: false,
        transformResponse: limit => {
          return {
            remaining_bytes: parseInt(limit, 10)
          };
        }
      }
    });

    return Resource;
  }
]);

import _module from './_module';

_module.factory('DownloadResource', ['$resource', 'apiEndpoint',
  function ($resource, apiEndpoint) {
    const Resource = $resource(`${apiEndpoint}/s3downloadservice/v1/url/:fileId`, {
      filedId: '@fileId'
    }, {
      download: {
        method: 'GET'
      }
    });

    return Resource;
  }
]);

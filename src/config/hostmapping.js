class Hostmapping {
  hostMapping = {
    'localhost.schubergphilis.com':             'poc-development',
    'localhost.acc.schubergphilis.com':         'poc-acceptance',
    'connect.acc.schubergphilis.com':           'poc-acceptance',
    'connect.schubergphilis.com':               'poc-production',

    'localhost.hartwigmedicalfoundation.nl':   'development',
    'portal.acc.hartwigmedicalfoundation.nl':   'acceptance',
    'portal.hartwigmedicalfoundation.nl':       'production'
  };

  hostConfig = {
    'poc-development': {
      api: 'https://api.acc.schubergphilis.com'
    },
    'poc-acceptance': {
      api: 'https://api.acc.schubergphilis.com'
    },
    'poc-production': {
      api: 'https://api.schubergphilis.com'
    },

    'development': {
      api: 'https://portal.acc.hartwigmedicalfoundation.nl/api'
    },
    'acceptance': {
      api: 'https://portal.acc.hartwigmedicalfoundation.nl/api'
    },
    'production': {
      api: 'https://portal.hartwigmedicalfoundation.nl/api'
    }
  };

  get apiEndpoint() {
    return this.hostConfig[this.environment].api;
  }

  get environment() {
    return this.hostMapping[document.location.hostname] || 'production';
  }
}

export const hostmapping = new Hostmapping();

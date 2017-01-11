class Hostmapping {
  hostMapping = {
    'localhost.schubergphilis.com':             'poc-development',
    'localhost.acc.schubergphilis.com':         'poc-acceptance',
    'connect.acc.schubergphilis.com':           'poc-acceptance',
    'connect.schubergphilis.com':               'poc-production',

    'localhost':                                'development',
    'localhost.hartwigmedicalfoundation.nl':    'development',
    'portal.acc.hartwigmedicalfoundation.nl':   'acceptance',
    'portal.hartwigmedicalfoundation.nl':       'production'
  };

  hostConfig = {
    'poc-development': {
      api: 'https://api.acc.schubergphilis.com',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    'poc-acceptance': {
      api: 'https://api.acc.schubergphilis.com',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    'poc-production': {
      api: 'https://api.schubergphilis.com',
      logout: 'https://hmf.okta-emea.com/login/signout'
    },

    'development': {
      api: 'https://portal.acc.hartwigmedicalfoundation.nl/api',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    'acceptance': {
      api: 'https://portal.acc.hartwigmedicalfoundation.nl/api',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    'production': {
      api: 'https://portal.hartwigmedicalfoundation.nl/api',
      logout: 'https://hmf.okta-emea.com/login/signout'
    }
  };

  get apiEndpoint() {
    return this.hostConfig[this.environment].api;
  }

  get logoutEndpoint() {
    return this.hostConfig[this.environment].logout;
  }

  get environment() {
    return this.hostMapping[document.location.hostname] || 'production';
  }
}

export const hostmapping = new Hostmapping();

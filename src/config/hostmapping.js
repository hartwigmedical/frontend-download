class Hostmapping {
  hostMapping = {
    '10.0.2.2':                                 'development',
    'localhost':                                'development',
    'localhost.hartwigmedicalfoundation.nl':    'development',
    'portal.acc.hartwigmedicalfoundation.nl':   'acceptance',
    'portal.hartwigmedicalfoundation.nl':       'production'
  };

  hostConfig = {
    development: {
      api: 'http://localhost',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    acceptance: {
      api: 'https://portal.acc.hartwigmedicalfoundation.nl/api',
      logout: 'https://hmf.oktapreview.com/login/signout'
    },
    production: {
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

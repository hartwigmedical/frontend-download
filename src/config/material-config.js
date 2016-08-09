export function configureMaterial(appModule) {
  appModule.config(['$mdThemingProvider', function($mdThemingProvider) {
    const hartwigPrimary = {
      50: '#698cd8',
      100: '#557dd2',
      200: '#406dcd',
      300: '#3360c1',
      400: '#2d56ad',
      500: '#284c99',
      600: '#234285',
      700: '#1d3871',
      800: '#182e5c',
      900: '#132448',
      A100: '#7d9cdd',
      A200: '#91abe2',
      A400: '#a5bae8',
      A700: '#0e1a34',
      contrastDefaultColor: 'light'
    };

    $mdThemingProvider.definePalette('hartwigPrimary', hartwigPrimary);

    const hartwigAccent = {
      50: '#680d0c',
      100: '#7f100f',
      200: '#961311',
      300: '#ad1614',
      400: '#c31917',
      500: '#da1c19',
      600: '#e9413e',
      700: '#eb5755',
      800: '#ee6e6c',
      900: '#f18482',
      A100: '#e9413e',
      A200: '#e62a27',
      A400: '#da1c19',
      A700: '#f39b99',
      contrastDefaultColor: 'light'
    };

    $mdThemingProvider.definePalette('hartwigAccent', hartwigAccent);

    $mdThemingProvider.theme('default')
      .primaryPalette('hartwigPrimary')
      .accentPalette('hartwigAccent');
  }]);

  appModule.config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider.defaultFontSet('mdi');
  }]);
}

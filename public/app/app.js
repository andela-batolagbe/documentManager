var app = angular.module('documentManagerApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngMdIcons', 'ngStorage']);

/**
 * [App Configurations]
 * @param  {angular method} $stateProvider     [app state configuration]
 * @param  {angular method} $httpProvider      [http request configuration]
 * @param  {angular method} $urlRouterProvider [routes configuration]
 * @param  {angular method} $locationProvider  [location configuration]
 * @param  {angular method} $mdThemingProvider [for theme configuration]
 */
app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
  function($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, palletes) {

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          '': {
            templateUrl: 'partials/nav-view.html'
          },
          'homeView@home': {
            templateUrl: 'partials/home-view.html',
            controller: 'MainCtrl'
          },
          'aboutView@home': {
            templateUrl: 'partials/about-view.html',
            controller: 'MainCtrl'
          }
        }
      })

    .state('login', {
        url: "/login",
        views: {
          '': {
            templateUrl: 'partials/nav-view.html'
          },
          'homeView@login': {
            templateUrl: 'partials/login-view.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('signup', {
        url: "/signup",
        views: {
          '': {
            templateUrl: 'partials/nav-view.html'
          },
          'homeView@signup': {
            templateUrl: 'partials/signup-view.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('userhome', {
        url: "/userhome",
        views: {
          '': {
            templateUrl: 'partials/usernav-view.html',
            controller: 'UserCtrl'
          },
          'docView@userhome': {
            templateUrl: 'partials/userHome-view.html',
            controller: 'docCtrl'
          }
        }
      })
      .state('all-docs', {
        url: "/all-docs",
        views: {
          '': {
            templateUrl: 'partials/usernav-view.html',
            controller: 'UserCtrl'
          },
          'docView@all-docs': {
            templateUrl: 'partials/alldoc-view.html',
            controller: 'docCtrl'
          }
        }
      })
      .state('view-profile', {
        url: "/view-profile",
        views: {
          '': {
            templateUrl: 'partials/usernav-view.html',
            controller: 'UserCtrl'
          },
          'docView@view-profile': {
            templateUrl: 'partials/userProfile-view.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('edit-profile', {
        url: "/edit-profile",
        views: {
          '': {
            templateUrl: 'partials/usernav-view.html',
            controller: 'UserCtrl'
          },
          'docView@edit-profile': {
            templateUrl: 'partials/userProfileEdit-view.html',
            controller: 'UserCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise("/");

    //use HTML5 mode
    $locationProvider.html5Mode(true);

    /**
     * define a new primary color palette
     * for the app
     */
    var newPrimary = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#f2f2f2',
      '700': '#e6e6e6',
      '800': '#d9d9d9',
      '900': '#cccccc',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#bfbfbf'
    };

    /**
     * define custom white theme for the UI,
     */
    $mdThemingProvider.definePalette('newPrimary', newPrimary);

    $mdThemingProvider.theme('default')
      .primaryPalette('newPrimary')
      .accentPalette('light-blue')
      .warnPalette('red')
      .backgroundPalette('newPrimary');

  /**
   * [Interceptor for attaching token to all request headers]
   * @param  {q package injector} $q               [description]
   * @param  {angular state} $location        [description]
   * @param  {local storage injector} $localStorage  
   * 
   * @return {object}                  [header configuration or error message]
   */
  
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          if ($localStorage.userToken) {
            config.headers['x-access-token'] = $localStorage.userToken;
          }
          return config;
        },
        'responseError': function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/signin');
          }
          return $q.reject(response);
        }
      };
    }]);

  }
]);

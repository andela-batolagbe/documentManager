var app = angular.module('documentManagerApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngMdIcons', 'ngStorage']);

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
    $locationProvider.html5Mode(true);

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

    $mdThemingProvider.definePalette('newPrimary', newPrimary);

    $mdThemingProvider.theme('default')
      .primaryPalette('newPrimary')
      .accentPalette('light-blue')
      .warnPalette('red')
      .backgroundPalette('newPrimary');

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

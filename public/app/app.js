var app = angular.module('documentManagerApp', ['ui.router', 'satellizer', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngMdIcons']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$mdThemingProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $mdThemingProvider, palletes) {

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          '': {
            templateUrl: 'partials/nav-view.html'
          },
          'theView@home': {
            templateUrl: 'partials/home-view.html',
            controller: 'MainCtrl'
          },
          'aboutView@home': {
            templateUrl: 'partials/about-view.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('userhome', {
        url: "/userhome",
        views: {
          '': {
            templateUrl: 'partials/usernav-view.html'
          },
          'userView@userhome': {
            templateUrl: 'partials/userHome-view.html',
            controller: 'UserCtrl'
          },
          'docView@userhome': {
            templateUrl: 'partials/doc-view.html',
            controller: 'docCtrl'
          }
        }
      })
      .state('login', {
        url: "/login",
        views: {
          '': {
            templateUrl: 'partials/nav-view.html'
          },
          'theView@login': {
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
          'theView@signup': {
            templateUrl: 'partials/signup-view.html',
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
      .accentPalette('light-blue');

  }
]);

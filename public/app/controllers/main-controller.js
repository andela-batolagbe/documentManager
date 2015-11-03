angular.module('documentManagerApp')
  .controller('MainCtrl', ['$state', '$rootScope', '$scope', '$mdToast',
    function($state, $rootScope, $scope, $mdToast) {

      /**
       * [displayStatus display successs messages]
       * @param  {string} message [message to be displayed]
       * @return {html tag}         [toast showing the message]
       */
      $rootScope.displayStatus = function(message) {
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position('top right')
          .hideDelay(2000)
        );
      };

      /**
       * [displayError display error messages]
       * @param  {string} message [error message to be displayed]
       * @return {html tag}         [toast showing the message]
       */
      $rootScope.displayError = function(message) {
        $mdToast.show({
          template: '<md-toast style="background:#dc145c; color:#ffffff">' + message + '</md-toast>',
          hideDelay: 3000,
          position: 'top right'
        });
      };
    }
  ]);

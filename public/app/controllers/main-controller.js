angular.module('documentManagerApp')
  .controller('MainCtrl', ['$state','$rootScope', '$scope', '$mdToast',
    function($state, $rootScope, $scope, $mdToast) {

    	//display response status messages if sucessful
      $rootScope.displayStatus = function(message) {
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position('top right')
          .hideDelay(2000)
        );
      };

      //display error messages if successful
      $rootScope.displayError = function(message) {
        $mdToast.show({
          template: '<md-toast style="background:#dc145c; color:#ffffff">' + message + '</md-toast>',
          hideDelay: 3000,
          position: 'top right'
        });
      };
    }
  ]);

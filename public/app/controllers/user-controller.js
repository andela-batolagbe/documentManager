angular.module('documentManagerApp')
  .controller('UserCtrl', ['UserService', '$rootScope', '$state', '$scope', '$location', '$mdSidenav', '$localStorage',
    function(UserService, $rootScope, $state, $scope, $location, $mdSidenav, $localStorage) {


      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };
        UserService.login(data).success(function(res) {

          $localStorage.activeUser = res.user;
          $localStorage.userToken = res.token;
          $rootScope.displayStatus(res.message);
          $state.go('userhome');
        }).error(function(err) {
          $rootScope.displayError(err.message);
           $state.go('login');
        });
      };

      $scope.signup = function() {
        var data = {
          name: {
            first: $scope.firstname,
            last: $scope.lastname
          },
          username: $scope.username,
          email: $scope.email,
          password: $scope.password
        };
        UserService.signup(data).success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.go('login');
          }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      $scope.logout = function() {

        $localStorage.$reset();
        UserService.logout().success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.go('home');
          }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      $rootScope.getUserDetails = function() {
        var userId = $localStorage.activeUser._id;

        UserService.getUser(userId).success(function(res) {

          $scope.userDetails = res;
        }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      $scope.deleteUser = function() {
        var id = $localStorage.activeUser._id;
        UserService.deleteUser(id).success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.go('home');
          }).error(function(err) {
          $rootScope.displayStatus(err.message);
        });
      };

      $scope.toggleSideNav = function(Id) {
        $mdSidenav(Id).toggle();

      };

      $scope.updateUser = function() {
        var id = $localStorage.activeUser._id;
        var data = {
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          name: {
            first: $scope.firstname,
            last: $scope.lastname
          }
        };
        UserService.updateUserData(id, data).success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.go('userhome');
          }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      $scope.redirect = function(page) {
        return $state.go(page);
      };

    }
  ]);

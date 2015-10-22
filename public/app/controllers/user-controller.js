angular.module('documentManagerApp')
  .controller('UserCtrl', ['UserService', '$rootScope', '$state', '$scope', '$location', '$auth',
    function(UserService, $rootScope, $state, $scope, $location, $auth) {

      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };
        UserService.login(data).success(function(res) {

          $auth.setToken(res.token);
          $location.path('/userhome');

        }).error(function(err) {
          $scope.error = err.message;
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
            $scope.regMessage = res.message;
            $state.go('userhome');
          }).error(function(err) {
          $scope.regMessage = err.message + 'try, again';
        });
      };

      $scope.logout = function() {
        UserService.logout().success(
          function(res) {
            $scope.logoutMessage = res.message;
            $state.go('home');
          }).error(function(err) {
          $scope.logMessage = err.message;
        });
      };

      $scope.updateUser = function() {
        var id = $localStorage.user.id;
        var data = {
          username: $scope.username,
          email: $scope.email,
          password: $scope.password
        };
        UserService.updateUserData(id, data).success(
          function(res) {
            $scope.updateMessage = res.message;
            $state.go('userhome');
          }).error(function(err) {
          $scope.regMessage = err.message + 'try, again';
        });
      };

      $scope.deleteUser = function() {
        // var id = $localStorage.user.id;
        UserService.deleteUser(id, data).success(
          function(res) {
            $scope.delMessage = res.message;
            $state.go('userhome');
          }).error(function(err) {
          $scope.delMessage = err.message;
        });
      };

      $scope.isAuthenticated = function() {

        return $auth.isAuthenticated();
      };
    }
  ]);

angular.module('documentManagerApp')
  .controller('UserCtrl', ['UserService', '$rootScope', '$state', '$scope', '$location', '$mdSidenav', '$localStorage',
    function(UserService, $rootScope, $state, $scope, $location, $mdSidenav, $localStorage) {

      /**
       * [signin: sign in a user and redirect
       *  to user home if successful]
       * @return {string} [status message]
       */
      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };
        UserService.login(data).success(function(res) {

          $localStorage.activeUser = res.user;
          $localStorage.userToken = res.token;
          $state.go('userhome');
          $rootScope.displayStatus(res.message);
        }).error(function(err) {
          $state.go('login');
          $rootScope.displayError(err.message);
        });
      };

      /**
       * [signup: register a new user and redirect
       *  to login page if successful]
       * @return {string} [status message]
       */
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
          $rootScope.displayError(err.message + ' try, again');
        });
      };

      /**
       * [logout: log out a user, delete token from storage
       * and redirect to landing page]
       * @return {string} [status message]
       */
      $scope.logout = function() {

        //remove all data/token from local storage
        $localStorage.$reset();
        UserService.logout().success(
          function(res) {
            $rootScope.displayStatus(res.message);

            //redirect to user home
            $state.go('home');
          }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      /**
       * [getUserDetails get profile details of a 
       * logged in user]
       * @return {object} [user details or error message]
       */
      $rootScope.getUserDetails = function() {
        var userId = $localStorage.activeUser._id;

        UserService.getUser(userId).success(function(res) {

          $scope.userDetails = res;
        }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      /**
       * [deleteUser delete a user account]
       * @return {string} [status message]
       */
      $scope.deleteUser = function() {
        var id = $localStorage.activeUser._id;
        UserService.deleteUser(id).success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.go('home');
          }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      $scope.toggleSideNav = function(Id) {
        $mdSidenav(Id).toggle();

      };

      /**
       * [updateUser: update a user profile]
       * @return {string} [status message]
       */
      $scope.updateUser = function() {
        var id = $localStorage.activeUser._id;
        var data = {
          username: $scope.userDetails.username,
          email: $scope.userDetails.email,
          password: $scope.userDetails.password,
          name: {
            first: $scope.userDetails.name.first,
            last: $scope.userDetails.name.last
          }
        };
        UserService.updateUserData(id, data).success(
          function(res) {
            $rootScope.displayStatus(res.message);
            $state.reload('userhome');
          }).error(function(err) {
          $rootScope.displayError(err.message + ' try, again');
        });
      };

      $scope.redirect = function(page) {
        return $state.go(page);
      };

    }
  ]);

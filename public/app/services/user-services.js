"use strict";

var app = angular.module('documentManagerApp');

app.value('baseUrl', 'http://localhost:3000');

app.factory('UserService', ['$http', 'baseUrl', '$auth', function($http, baseUrl, $auth) {

  var User = {

    login: function(data) {
      return $http.post(baseUrl + '/api/users/login', data);
    },
    logout: function() {
      return $http.post(baseUrl + '/api/users/logout');
    },

    signup: function(data) {
      return $http.post(baseUrl + '/api/users/', data);
    },

    updateUserData: function(id, data) {
      $http.put(baseUrl + '/api/users/' + id);
    },

    deleteUser: function(id, data) {
      $http.delete(baseUrl + '/api/users/' + id);
    }
  };

  return User;
}]);

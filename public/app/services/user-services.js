"use strict";

var app = angular.module('documentManagerApp');

app.value('baseUrl', 'http://localhost:3000');

app.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {

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

    getUser: function(id) {
      return $http.get(baseUrl + '/api/users/' + id);
    },

    updateUserData: function(id, data) {
      return $http.put(baseUrl + '/api/users/' + id, data);
    },

    deleteUser: function(id, data) {
      return $http.delete(baseUrl + '/api/users/' + id);
    }
  };

  return User;
}]);

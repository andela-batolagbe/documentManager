"use strict";

var app = angular.module('documentManagerApp');

app.value('baseUrl', 'http://localhost:3000');

app.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {

  var User = {

    /**
     * [login: sends request to log in a user]
     * @param  {object} data [user details]
     */
    login: function(data) {
      return $http.post(baseUrl + '/api/users/login', data);
    },

    /**
     * [logout: sends request to logout a user]
     */
    logout: function() {
      return $http.post(baseUrl + '/api/users/logout');
    },

    /**
     * [signup: sends request to store a new 
     * user to the backend]
     * @param  {object} data [new user details]
     */
    signup: function(data) {
      return $http.post(baseUrl + '/api/users/', data);
    },

    /**
     * [getUser: sends request to get the
     *  details of a logged in user]
     * @param  {string} id [user Id]
     */
    getUser: function(id) {
      return $http.get(baseUrl + '/api/users/' + id);
    },

    /**
     * [updateUserData: sends request to update 
     * the profile of a user]
     * @param  {string} id   [user Id]
     * @param  {object} data [new user details]
     */
    updateUserData: function(id, data) {
      return $http.put(baseUrl + '/api/users/' + id, data);
    },

    /**
     * [deleteUser: sends request to remove a user]
     * @param  {string} id [user Id]
     */
    deleteUser: function(id) {
      return $http.delete(baseUrl + '/api/users/' + id);
    }
  };

  return User;
}]);

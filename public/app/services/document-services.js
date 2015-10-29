"use strict";

var app = angular.module('documentManagerApp');

app.factory('docService', ['$http', 'baseUrl', function($http, baseUrl) {

    var Document = {

      addDocument: function(data) {

        return $http.post(baseUrl + '/api/documents', data);
      },

      getAllDocuments: function() {
        return $http.get(baseUrl + '/api/documents');

      },

      getOneDocument: function(id) {
        return $http.get(baseUrl + '/api/documents/' + id);
      },

      getAllUserDocuments: function(userId) {
        return $http.get(baseUrl + '/api/users/' + userId + '/documents');
      },

      updateDocument: function(id, data) {
        return $http.put(baseUrl + '/api/documents/' + id, data);
      },

      deleteDocument: function(id, success, error) {
        return $http.delete(baseUrl + '/api/documents/' + id);
      }
    };

    return Document;

  }


]);

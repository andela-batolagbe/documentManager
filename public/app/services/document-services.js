"use strict";

var app = angular.module('documentManagerApp');

app.factory('documentService', ['$http', 'baseUrl', function($http, baseUrl, $auth) {

  var Document = {

    addDocument: function(data, success, error) {

      $http.post(baseUrl + '/api/documents', data)
        .success(success).error(error);
    },

    getAllDocuments: function(success, error) {
      $http.get(baseUrl + '/api/documents')
        .success(success).error(error);
    },

    getOneDocument: function(id, success, error) {
      $http.get(baseUrl + '/api/documents/' + id)
        .success(success).error(error);
    },
    updateDocument: function(id, data, success, error) {
      $http.put(baseUrl + '/api/documents/' + id, data)
        .success(success).error(error);
    },

    deleteDocument: function(id, success, error) {
      $http.delete(baseUrl + '/api/documents/' + id)
        .success(success).error(error);
    }
  };

  return Document;
}]);

"use strict";

var app = angular.module('documentManagerApp');

app.factory('docService', ['$http', 'baseUrl', function($http, baseUrl) {

    var Document = {

      /**
       * [addDocument send a new document to backend]
       * @param {object} data [document details]
       */
      addDocument: function(data) {

        return $http.post(baseUrl + '/api/documents', data);
      },

      /**
       * [getAllDocuments: request for all document from backend]
       */
      getAllDocuments: function() {
        return $http.get(baseUrl + '/api/documents');
      },

      /**
       * [getOneDocument get a new document from backend]
       * @param {string} id [document id]
       */
      getOneDocument: function(id) {
        return $http.get(baseUrl + '/api/documents/' + id);
      },

      /**
       * [getAllUserDocuments request for all documents
       * belonging to a user from backend]
       * @param {string} userId [user Id]
       */
      getAllUserDocuments: function(userId) {
        return $http.get(baseUrl + '/api/users/' + userId + '/documents');
      },

      /**
       * [updateDocument: sends request to update details of a document]
       * @param  {string} id   [document id]
       * @param  {object} data [new document details]
       */
      updateDocument: function(id, data) {
        return $http.put(baseUrl + '/api/documents/' + id, data);
      },

      /**
       * [deleteDocument: sends request to remove a document]
       * @param  {string} id   [document id]
       */
      deleteDocument: function(id) {
        return $http.delete(baseUrl + '/api/documents/' + id);
      }
    };

    return Document;

  }


]);

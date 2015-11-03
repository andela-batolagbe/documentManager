angular.module('documentManagerApp')
  .controller('docCtrl', ['docService', '$state', '$rootScope', '$window', '$scope', '$location', '$mdDialog', '$localStorage',
    function(docService, $state, $rootScope, $window, $scope, $location, $mdDialog, $localStorage) {



      /**
       * [getAllDocuments:  return all documents and display]
       * @return {array} [array of documents in database or error message]
       */
      $scope.getAllDocuments = function() {

        docService.getAllDocuments().success(function(res) {

          $scope.Documents = res;

        }).error(function(err) {
          $scope.getErrorMessage = err.message;
        });
      };

      /**
       * [getOneDocument get a single document from the backend]
       * @param  {string} id [document Id]
       * @return {object}    [document details or error message]
       */
      $scope.getOneDocument = function(id) {
        var docId = $scope.id;
        docService.getOneDocument(docId).success(function(res) {
          $scope.Document = res;
          $localStorage.currentDoc = res;
        }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      //collect all documents belonging to a user
      /**
       * [getAllUserDocuments: return all documents belonging
       *  to a user and display]
       * @return {array} [document list or error message]
       */
      $scope.getAllUserDocuments = function() {

        var userId = $localStorage.activeUser._id;

        docService.getAllUserDocuments(userId).success(function(res) {

          $scope.userDocuments = res;

        }).error(function(err) {
          $rootScope.displayError(err.message);

        });
      };

      /**
       * [editDocument edit contents of a document]
       * @param  {string} id  [document Id]
       * @param  {object} doc [new document details]
       * @return {string}     [success or eror message from the backend]
       */
      $scope.editDocument = function(id, doc) {

        var data = {
          title: doc.title,
          content: doc.content
        };
        
        docService.updateDocument(id, data).success(function(res) {
          $state.reload();
          $rootScope.displayStatus(res.message);
        }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      /**
       * [deleteDocument remove a document from list]
       * @param  {string} id [document Id]
       * @return {string}    [success or error message]
       */
      $scope.deleteDocument = function(id) {
        docService.deleteDocument(id).success(function(res) {
          $state.reload();
          $rootScope.displayStatus(res.message);
        }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      /**
       * [showDocDialog document creation modal dialog]
       * @param  {string} env [event notifier]
       * @return {none}     [pop open modal]
       */
      $rootScope.showDocDialog = function(env) {
        $mdDialog.show({
          controller: docDialogCtrl,
          templateUrl: '../../partials/docDialog-view.html',
          parent: angular.element(document.body),
          targetEvent: env,
          clickOutsideToClose: true
        });
      };

      /**
       * [docDialogCtrl controller for activities on 
       * document creation dialog]
       * 
       * @param  {angular method} $scope     [new scope for controlling dom events]
       * @param  {angular method} $mdDialog  [for controlling dialog display]
       * @param  {angular method} $state     [angular state to update page]
       * @param  {angular method} $rootScope [for status display functions]
       * @return {string}            [status message]
       */
      function docDialogCtrl($scope, $mdDialog, $state, $rootScope) {

        //create a document within the dialopg
        $scope.createDocument = function() {

          var data = {
            title: $scope.title,
            content: $scope.content,
            user: $localStorage.activeUser.username

          };

          docService.addDocument(data).success(function(res) {
            $state.reload();
            $rootScope.displayStatus(res.message);
          }).error(function(err) {
            $rootScope.displayError(err.message + 'try, again');
          });
        };

        /**
         * [hide hide dialog]
         */
        $scope.hide = function() {
          $mdDialog.hide();
        };


        /**
         * [cancel cancel dialog without saving changes] 
         */
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

    }

  ]);

angular.module('documentManagerApp')
  .controller('docCtrl', ['docService', '$rootScope', '$window', '$scope', '$location', '$mdDialog', '$localStorage',
    function(docService, $rootScope, $window, $scope, $location, $mdDialog, $localStorage) {

      $scope.getAllDocuments = function() {

        docService.getAllDocuments().success(function(res) {

          $scope.Documents = res;

        }).error(function(err) {
          $scope.getErrorMessage = err.message;
        });
      };

      $scope.getOneDocument = function(id) {
        var docId = $scope.id;
        docService.getOneDocument(docId).success(function(res) {
          $scope.Document = res;
          $localStorage.currentDoc = res;
        }).error(function(err) {
          $rootScope.displayError(err.message);
        });
      };

      $scope.getAllUserDocuments = function() {

        var userId = $localStorage.activeUser._id;

        docService.getAllUserDocuments(userId).success(function(res) {

          $scope.userDocuments = res;

        }).error(function(err) {
          $rootScope.displayError(err.message);

        });
      };

      $scope.editDocument = function(id) {
        var data = {
          title: $scope.title,
          content: $scope.content
        };
        docService.updateDocument(id, data).success(function(res) {
          $rootScope.displayStatus(res.message);
        }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      $scope.deleteDocument = function(id) {
        docService.deleteDocument(id).success(function(res) {
          $rootScope.displayStatus(res.message);
        }).error(function(err) {
          $rootScope.displayError(err.message + 'try, again');
        });
      };

      $rootScope.showDocDialog = function(env) {
        $mdDialog.show({
          controller: docDialogCtrl,
          templateUrl: '../../partials/docDialog-view.html',
          parent: angular.element(document.body),
          targetEvent: env,
          clickOutsideToClose: true
        });
      };

      function docDialogCtrl($scope, $mdDialog) {

        $scope.createDocument = function() {

          var data = {
            title: $scope.title,
            content: $scope.content,
            user: $localStorage.activeUser.username

          };

          docService.addDocument(data).success(function(res) {
            $rootScope.displayStatus(res.message);
          }).error(function(err) {
            $rootScope.displayError(err.message + 'try, again');
          });
        };

        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

      $scope.currentDoc = $localStorage.currentDoc;
    }



  ]);

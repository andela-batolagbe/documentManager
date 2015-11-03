'use strict';

describe('docManager Controllers', function() {

  var mockHttp, scope, mainCtrl, location

  var user = {
      username: 'flyguy',
      name: {
        first: 'John',
        last: 'Legend'
      },
      email: 'flyestman@gmail.com',
      password: 'northside2003'
    },
    doc = {
      title: 'Football',
      content: 'The beautiful game'
    };

  beforeEach(angular.mock.module('documentManagerApp'));

  //main controller test
  describe('Main Controller', function() {

    beforeEach(inject(function($rootScope, $controller) {

      scope = $rootScope.$new();
      mainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));

    //displayStatus test
    it('should display status message', function() {

      expect(scope.displayStatus).toBeDefined();
      expect(typeof scope.displayStatus).toEqual('function');

    })

    //displayError test
    it('should display error message', function() {

      expect(scope.displayError).toBeDefined();
      expect(typeof scope.displayError).toEqual('function');

    })

  });

    //user controller test
  describe('User Controller', function() {

    beforeEach(inject(function($httpBackend, $rootScope, $controller, _$location_) {
      
      var rootScope, userCtrl;
      mockHttp = $httpBackend;
      scope = $rootScope.$new();
      location = _$location_;

      mainCtrl = $controller('MainCtrl', {
        $scope: rootScope
      });
      userCtrl = $controller('UserCtrl', {
        $scope: scope
      });
    }));

    //verify request and response statuses after each test
    afterEach(function() {
      mockHttp.verifyNoOutstandingExpectation();
      mockHttp.verifyNoOutstandingRequest();
    });


    //log in test
    it('should login a user and redirect to user page', function() {

      //respond to all page redirect request with 200;
      mockHttp.whenGET(/\.html$/).respond(200);
      scope.username = user.username;
      scope.password = user.password;

      var activeUser = {
        username: user.username,
        password: user.password
      }
      mockHttp.expectPOST('http://localhost:3000/api/users/login', activeUser).respond({});

      var signinUser = scope.signin()
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.signin).toBeDefined();
      expect(scope.signin).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/userhome');

    });

    //sign up test
    it('should signup a user and redirect to login', function() {

      mockHttp.whenGET(/\.html$/).respond(200);

      scope.username = user.username;
      scope.password = user.password;
      scope.first = user.firstname;
      scope.last = user.lastname;
      scope.email = user.email;

      var newUser = {
        username: scope.username,
        password: scope.password,
        email: scope.email,
        name: {
          first: scope.first,
          last: scope.last
        }
      }
      mockHttp.expectPOST('http://localhost:3000/api/users/', newUser).respond({});
      scope.signup();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.signup).toBeDefined();
      expect(scope.signup).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/login');
    });

    //logout test
    it('should logout a user', function() {

      mockHttp.whenGET(/\.html$/).respond(200);

      mockHttp.expectPOST('http://localhost:3000/api/users/logout').respond({});
      scope.logout();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.logout).toBeDefined();
      expect(scope.signup).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/');
    });

    //get user details test
    it('should get user details', function() {

      var localStorage;

      inject(function(_$localStorage_) {
        localStorage = _$localStorage_;
      });

      localStorage.activeUser = {
        _id: 1,
        username: user.username,
        password: user.password
      };

      mockHttp.whenGET(/\.html$/).respond(200);

      mockHttp.expectGET('http://localhost:3000/api/users/1').respond(localStorage.activeUser);
      scope.getUserDetails();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.getUserDetails).toBeDefined();
      expect(scope.getUserDetails).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/');
    });

    //delete user test
    it('should delete user details', function() {

      var localStorage;

      inject(function(_$localStorage_) {
        localStorage = _$localStorage_;
      });

      localStorage.activeUser = {
        _id: 1,
        username: user.username,
        password: user.password
      };

      mockHttp.whenGET(/\.html$/).respond(200);

      mockHttp.expectDELETE('http://localhost:3000/api/users/1').respond({});
      scope.deleteUser();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.deleteUser).toBeDefined();
      expect(scope.deleteUser).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/');
    });

  });

  //document controller test
  describe('Document Controller', function() {

    beforeEach(inject(function($httpBackend, $rootScope, $controller, _$location_) {
      var rootScope, docCtrl;
      mockHttp = $httpBackend;
      scope = $rootScope.$new();
      location = _$location_;
      mainCtrl = $controller('MainCtrl', {
        $scope: rootScope
      });
      docCtrl = $controller('docCtrl', {
        $scope: scope
      });
    }));

    //get all document test
    it('should get all documents', function() {

      //respond to all page redirect request with 200
      mockHttp.whenGET(/\.html$/).respond(200);

      mockHttp.expectGET('http://localhost:3000/api/documents').respond({});
      scope.getAllDocuments();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.getAllDocuments).toBeDefined();
      expect(scope.getAllDocuments).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/');
    });

    //get all user document test
    it('should get all documents belonging to a user', function() {

      var userCntrl, localStorage;


      inject(function($controller, _$localStorage_) {

        userCntrl = $controller('UserCtrl', {
          $scope: scope
        });
        localStorage = _$localStorage_;
      });

      localStorage.activeUser = {
        _id: 1,
        username: user.username,
        password: user.password
      };

      mockHttp.whenGET(/\.html$/).respond(200);

      mockHttp.expectGET('http://localhost:3000/api/users/1/documents').respond({});
      scope.getAllUserDocuments();
      spyOn(location, 'path')
      mockHttp.flush()
      expect(scope.getAllUserDocuments).toBeDefined();
      expect(scope.getAllUserDocuments).toBeTruthy();
      expect(location.path).toHaveBeenCalledWith('/');
    });

  });
});

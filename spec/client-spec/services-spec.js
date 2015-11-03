'use strict';

describe('docManager Services', function() {

  var mockHttp, userService, docService;

  var user = {
      username: 'flyguy',
      name: {
        first: 'John',
        last: 'Legend'
      },
      email: 'flyestman@gmail.com',
      password: 'northside2003'
    },
    docs = [{
      title: 'Football',
      content: 'The beautiful game'
    }, {
      title: 'Menu List',
      content: 'french fires, bean cake, salad and sandwich'
    }];

  //inject app before each test
  beforeEach(angular.mock.module('documentManagerApp'));

  //user service test
  describe('User Service', function() {

    beforeEach(function() {
      angular.mock.inject(function($injector) {
        mockHttp = $injector.get('$httpBackend');
        userService = $injector.get('UserService');
      });
    });

    //service should be defined
    it('should be defined', function() {
      expect(userService).toBeDefined();

    });

    //sign up request test
    it('should signup a new user', function() {

      mockHttp.expectPOST('http://localhost:3000/api/users/').respond({
        success: true,
        message: 'signup successful!'
      });
      var signup = userService.signup(user);
      mockHttp.flush();
      expect(signup.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'signup successful!'
      }));

    });

    //login request test
    it('should login a user', function() {
      var activeUser = {
        username: user.username,
        password: user.password
      };
      mockHttp.expectPOST('http://localhost:3000/api/users/login', activeUser).respond({
        success: true,
        message: 'you are logged in!'
      });
      var login = userService.login(activeUser);
      mockHttp.flush();
      expect(login.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'you are logged in!'
      }));

    });

    //update user request test
    it('should update a user details', function() {

      var activeUser = {
          id: 1,
          username: user.username,
          password: user.password
        },
        newName = {
          username: 'gentle'
        };
      mockHttp
        .expectPUT('http://localhost:3000/api/users/1', {
          username: 'gentle'
        }).respond({
          success: true,
          message: 'your details updated!'
        });
      var updateProfile = userService.updateUserData(activeUser.id, newName);
      mockHttp.flush();
      expect(updateProfile.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'your details updated!'
      }));
    });

    //get user profile request test
    it('should get a single user', function() {
      var id = 1;
      mockHttp
        .expectGET('http://localhost:3000/api/users/1').respond(user);
      var activeUser = userService.getUser(id);
      mockHttp.flush();
      expect(activeUser.$$state.value.data).toEqual(jasmine.objectContaining(user));
    });


    //delete user account request test
    it('should delete user', function() {
      var id = 1;
      mockHttp
        .expectDELETE('http://localhost:3000/api/users/1').respond({
          success: true,
          message: 'your account deleted!'
        });
      var activeUser = userService.deleteUser(id);
      mockHttp.flush();
      expect(activeUser.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'your account deleted!'
      }));
    });

  });


  //document services test
  describe('Document Service', function() {

    beforeEach(function() {
      angular.mock.inject(function($injector) {
        mockHttp = $injector.get('$httpBackend');
        docService = $injector.get('docService');
      });
    });

    //service should be defined
    it('should be defined', function() {
      expect(docService).toBeDefined();

    });

    //create document request test
    it('should create a new document', function() {

      mockHttp.expectPOST('http://localhost:3000/api/documents').respond({
        success: true,
        message: 'your document added!'
      });
      var newDoc = docService.addDocument(docs[0]);
      mockHttp.flush();
      expect(newDoc.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'your document added!'
      }));

    });

    //edit/update document request test
    it('should edit a document', function() {

      var doc = {
          id: 1,
          title: docs[0].title,
          content: docs[0].content
        },
        newdocName = {
          title: 'The Game'
        };
      mockHttp
        .expectPUT('http://localhost:3000/api/documents/1', {
          title: 'The Game'
        }).respond({
          success: true,
          message: 'document updated!'
        });
      var updateDoc = docService.updateDocument(doc.id, newdocName);
      mockHttp.flush();
      expect(updateDoc.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'document updated!'
      }));
    });

    //get all documents request test
    it('should get all documents', function() {

      mockHttp
        .expectGET('http://localhost:3000/api/documents').respond(docs);
      var docList = docService.getAllDocuments();
      mockHttp.flush();
      expect(docList.$$state.value.data).toEqual(jasmine.objectContaining(docs));
    });

    //get one document request test
    it('should get a single document', function() {
      var id = 2;
      mockHttp
        .expectGET('http://localhost:3000/api/documents/2').respond(docs[1]);
      var doc = docService.getOneDocument(id);
      mockHttp.flush();
      expect(doc.$$state.value.data).toEqual(jasmine.objectContaining(docs[1]));
    });

    //get a user document request test
    it('should get a user documents', function() {
      var userDoc = docs[1];
      userDoc.userId = 2;
      mockHttp
        .expectGET('http://localhost:3000/api/users/2/documents').respond(userDoc);
      var userDocs = docService.getAllUserDocuments(userDoc.userId);
      mockHttp.flush();
      expect(userDocs.$$state.value.data).toEqual(jasmine.objectContaining(userDoc));
    });

    //delete document request test
    it('should delete a document', function() {
      var id = 1;
      mockHttp
        .expectDELETE('http://localhost:3000/api/documents/1').respond({
          success: true,
          message: 'document deleted!'
        });
      var deleteDoc = docService.deleteDocument(id);
      mockHttp.flush();
      expect(deleteDoc.$$state.value.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'document deleted!'
      }));
    });

  });
});

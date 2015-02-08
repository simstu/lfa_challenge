(function() {
  
  var app = angular.module('schoolServices', ['booksServices']);


  app.service('orm', function(){


  })


  app.service('students', ['$http', '$rootScope', function ($http, $rootScope) {
    var self = this;
    // self.students = {};
    
    $http.get('/students').success(function(students) {
      self.students = students;
      $rootScope.$broadcast('students:got', students);
    });


    self.getStudent = function(id){
      return _.find(self.students, function(student){ 
        return student.id === id; 
      });
    }

  }]);

  app.controller('StudentsIndexCtrl', ['students', '$rootScope', function(students, $rootScope){
    var self = this;
    self.students = students.students;

    $rootScope.$on('students:got', function (event, data) {
      self.students = data;
    });

  }]);

  app.controller('StudentShowCtrl', ['$scope', '$stateParams',  'students', 'librarian', function($scope, $stateParams, students, librarian) {
    var id = Number($stateParams.id);
    $scope.student = students.getStudent(id);
    $scope.favorites = function(){
      
      return _.map($scope.student.favorite_books, function(id){
        var idString = id.toString();
        console.log( librarian.getBook( idString  ) );
        return librarian.getBook( idString  );
      })
    }

  }]);




})();


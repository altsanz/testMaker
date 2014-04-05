'use strict';

angular.module('testMakerApp')
    .controller('MainCtrl', function($scope) {

    })
    .controller('QuestionCtrl', function($scope, $routeParams, JsonService) {
        $scope.selectedId = '';
        $scope.id = $routeParams.id;
        $scope.nextId = parseInt($routeParams.id, 10) + 1;
        $scope.select = function(answerId) {
        	$scope.selectedId = answerId;
        }
        $scope.try = function() {
            $scope.correction = true;

            if ($scope.selectedId === $scope.correctId) {
                console.log('SUCCESS');
            } else {
                console.log('FAIL');
            }
        };

        JsonService.get(function(data) {
            $scope.question = data[$scope.id].question;
            $scope.answers = data[$scope.id].answers;
            $scope.correctId = data[$scope.id].correct;
        });
    })
    
    .factory('JsonService', function($resource) {
        return $resource('questions/questions.json');
    });
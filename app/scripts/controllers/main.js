'use strict';

app.controller('MainCtrl', function($scope) {

});

app.controller('QuestionCtrl', function($scope, $routeParams, JsonService, OverallService) {
    $scope.selectedId = '';
    $scope.id = $routeParams.id;
    $scope.nextId = parseInt($routeParams.id, 10) + 1;
    $scope.correctCounter = OverallService.correctCounter;

    $scope.wrongCounter = OverallService.wrongCounter;

    $scope.streakCounter = OverallService.streakCounter;
    $scope.bestStreakCounter = OverallService.bestStreakCounter;


    var refreshCounters = function() {
        $scope.correctCounter = OverallService.correctCounter;

        $scope.wrongCounter = OverallService.wrongCounter;
        $scope.streakCounter = OverallService.streakCounter;
        $scope.bestStreakCounter = OverallService.bestStreakCounter;

    };
    $scope.select = function(answerId) {
        $scope.selectedId = answerId;
    };
    $scope.
    try = function() {
        $scope.correction = true;

        if ($scope.selectedId === $scope.correctId) {
            OverallService.addCorrect();
        } else {
            OverallService.addWrong();
        }

        refreshCounters();
    };



    JsonService.get(function(data) {
        $scope.question = data[$scope.id].question;
        $scope.answers = data[$scope.id].answers;
        $scope.correctId = data[$scope.id].correct;
    });
});
app.service('OverallService', function() {
    this.correctCounter = 0;
    this.wrongCounter = 0;
    this.streakCounter = 0;
    this.bestStreakCounter = 0;


    this.addCorrect = function() {
        this.correctCounter++;
        this.streakCounter++;
        if (this.streakCounter > this.bestStreakCounter) {
            this.bestStreakCounter = this.streakCounter;
        }
    };

    this.addWrong = function() {
        this.wrongCounter++;
        this.streakCounter = 0;
    };
});
app.factory('JsonService', function($resource) {
    return $resource('questions/questions.json');
});
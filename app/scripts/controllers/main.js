'use strict';

app.controller('MainCtrl', function($scope, PackageManagerService) {
    PackageManagerService.getQuestionnaireList().query(function(data) {
        console.log(data); 
        $scope.availablePackages = data;
    });
});

app.controller('QuestionCtrl', function($scope, $routeParams, OverallService, PackageManagerService) {
    $scope.selectedId = '';
    $scope.id = $routeParams.id;
    $scope.package = $routeParams.package;

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

    $scope.try = function() {
        $scope.correction = true;

        if ($scope.selectedId === $scope.correctId) {
            OverallService.addCorrect();
        } else {
            OverallService.addWrong();
        }

        refreshCounters();
    };

    PackageManagerService.getQuestionnaire($scope.package).query(function(data) {
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


/**
 * Get a specific questionnaire
 */
app.service('PackageManagerService', function($resource) {
    this.baseLocation = 'http://localhost:4730/';

    this.getQuestionnaireList = function() {
        return $resource(this.baseLocation + 'questionnaires/');

    }
    this.getQuestionnaire = function(keyName) {
        return $resource(this.baseLocation + 'questionnaires/' + keyName);
    };
});
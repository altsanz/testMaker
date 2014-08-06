'use strict';

app.controller('AddQuestionsAccordionCtrl', function($scope) {
   
	/**
	 * Initial questions array with a demo question
	 */
    $scope.questions = [{
        title: 'Demo question',
        content: 'Demo content'
    }];

    /**
     * Adds a new question on the array with demo data
     */
    $scope.addQuestion = function() {
        $scope.questions.push({
            title: 'Demo question ' + ($scope.questions.length + 1),
            content: 'Demo content'
        });
    };



});
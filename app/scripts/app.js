'use strict';

var app = angular
  .module('testMakerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Question/:package/:id/', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .when('/Questionnaire/add', {
        templateUrl: 'views/addQuestionnaire.html',
        controller: 'AddQuestionnaireCtrl'
      })
      .when('/About', {
        templateUrl: 'views/about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });


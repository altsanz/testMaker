'use strict';

angular
  .module('testMakerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Question/:id/', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .when('/About', {
        templateUrl: 'views/about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

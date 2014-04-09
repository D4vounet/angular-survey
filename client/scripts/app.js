'use strict';

moment.lang('fr');

angular.module('angular-survey', [
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider

    // Home
    .when('/home', { templateUrl: 'views/home.html', controller: 'HomeCtrl'})
    .when('/step/end', { templateUrl: 'views/end.html', controller: 'EndCtrl'})
    .when('/step/:step', { templateUrl: 'views/step.html', controller: 'StepCtrl'})
    
    // Default
    .otherwise({
      redirectTo: '/home'
    });

    
});

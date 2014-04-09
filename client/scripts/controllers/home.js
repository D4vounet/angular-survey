'use strict';

angular.module('angular-survey')
.controller('HomeCtrl', 
  ['$scope', '$location', 'survey',
  function ($scope, $location, surveyStore) {

    $scope.init = function(){
      surveyStore.getSurvey().then(function(survey){
        $scope.survey = survey;
        return surveyStore.getSteps()
      }).then(function(steps){
        $scope.next = (steps.length > 0)? steps[0]: false;
      });
    };

    $scope.start = function(){
      surveyStore.triggerStart().then(function(){
        $location.path('/step/'+$scope.next.id);
      });
    };

    $scope.init();
  }
]);

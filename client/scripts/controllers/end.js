'use strict';

angular.module('angular-survey')
.controller('EndCtrl', 
  ['$scope', 'survey',
  function ($scope, surveyStore) {

    $scope.init = function(){
      surveyStore.getSurvey().then(function(survey){
        $scope.survey = survey;
      });
    };

    $scope.init();
  }
]);

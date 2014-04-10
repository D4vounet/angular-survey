'use strict';

angular.module('angular-survey')
.controller('StepCtrl', 
  ['$scope', '$routeParams', '$location', 'survey',
  function ($scope, $routeParams, $location, surveyStore) {

    function buildData(){
      console.log('SALUT');
      var result = {};
      for(var i=0; i<$scope.step.questions.length; i++){

        var question = $scope.step.questions[i], data = undefined;
        if(question.type == 'check'){
          // CHECKBOX
          data = {};
          for(var j=0; j<question.items.length; j++){
            if(question.items[j].selected)
              data[question.items[j].name] = question.items[j].userInput || true;
          }
        } else if(question.type == 'radio'){
          // RADIO
          data = {};
          for(var j=0; j<question.items.length; j++){
            if(question.items[j].selected)
              data[question.items[j].name] = question.items[j].userInput || true;
          }
        } else if(question.type == 'fields'){
          // FIELDS
          data = {};
          for(var j=0; j<question.items.length; j++){
            if(question.items[j].value)
              data[question.items[j].name] = question.items[j].value
          }
        } else if(question.type == 'open'){
          // OPEN
          data = question.value;
        } else if(question.type == 'checkGrid'){
          // CHECKGRID
          data = {};
          for(var j=0; j<question.items.length; j++){
            if(question.items[j].value)
              data[question.items[j].name] = question.items[j].value;
          }
        }

        if(!_.isEmpty(data)){
          result[question.id] = { data: data};
          if(question.comments)
            result[question.id].comments = question.comments;
        }
      }

      console.log(result);
      return result;
    }

    $scope.init = function(){
      surveyStore.getStep($routeParams.step).then(function(step){
        $scope.step = step;
        console.log(step);
      });
    };

    $scope.validate = function(){
      surveyStore.sendData($scope.step, buildData()).then(function(data){
        if(data.status == 'ok')
          surveyStore.gotoNext($routeParams.step);
      });
    };

    // Different question types logic
    $scope.checkbox = function(question, choice){
      choice.selected = !choice.selected;
    };
    $scope.radio = function(question, choice){
      for(var i=0; i<question.items.length; i++)
        question.items[i].selected = false;
      choice.selected = true;
    };
    $scope.checkGrid = function(question, choice, value){
      choice.value = value;
    };


    $scope.init();
  }
]);

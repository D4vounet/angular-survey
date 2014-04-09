'use strict';

angular.module('angular-survey')
.service('survey', ['$q', '$location', 'requester', function($q, $location, requester){

  var survey = undefined,
    steps = [],
    token = undefined,
    currentStep = undefined,
    answers = [];

  this.getSurvey = function(){
    var deferred = $q.defer();

    if(survey !== undefined)
      deferred.resolve(survey);
    else {
      requester.get('/survey').then(function(data){
        survey = data.survey;
        steps = data.steps;
        deferred.resolve(survey);
      });
    }
    return deferred.promise;
  };

  this.getSteps = function(){
    var deferred = $q.defer();

    if(steps.length != 0)
      deferred.resolve(steps);
    else {
      requester.get('/survey').then(function(data){
        survey = data.survey;
        steps = data.steps;
        deferred.resolve(steps);
      });
    }
    return deferred.promise;
  };

  this.getStep = function(id){
    var deferred = $q.defer();

    var step = _.findWhere(steps, {id: id});
    if(step === undefined)
      $location.path('/');
    else if(step.questions)
      deferred.resolve(step);
    else {
      requester.get('/step/'+id).then(function(data){
        step = data.step;
        step.questions = data.questions;
        deferred.resolve(step);
      });
    }
    return deferred.promise;
  };

  this.sendData = function(step, data){
    return requester.post('/step/'+step.id, {
      token: token,
      data: data,
      survey: survey.id,
      step: step.id
    });
  };

  this.triggerStart = function(){
    return requester.post('/start').then(function(data){
      token = data.token;
      return this;
    });
  };

  this.gotoNext = function(current){
    var trigger = false;
    for(var i=0; i<steps.length; i++){
      if(trigger)
        return $location.path('/step/'+steps[i].id);
      else if(steps[i].id == current)
        trigger = true;
    }
    return $location.path('/step/end');
  };

  this.getToken = function(){
    return token;
  };

  this.loadToken = function(){
    console.log('TODO: Load existing token stored is local storage');
  };

  this.loadToken();

}]);
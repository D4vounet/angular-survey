'use strict';

angular.module('angular-survey')
.factory('requester', ['$http', '$q', function($http, $q){

  var requester = {
    apiRoot: 'http://localhost:30000',

    // Perform a GET request
    get: function(url, params){
      var deferred = $q.defer();

      $http.get(this.apiRoot+url, {params: params}).then(function(data){
        deferred.resolve(data.data);
      },function(data){
        console.error('Unable to get '+url);
        deferred.reject(data.data);
      });

      return deferred.promise;
    },


    // Perform a POST request
    post: function(url, params){
      var deferred = $q.defer();

      $http.post(this.apiRoot+url, params).then(function(data){
        deferred.resolve(data.data);
      },function(data){
        console.error('Unable to post to '+url);
        deferred.reject(data.data);
      });

      return deferred.promise;
    }
  };

  return requester;
}]);
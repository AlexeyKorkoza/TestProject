"use strict";

angular
  .module("myApp")
  .factory("mainService", mainService);

mainService.$inject = ["$http"];

function mainService($http) {

  var service = {
    getPlaces: getPlaces,
    getTypes: getTypes,
    getByType: getByType
  };

  return service;

  function getPlaces() {
    return $http({
      url: '',
      method: 'post',
      data: {
        'allPlaces': 'allPlaces'
      }
    });
  }

  function getTypes() {
    return $http({
      url: '',
      method: 'post',
      data: {
        'allTypes': 'allTypes'
      }
    });
  }

  function getByType(type) {
    return $http({
      url: '',
      method: 'post',
      data: {
        'type': type
      }
    })
  }

}
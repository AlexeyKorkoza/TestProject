'use strict';

var myApp = angular.module('myApp');
myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main/main.html',
      controller: 'mainCtrl'
    })
});
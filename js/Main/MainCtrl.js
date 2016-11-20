'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope, $http) {

  var map = L.map('map').setView([53.6834599, 23.8342648], 13);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18
  }).addTo(map);
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [24, 24],
      iconAnchor: [16, 37],
      popupAnchor: [0, -30]
    }
  });
  var markers = new L.FeatureGroup();

  function getAllTypesAjax() {
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        all: 'all'
      },
      success: function (response) {
        $scope.select = response.types;
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  getAllTypesAjax();

  function getDataByTypeAjax(type) {
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        'type': type
      },
      success: function (response) {
        console.log(response);
      },
      error: function (response) {
        console.log(response);
      }
    });
  }
});

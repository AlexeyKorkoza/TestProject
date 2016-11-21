'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope) {

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

  function getAllTypes() {
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        'allTypes': 'allTypes'
      },
      success: function (response) {
        $scope.select = response.types;
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  function getAllPlaces() {
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        'allPlaces': 'allPlaces'
      },
      success: function (response) {
        for (var i = 0; i < response.places.length; i++) {
          var image = $scope.select[response.places[i].id_type - 1].marker_img;
          var iconPlace = new LeafIcon({iconUrl: "img/" + image + ".png"});
          var marker = L.marker([response.places[i].coordinateX, response.places[i].coordinateY],
            {icon: iconPlace}).bindPopup(response.places[i].description).addTo(map);
          markers.addLayer(marker);
        }
        map.addLayer(markers);
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  getAllTypes();
  getAllPlaces();

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
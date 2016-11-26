'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope) {

  $scope.allMarkers = {};

  angular.extend($scope, {
    grodno: {
      lat: 53.6834599,
      lng: 23.8342648,
      zoom: 13
    },
    layers: {
      baselayers: {
        openStreetMap: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      }
    },
    markers: $scope.allMarkers
  });

  function iconOfPlace(type) {
    var icon = {
      iconUrl: "../../img/"+ type +".png",
      iconSize:     [25, 25],
      iconAnchor:   [12, 12],
      popupAnchor:  [0, 0]
    };
    return icon;
  }

  getAllTypes();
  getAllPlaces();

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
        addPlaceInMap(response);
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  function addPlaceInMap(response) {
    response.places.forEach(function (item) {
      var nameOfImage = $scope.select[item['id_type'] - 1].marker_img;
      var typeOfPlace = $scope.select[item['id_type'] - 1].name_type;
      $scope.allMarkers[item['id_place'] - 1] = {
        lat: parseFloat(item['coordinateX']),
        lng: parseFloat(item['coordinateY']),
        message: item['name_place'],
        draggable: true,
        icon: iconOfPlace(nameOfImage),
        focus: false
      }
    });
  }

  $scope.getByType = function (type) {
    if (type === "") {
      getAllPlaces();
    } else {
      $scope.allMarkers = {};
      $.ajax({
        url: '../../server.php',
        type: 'POST',
        data: {
          'type': type
        },
        success: function (response) {
          addPlaceInMap(response);
        },
        error: function (response) {
          console.log(response);
        }
      });
    }
  }
});
'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope) {

  document.getElementById("map").style.height = window.innerHeight + "px";

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
    }
  });

  function iconOfPlace(type) {
    return {
      iconUrl: "../../img/"+ type +".png",
      iconSize:     [25, 25],
      iconAnchor:   [12, 12],
      popupAnchor:  [0, 0]
    };
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
    $scope.markers = {};
    response.places.forEach(function (item) {
      var nameOfImage = $scope.select[item['id_type'] - 1].marker_img;
      var typeOfPlace = $scope.select[item['id_type'] - 1].name_type;
      $scope.markers[item['id_place'] - 1] = {
        lat: parseFloat(item['coordinateX']),
        lng: parseFloat(item['coordinateY']),
        message: "<b>\"" + item['name_place'] + "\",</b> " + typeOfPlace + "<br>" +
        item['address'],
        draggable: true,
        icon: iconOfPlace(nameOfImage),
        focus: false
      }
    });
    angular.extend($scope, {
      markers: $scope.markers
    });
  }

  $scope.getByType = function (type) {
    if (type === "") {
      getAllPlaces();
    } else {
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
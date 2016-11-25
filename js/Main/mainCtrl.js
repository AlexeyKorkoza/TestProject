'use strict';

var myApp = angular.module('myApp');
myApp.controller('MainController', function ($scope) {

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
    markers: $scope.markers
  });

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
        console.log($scope.select);
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
    $scope.markers = new Array();
    for (var i = 0; i < response.places.length; i++) {
      $scope.markers.push({
        lat: response.places[i].coordinateX,
        lng: response.places[i].coordinateY,
        draggable: true
      });

      /*var nameOfImage = $scope.select[response.places[i].id_type - 1].marker_img;
      var typeOfPlace = $scope.select[response.places[i].id_type - 1].name_type;
      var iconPlace = new LeafIcon({iconUrl: "img/" + nameOfImage + ".png"});*/
     /* var marker = L.marker([response.places[i].coordinateX, response.places[i].coordinateY],
        {icon: iconPlace}).bindPopup("<b>\"" + response.places[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
        response.places[i].address).openPopup().addTo(map);*/
     /* markers.addLayer(marker);*/
    }
    console.log($scope.markers);
    /*map.addLayer(markers);*/
  }

  $scope.getByType = function (type) {
    if (type === "") {
      getAllPlaces();
    } else {
      markers.clearLayers();
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
'use strict';

angular
  .module('myApp')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ["mainService"];

function mainCtrl(mainService) {

  var vm = this;
  vm.types = [];
  vm.select = [];
  vm.places = [];
  vm.group_markers = [];
  vm.getAllTypes = getAllTypes;
  vm.getAllPlaces = getAllPlaces;
  vm.getByType = getByType;
  vm.addPlaceInMap = addPlaceInMap;
  vm.errorLoadData = errorLoadData;
  vm.activate = activate;

  activate();

  function activate() {

    vm.myConfig = {
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    angular.extend(vm, {
      grodno: {
        lat: 53.6834599,
        lng: 23.8342648,
        zoom: 13
      },
      markers: {},
      tiles: {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      }
    });

    vm.getAllTypes();
    vm.getAllPlaces();

  }

  function getAllTypes() {
    mainService.getTypes().then(
      function Success(response) {
        vm.types = response.data;
        vm.select.push({
          value: 0,
          text: "Все объекты"
        });
        for (var i = 0; i < vm.types.length; i++) {
          vm.select.push({
            value: response.data[i].id_type,
            text: response.data[i].name_type
          })
        }
      },
      function myError() {
        errorLoadData();
      });
  }

  function getAllPlaces() {
    mainService.getPlaces().then(
      function Success(response) {
        vm.places = response.data;
        addPlaceInMap(vm.places);
      },
      function Error() {
        errorLoadData();
      });
  }

  function addPlaceInMap(places) {
    if (vm.types !== '') {
      places.forEach(function (item, i) {
        var lat = parseFloat(item.lat);
        var lng = parseFloat(item.lng);
        var nameOfImage = vm.types[item.id_type - 1].image;
        vm.markers["marker" + (i + 1)] = {
          lat: lat,
          lng: lng,
          focus: false,
          group: 'vm.group_markers',
          draggable: false,
          message: '<b>"' +
          item.name_place +
          '",</b> ' +
          item.type +
          "<br>" +
          item.address +
          "<br/>",
          icon: {
            iconSize: [54, 54],
            iconAnchor: [16, 37],
            popupAnchor: [0, -30],
            iconUrl: "app/assets/img/" + nameOfImage
          }
        };
      });
      
    } else {
      errorLoadData();
    }
  }

  function errorLoadData() {
    swal({
      title: "Данные с сервера не загрузились!",
      text: '<span style="color:#F8BB86">Пожалуйста, обновите страницу<span>',
      confirmButtonText: "Обновить страницу",
      html: true
    }, function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    });
  }

  function getByType(type) {
    if (type === "0") {
      vm.getAllPlaces();
    } else {
      vm.markers = {};
      mainService.getByType(type).then(
        function Success(response) {
          addPlaceInMap(response);
        },
        function myError() {
          errorLoadData();
        });
    }
  }
}
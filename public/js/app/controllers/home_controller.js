(function() {
  'use strict';

  angular
    .module("app")
    .controller("CarouselDemoCtrl", CarouselDemoCtrl);

  CarouselDemoCtrl.$inject = ["$scope"];

  function CarouselDemoCtrl($scope){
    $scope.myInterval = 3000;
    $scope.slides = [
      {
        image: 'https://i153.photobucket.com/albums/s236/beebopn/joinme_zpsdj3wuxbm.png'
      },
      {
        image: 'https://i153.photobucket.com/albums/s236/beebopn/89f6882c-14ab-49e6-926e-b274af9dc72a_zps0oqihe5k.jpg'
      },
      {
        image: 'https://i.ytimg.com/vi/_7fur-ZOGE4/maxresdefault.jpg'
      }
    ];
  }


})();

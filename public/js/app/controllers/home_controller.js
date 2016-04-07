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
        image: '//i153.photobucket.com/albums/s236/beebopn/a4366cc0-fac1-485c-abfa-948e8fedf7ab_zpsfj6ziqaw.png'
      },
      {
        image: '//ct.fra.bz/ol/fz/sw/i56/5/4/13/frabz-Join-me-and-we-shall-rule-the-galaxy-2bff51.jpg'
      },
      {
        image: '//i.ytimg.com/vi/_7fur-ZOGE4/maxresdefault.jpg'
      }
    ];
  }


})();

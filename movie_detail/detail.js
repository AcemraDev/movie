(function(angular) {
  'use strict';

    angular.module('moviecat.movie_detail', [
      'ngRoute',
      'service.jsonp'
      ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/detail/:id', {
        templateUrl: 'movie_detail/detail.html',
        controller: 'DetaileController'
      });
    }])

    .controller('DetaileController', [
      '$scope',
      '$route',
      '$routeParams',
      'JsonpService',
      'AppConfiguration',
      function($scope,$route,$routeParams,JsonpService,AppConfiguration) {
          $scope.loading = false;
          var url = AppConfiguration.addressApiDetail + $routeParams.id;
          JsonpService.jsonp(url,{},function(data) {
              $scope.loading = true;
              $scope.detail = data;
              $scope.$apply();
          });
    }]);
})(angular);
'use strict';
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'movie.directives.auto_focus'
])
.constant('AppConfiguration',{
    listPageSize: 8,
    addressApiList: 'http://api.douban.com/v2/movie/',
    addressApiDetail: 'http://api.douban.com//v2/movie/subject/',
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
.controller('MainController',['$scope','$route',function($scope,$route) {
        $scope.keyWords = '';
        $scope.search = function() {
            $route.updateParams({category: 'search',q: $scope.keyWords});
        }
}]);

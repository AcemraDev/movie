(function(angular) {
  'use strict';

    angular.module('moviecat.movie_list', [
      'ngRoute',
      'service.jsonp'
      ])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/:category/:page?', {
        templateUrl: 'movie_list/view.html',
        controller: 'MovieListController'
      });
    }])

    .controller('MovieListController', [
      '$scope',
      '$route',
      '$routeParams',
      'JsonpService',
      'AppConfiguration',
      function($scope,$route,$routeParams,JsonpService,AppConfiguration) {
        $scope.subjects = [];
        $scope.count = '';
        $scope.title = 'loading...';
        $scope.loading = false;
        $scope.total = '';
        $scope.page =  parseInt($routeParams.page);
        var url = AppConfiguration.addressApiList + $routeParams.category;
        var count = AppConfiguration.listPageSize;
        $scope.start = ($scope.page - 1) * count;

        var data = {count: count,start: $scope.start,q: $routeParams.q};
        JsonpService.jsonp(url,data,function(data){

          $scope.subjects = data.subjects;
          $scope.title = data.title;
          $scope.total = data.total;
          $scope.pages = Math.ceil($scope.total / count);
          $scope.loading = true;
          $scope.$apply();
        });
        /**
         * 抽象出page和显示数据数的关系
         * 1.page指的是url当前的页数，刚开始默认为1，受后面按钮的改变，控制请求数据需要暴露为模型
         * 2.显示数据数是由内部决定
         * 3.计算出页面的数量，暴露的页面的标签之中
         * */ 
        // 地址栏根据page来确定是加载那个分页的记录
        // 实现按钮点击页面切换，并决定某些时候无法点击

        // 根据当前页数重新计算start 
        $scope.togglePages = function(page) {
          if(page >= 1 && page <= $scope.pages) {
            $scope.page = page; 
            $route.updateParams ({page: page});
          }
       }
    }]);
})(angular);
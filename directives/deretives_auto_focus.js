

(function(angular) {
    'use strict';
    angular.module('movie.directives.auto_focus',[])
    .directive('autoFocus',['$location','$routeParams',function($location,$routeParams){
        return {
        restrict: 'A',
        link: function($scope, iElement, iAttrs) {
            $scope.$location = $location;
            $scope.$watch('$location.path()',function(now){
                var href = iElement.children().attr('href');
                href = href.replace(/#(\/.+?)\/1/,'$1');
                if(now.startsWith(href)) {
                    iElement.parent().children().removeClass('active');
                    iElement.addClass('active');
                }else if(now.startsWith('/search')) {
                    iElement.parent().children().removeClass('active');
                }else if(now.startsWith('/detail')) {   
                    iElement.parent().children().removeClass('active');
                }
            });
         }
         // 首先路由改变会重新执行控制器（创建新的$scope）重新渲染视图意味重新执行指令
         // 我们这里应该是通过路径或者路由的属性进行决定，按钮是那个高亮

    }
    }]);
})(angular);
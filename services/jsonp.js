/**
 * jsonp跨域服务
*/

(function(angular){
    angular.module('service.jsonp',[])
        .service('JsonpService',['$window','$document',function($window,$document){
            this.jsonp = function (url,data,callback) {
                var querystring = url.indexOf('?')==-1 ? '?' : '&';
                if(typeof data === 'function') {
                    callback = data;
                }else {
                    for(key in data) {
                         querystring += key + '=' + data[key] + '&';
                     }
                }

                var cbName = 'my_jsonp' + '_' + Math.random().toString().replace('.','');

                var cbString =  'callback' + '=' + cbName;
                url += querystring + cbString;
                // 创建script标签
                var script = $document[0].createElement('script');
                script.src = url;
                $window[cbName] = function(data) {
                    callback(data);
                    $document[0].head.removeChild(script);
                };
                $document[0].head.appendChild(script);
            }
        }]);
})(angular);

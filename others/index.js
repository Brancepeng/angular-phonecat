/**
 * Created by brance on 2016/9/26.
 */
//这是一个provider
var pp = function(){
    this.$get = function(){
        return {'haha': '123'};
    }
}
var app = angular.module('app',[],function($provide){
    console.log('hello');
    $provide.provider('PP', pp);
});
app.service('FF', function(){
    this.abc = '123';
});
app.controller('TestCtrl',['$scope',function($scope,PP,FF){
        console.log('ok');
    console.log(PP);
    console.log(FF.abc);
    }]

);
/*var BoxCtrl = function($scope, $element){

    //$element 就是一个 jQuery 对象
    var e = $element.children().eq(0);
    $scope.w = e.width();
    $scope.h = e.height();

    $scope.click = function(){
        $scope.w = parseInt($scope.w) + 10;
        $scope.h = parseInt($scope.h) + 10;
    };

    $scope.$watch('w',function(to, from){
            e.width(to);
        }
    );

    $scope.$watch('h',function(to, from){
            e.height(to);
        }
    );
};*/

//angular.bootstrap(document.documentElement);
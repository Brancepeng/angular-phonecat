/**
 * Created by brance on 2016/5/7.
 */
(function(ng,app){

    'use strict';

    //define controller methods;

    function phoneDetailCtrl($scope,$routeParams,$http,Phone){

        $scope.phoneId = $routeParams.phoneId;
        //To construct the URL for the HTTP request, we use $routeParams.phoneId
        // extracted from the current route by the $route service.

       /* $http.get('data/'+$routeParams.phoneId+'.json').success(function(data){
            $scope.phone = data ;
            $scope.mainImageUrl = data.images[0];
        });*/

        //now let us use Angular's $resource service instead of $http service above.

        $scope.phone = Phone.get({phoneId :$routeParams.phoneId},function(data){

            $scope.mainImageUrl = $scope.phone.images[0];

        });


        $scope.setImgUrl = function(imgUrl){
            $scope.mainImageUrl = imgUrl;
        };

    }

    phoneDetailCtrl.$inject = ['$scope','$routeParams','$http','Phone'];

    app.controller('phoneDetailCtrl',phoneDetailCtrl);




})(angular,demo);
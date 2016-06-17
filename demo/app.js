/**
 * Created by brance on 2016/5/7.
 */

(function(ng){

    'use strict';

    //define our AngularJs  Application Module.
    //define variable 'demo' in global scope (window) ,or the other js document could't find it.
     window.demo=ng.module('Demo',[
         //'ngRoute',
         'ngResource',
         'ui.router'
     ]);

    //define Multiple Views, Routing and Layout Template via the $routeProvider object.
   /* demo.config(['$routeProvider',function($routeProvider){

        $routeProvider.
        when('/phones',{
            templateUrl:'phones/phone-list.html',
            controller :'phoneCtrl'
        }
        )
        .when('/phones/:phoneId',{
            templateUrl:'phones/phone-details.html',
            controller :'phoneDetailCtrl'
        })
        .otherwise({
            redirectTo:'/phones'
        });
    }]);*/

    demo.config(function($stateProvider,$urlRouterProvider){
        //for ang unmatched url,redirect to url '/phones'

        $urlRouterProvider.otherwise('/phones');

        //now set up the states;

        $stateProvider
            .state('state1',{
                url:'/phones',
                templateUrl:'phones/phone-list.html',
                controller:'phoneCtrl',
                resolve:['$http','$scope',function($http,$scope){

                    return $http.get('data/phones.json').success(function(data){

                        $scope.data = data;
                    });
                }]
            })
            .state('state2',{
                url:'/phones/:phoneId',
                templateUrl:'phones/phone-details.html',
                controller:'phoneDetailCtrl'
            });
    });

})(angular);
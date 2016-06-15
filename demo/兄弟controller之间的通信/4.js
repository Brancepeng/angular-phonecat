/**
 * Created by brance on 2016/5/11.
 */

'use strict';

angular.module('myApp',[])
    .factory('Instance',function(){

        return {key:'name',value:'wwwww'};

        })
    .controller('MainCtrl',function($scope,Instance){

        $scope.test = Instance.value;

        $scope.change = function(){
            $scope.test = 'qqqqq';
            Instance.value = $scope.test;
        };
    })
    .controller('SideCtrl',function($scope,Instance){

        $scope.add = function(){
            $scope.name = Instance.value;
        };
    });
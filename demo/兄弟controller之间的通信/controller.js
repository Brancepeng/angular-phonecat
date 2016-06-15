
/**
 * Created by brance on 2016/5/11.
 */


'use strict';


angular.module('myApp',[]).controller('Sandcrawler',['$scope',function($scope){

        //define controller methods;

        //function Sandcrawler(){
        $scope.location = "Mos Eisley North";
        $scope.$on('summon', function(e, newLocation) {
            $scope.location = newLocation;
        });
        //}

    $scope.obj={prop1:'a',prop2:'b'};
        // return {Sandcrawler:Sandcrawler};
    }])
    .controller('Droid',['$scope',function($scope){

        //define controller method;

        //function Droid(){
        $scope.location = "Owen Farm";
        $scope.summon = function() {
            $scope.$emit('summon', $scope.location);
        }
        //}

        $scope.prop2 = 'a';
        //return {Droid:Droid};
    }]);
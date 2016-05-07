/**
 * Created by brance on 2016/5/7.
 */
(function(ng,app){

    'use strict';

    //first way to define the phoneCtrl.
    app.controller('phoneCtrl',['$scope','$http',function($scope,$http){

        //define scope variables;

       /* $scope.phones = [
            {'name': 'Nexus S',
                'snippet': 'Fast just got faster with Nexus S.',
                'age': 1},
            {'name': 'Motorola XOOM™ with Wi-Fi',
                'snippet': 'The Next, Next Generation tablet.',
                'age': 2},
            {'name': 'MOTOROLA XOOM™',
                'snippet': 'The Next, Next Generation tablet.',
                'age': 3}
        ];*/

        $scope.orderProps = [{'key':'Alphabetical','value':'name'},{'key':'Newest','value': 'age'}];

        $scope.orderProp = 'name';

        //define controller methods;


        //$ Prefix Naming Convention
        //You can create your own services, and in fact we will do exactly that in step 11. As a
        // naming convention, Angular's built-in services, Scope methods and a few other Angular
        // APIs have a $ prefix in front of the name.

        //The $ prefix is there to namespace Angular-provided services. To prevent collisions it's
        // best to avoid naming your services and models anything that begins with a $.

        //If you inspect a Scope, you may also notice some properties that begin with $$.
        // These properties are considered private, and should not be accessed or modified.

        $http.get('data/phones.json').success(function(data){
            //Notice that Angular detected the json response and parsed it for us!
            $scope.phones = data;
        });

    }]);

    //Another way to define the phoneCtrl.


    //A Note on Minification

    //Since Angular infers the controller's dependencies from the names of arguments to the
    // controller's constructor function, if you were to minify the JavaScript code for PhoneListCtrl
    // controller, all of its function arguments would be minified as well, and the dependency
    // injector would not be able to identify services correctly.

    //We can overcome this problem by annotating the function with the names of the dependencies,provided as strings,
    // which will not get minified. There are two ways to provide these injection annotations:

    //one way :
    // Create a $inject property on the controller function which holds an array of strings.
    // Each string in the array is the name of the service to inject for the corresponding parameter.
    // In our example, we would write:

    //function PhoneListCtrl($scope, $http) {...}
    //PhoneListCtrl.$inject = ['$scope', '$http'];
    //phonecatApp.controller('PhoneListCtrl', PhoneListCtrl);


    //another way:
    //Use an inline annotation where, instead of just providing the function, you provide an array. This array contains
    // a list of the service names, followed by the function itself. As follows:


    //function PhoneListCtrl($scope, $http) {...}
    //phonecatApp.controller('PhoneListCtrl', ['$scope', '$http', PhoneListCtrl]);

   /* function phoneCtrl($scope,$http){

        $http.get('data/phones.json').success(function(data){
            //Notice that Angular detected the json response and parsed it for us!
            $scope.phones = data;
        });

    }
    phoneCtrl.$inject = ['$scope','$http'];
    app.controller('phoneCtrl',phoneCtrl);*/




})(angular,demo);
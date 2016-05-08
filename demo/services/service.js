/**
 * Created by brance on 2016/5/8.
 */
(function(ng,app){

    'use strict';

    app.factory('Phone',['$resource',function($resource){

        return  $resource('data/:phoneId.json',{},{

            query:{
                method :'GET',
                params :{phoneId:'phones'},
                isArray:true
            }
        });

    }]);



})(angular,demo);
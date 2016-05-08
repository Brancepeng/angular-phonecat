/**
 * Created by brance on 2016/5/8.
 */
(function(ng,app){

    'use strict';

    app.filter('checkmark',checkMark);
    function checkMark(){
        return function (input){
            return input ? '\u2713' : '\u2718';
        }
    }

    checkMark.$inject=[];

   /* return {
        checkMark:checkMark
    };*/

})(angular,demo);
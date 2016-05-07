/**
 * Created by brance on 2016/5/7.
 */

(function(ng){

    'use strict';

    //define our AngularJs  Application Module.
    //define variable 'demo' in global scope ,or the other js document could't find it.
     window.demo=ng.module('Demo',[
         'ngRoute'
     ]);

})(angular);
/**
 * Created by brance on 2016/5/11.
 */
(function(){

    'use strict';

    //1.What are Scopes?

    /*Scope is an object that refers to the application model. It is an execution context for
    expressions.Scopes are arranged in hierarchical structure which mimic the DOM structure
    of the application. Scopes can watch expressions and propagate events.*/



    //2.Scope characteristics

    //a.Scopes provide APIs ($watch) to observe model mutations.


    //$watch(watchExpression, listener, [objectEquality]);

    //Registers a listener callback to be executed whenever the watchExpression changes.


    //3.Scope as data-model

    //Scope is the glue between application controller and the view. During the template linking phase
    // the directives set up $watch expressions on the scope. The $watch allows the directives to be
    // notified of property changes, which allows the directive notes to render the updated value to the DOM.



    //4.Scope Hierarchies(scopes 分层)

    //Each Angular application has exactly one root scope, but may have several child scopes.
    // When Angular evaluates {{name}}, it first looks at the scope associated with the given element
    // for the name property. If no such property is found, it searches the parent scope and so on
    // until the root scope is reached. In JavaScript this behavior is known as prototypical
    // inheritance, and child scopes prototypically inherit from their parents.



})();
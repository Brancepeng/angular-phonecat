/**
 * Created by brance on 2016/5/9.
 */
(function(){

    //1.how to understanding controllers ?

    /*use controllers to:

    setup the initial state of the $scope object;

    Add behavior to the $scope object.*/

     //Do not use controller to :

    /* Manipulate DOM — Controllers should contain only business logic. Putting any presentation logic

     into Controllers significantly affects its testability. Angular has databinding for most cases

     and directives to encapsulate manual DOM manipulation.*/

    //relative api contains &route service and ngController directive.

    /*$route is used for deep-linking URLs to controllers and views (HTML partials). It watches

     $location.url() and tries to map the path to an existing route definition.  */

    //Requires the ngRoute module to be installed.

    //You can define routes through $routeProvider's API.

    //The $route service is typically used in conjunction with the ngView directive and the $routeParams service.

    //$route service depends two service called $location service and $routeParams service.

    //下面讲讲Scope继承的问题；
    //It is common to attach Controllers at different levels of the DOM hierarchy. Since the
    // ng-controller directive creates a new child scope, we get a hierarchy of scopes that inherit
    // from each other.

    //about understanding Scopes.

    /*In AngularJS, a child scope normally prototypically inherits from its parent scope. One exception
    to this rule is a directive that uses scope: { ... }--this creates an "isolate" scope that does not
     prototypically inherit. This construct is often used when
      creating a "reusable component" directive.In directives, the parent scope is used directly by
      default, which means that whatever you change in your directive that comes from the parent scope
      will also change in the parent scope. If you set scope:true (instead of scope: { ... }), then
       prototypical inheritance will be used for that directive.

     Scope inheritance is normally straightforward, and you often don't even need to know
     it is happening... until you try 2-way data binding (i.e., form elements, ng-model) to a primitive
      (e.g., number, string, boolean) defined on the parent scope from inside the child scope.t doesn't
       work the way most people expect it should work. What happens is that the child scope gets its
       own property that hides/shadows the parent property of the same name.

     This is not something AngularJS is doing – this is how JavaScript prototypal inheritance works.
     New AngularJS developers often do not realize that ng-repeat, ng-switch, ng-view and ng-include
     all create new child scopes, so the problem often shows up when these directives are involved.
     (See this example for a quick illustration of the problem.)
     This issue with primitives can be easily avoided by following the "best practice" of always
     have a '.' in your ng-models – watch 3 minutes worth. Misko demonstrates the primitive binding
     issue with ng-switch.

     Having a '.' in your models will ensure that prototypal inheritance is in play. So, use

     <input type="text" ng-model="someObj.prop1"> rather than

     <input type="text" ng-model="prop1">.

     If you really want/need to use a primitive, there are two workarounds:

     1.Use $parent.parentScopeProperty in the child scope. This will prevent the child scope
      from creating its own property.

     2.Define a function on the parent scope, and call it from the child, passing the primitive
      value up to the parent (not always possible)

       more Infomation click :https://github.com/angular/angular.js/wiki/Understanding-Scopes */

        //那么那些指令会产生新的child Scope呢？
    //大致有：ng-include, ng-switch, ng-repeat,ng-view, ng-controller, directives(自定义)

    // the example below illuminate Javascript Prototype Inheritance.

    function ParentScope(){
        this.aString = "parent string";
        this.aNumber = 100;
        this.anArray = [10,20,30];
        this.anObject = {'property1': 'parent prop1', 'property2': 'parent prop2' };
        this.aFunction = function(){ console.log('parent output'); }
    }

    function ChildScope(){
    }


    ChildScope.prototype = new ParentScope();

    var childScope = new ChildScope();

    //#########################1
    console.log( "####################### Example 1" );

    console.log( childScope.aString );   //not in child, prototype chain followed... parent's property found.

    childScope.aString = 'child string'; //when doing a primitive like this, it creates a new property on child object (vs if thought it would update the parent object's aString property)
    console.log( childScope.aString );


    //#########################2
    console.log( "####################### Example 2" );
    console.log( childScope.anArray[1] ); //updates the parent object's property
    console.log( childScope.anObject.property1 );//updates the parent object's property
    childScope.anArray[1] = 22;
    childScope.anObject.property1 = 'child prop1';
    console.log( childScope.anArray[1] );
    console.log( childScope.anObject.property1 );



    //#########################3
    console.log( "####################### Example 3" );
    console.dir( childScope.anArray );
    console.dir( childScope.anObject );
    childScope.anArray = [100, 555]; //creates a new object on child object
    childScope.anObject = { name: 'Mark', country: 'USA' };
    console.dir( childScope.anArray );
    console.dir( childScope.anObject );


    //#########################4
    console.log( "####################### Example 4" );
    delete childScope.anArray; //child's property deleted, parent's property still remains and 'shines' through though
    console.log(childScope.anArray[1] === 22);  // true, parent's property looked at



    //as follows:illuminate the Angular Scope Inheritance.

    /*The contenders:

        The following create new scopes, and inherit prototypically: ng-repeat, ng-include, ng-switch,
         ng-view, ng-controller, directive with scope: true, directive with transclude: true.


        The following creates a new scope which does not inherit prototypically: directive with
        scope: { ... }. This creates an "isolate" scope instead.


    Note, by default, directives do not create new scope -- i.e., the default is scope: false.
*/

    //ng-include ,ng-switch

    //ng-switch scope inheritance works just like ng-include. So if you need 2-way data binding to
    // a primitive in the parent scope, use $parent, or change the model to be an object and then
    // bind to a property of that object. This will avoid child scope hiding/shadowing of parent
    // scope properties.


    //ng-repeat

    //Ng-repeat works a little differently. Suppose we have in our controller:

    $scope.myArrayOfPrimitives = [ 11, 22 ];
    $scope.myArrayOfObjects    = [{num: 101}, {num: 202}]

    //And in our HTML:

       /* <ul><li ng-repeat="num in myArrayOfPrimitives">
        <input ng-model="num"></input>
        </li>
        </ul>
        <ul><li ng-repeat="obj in myArrayOfObjects">
        <input ng-model="obj.num"></input>
        </li>
        </ul>*/

    //It is possible to get ngRepeat to iterate over the properties of an object using the following syntax:


    //<div ng-repeat="(key, value) in myObj"> ... </div>
    //However, there are a limitations compared to array iteration:
    //The JavaScript specification does not define the order of keys returned for an object, so Angular
    // relies on the order returned by the browser when running for key in myObj.

    //Browsers generally follow the strategy of providing keys in the order in which they were
    // defined, although there are exceptions when keys are deleted and reinstated.

    //ngRepeat will silently ignore object keys starting with $, because it's a prefix used by Angular for
    // public ($) and private ($$) properties.

    //If you are hitting any of these limitations, the recommended workaround is to convert your
    // object into an array that is sorted into the order that you prefer before providing it to
    // ngRepeat. You could do this with a filter such as toArrayFilter or implement a $watch on the
    // object yourself.


    //ngRepeat uses $watchCollection to detect changes in the collection. When a change happens, ngRepeat
    // then makes the corresponding changes to the DOM:

   /*   When an item is added, a new instance of the template is added to the DOM.
        When an item is removed, its template instance is removed from the DOM.
        When items are reordered, their respective templates are reordered in the DOM.
*/

    //the paragraph below is very important.
    /*The default tracking function (which tracks items by their identity) does not allow duplicate items
    in arrays. This is because when there are duplicates, it is not possible to maintain a one-to-one
    mapping between collection items and DOM elements.*/


    //If you do need to repeat duplicate items, you can substitute the default tracking behavior with
    // your own using the track by expression.

    //For example, you may track items by the index of each item in the collection, using the special
    // scope property $index:


    //<div ng-repeat="n in [42, 42, 43, 43] track by $index">
    //{{n}}
    //</div>

    // Note:track by must always be the last expression:

    //the paragraph below help to use the directive 'ng-repeat-start' and 'ng-repeat-end'.

   /*       <header ng-repeat-start="item in items">
            Header {{ item }}
            </header>
            <div class="body">
                Body {{ item }}
            </div>
            <footer ng-repeat-end>
            Footer {{ item }}
            </footer>
*/

    //And with an input of ['A','B'] for the items variable in the example above, the output will
    // evaluate to:（as follows:）

     /*   <header>
        Header A
        </header>
        <div class="body">
            Body A
        </div>
        <footer>
        Footer A
        </footer>
        <header>
        Header B
        </header>
        <div class="body">
            Body B
        </div>
        <footer>
        Footer B
        </footer>*/


    //actually,

})();
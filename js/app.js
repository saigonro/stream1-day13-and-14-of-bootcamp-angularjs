angular.module("todoApp", ["ngRoute", "RouteControllers", "UserService", "TodoService"]);

angular.module("todoApp").config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider.when("/", {
        templateUrl: "templates/home.html",
        controller: "DessertController"
    })
    
    .when("/about", {
        templateUrl: "templates/about.html"
    })
    .when("/contact", {
        templateUrl: "templates/contact.html"
    })
    .when("/add", {
        templateUrl: "templates/add.html",
        controller: "DessertController"
    })
    .when("/accounts/register", {
        templateUrl: "templates/register.html",
        controller: "RegisterController"
    })
    .when("/todo", {
        templateUrl: "templates/todo.html",
        controller: "TodoController"
    })
    .when("/todo/edit/:id", {
        templateUrl: "templates/edit-todo.html",
        controller: "EditTodoController"
    });
});
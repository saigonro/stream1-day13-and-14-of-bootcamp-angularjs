
angular.module("RouteControllers", [])
    .controller("DessertController", function($scope, $location) {
        $scope.title = "Welcome to AngularJS";
        if (localStorage.getItem("username")) {
            $scope.loggedInUser = localStorage.getItem("username");
        }
        else {
            $scope.loggedInUser = "Not logged in yet!";
        }
        $scope.favouriteDessert = "chocolate lava puddings";
        $scope.desserts = [
            {name: "Trifle", description: "Grandma's fav"},
            {name: "Cheesecake", description: "Hopefully lemon"},
            {name: "Third cake", description: "Description of the third object"},
            {name: "Fourth cake", description: "Description of the fourth object"}
            ];
            
            $scope.dessert = {name: "", description: ""};
            
            $scope.save = function() {
                $scope.desserts.push($scope.dessert);
                $location.path("/");
            }
    })
    
    .controller("RegisterController", function($scope, UserAPIService) {
        
        $scope.registrationUser = {};
        let URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.login = function() {
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                localStorage.setItem("username", $scope.registrationUser.username);
                localStorage.setItem("authToken", $scope.token);
            }).catch(function(err) {
                console.log(err);
            })
        }
        
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
                
                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered. Go you!!!");
                    $scope.login();
                }).catch(function(err) {
                    alert("Oh no! There was an error. Better check the console.");
                    console.log(err);
                });
            }
        }
    })
    
    .controller("TodoController", function($scope, $location, TodoAPIService) {
        let URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = localStorage.getItem("authToken");
        $scope.username = localStorage.getItem("username");
        
        $scope.todos = [];
        
        TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data || [];
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });
        
        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        }
        
        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.authToken).then(function(results) {
                console.log(results);
                alert("Item deleted successfully.");
            }).catch(function(err) {
                console.log(err);
            })
        }
        
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);
                
                
                TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results);
                }).catch(function(err) {
                    console.log(err);
                });
            }
        }
        
    })
    
    .controller("EditTodoController", function($scope, $location, $routeParams, TodoAPIService) {
        let id = $routeParams.id;
        let URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = localStorage.getItem("authToken");
        $scope.username = localStorage.getItem("username");
        
        TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        })
        
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                
                TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, $scope.authToken).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }
        
    })
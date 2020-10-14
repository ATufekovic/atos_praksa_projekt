var app = angular.module("chatApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "login.html",
            controller : "loginCtrl"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller : "loginCtrl"
        })
        .when("/register", {
            templateUrl : "register.html",
            controller : "registerCtrl"
        })
        .when("/chat", {
            templateUrl : "chat.html",
            controller : "chatCtrl"
        });
    
});
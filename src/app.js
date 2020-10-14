var app = angular.module("chatApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller : "loginCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller : "loginCtrl"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller : "registerCtrl"
        })
        .when("/chat", {
            templateUrl : "views/chat.html",
            controller : "chatCtrl"
        });
    
});
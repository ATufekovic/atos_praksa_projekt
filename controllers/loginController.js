angular.module("chatApp").controller("loginCtrl", function($scope, usernameStorage, $location, $http) {
    

    $scope.login = function() {
        //$scope.users = [];
        usernameStorage.setUsername($scope.username);
        usernameStorage.setPassword($scope.password);
        $location.path("chat");
    };

    /* function _getUsers() {//big nono
        $http({
            method : 'GET',
            url : 'ovdje_ide_url'
        }).then(function successCallback(response) {
            $scope.users = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }; */


    //funkcijaZaUsporedivanjeLoginaSUserima


    
});
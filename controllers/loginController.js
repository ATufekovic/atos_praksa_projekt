angular.module("chatApp").controller("loginCtrl", function($scope, usernameStorage, $location) {
    $scope.login = function() {
        usernameStorage.setName($scope.username);
        $location.path("chat");
    }
    //TODO: proper logic
});
angular.module("chatApp").controller("chatCtrl", function($scope, usernameStorage) {
    $scope.username = usernameStorage.getName();
    //TODO: proper logic
});
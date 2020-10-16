angular.module("chatApp").controller("chatCtrl", function($scope, usernameStorage) {
    //$scope.username = usernameStorage.getName();
    $scope.chatText=false;
    $scope.slikaChange=function(){
        $scope.chatText=true;
    }

});
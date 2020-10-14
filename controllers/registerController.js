angular.module("chatApp").controller("registerCtrl", function($scope) {
    $scope.login = function() {
        if($scope.password == $scope.passwordConfirm){
            $scope.username += $scope.email;
        }
        //TODO: proper logic
    }
});
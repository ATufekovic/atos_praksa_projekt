angular.module("chatApp").controller("registerCtrl", function($scope, $http) {
    $scope.$watch('username',function() {$scope.test();});
    $scope.$watch('email',function() {$scope.test();});
    $scope.$watch('password',function() {$scope.test();});
    $scope.$watch('passwordConfirm',function() {$scope.test();});
    

    $scope.register = function() {
        $scope.users = [];
        $scope.userForm = {
            username : $scope.username,
            password : $scope.password,
            email : $scope.email
        };
    }
    $scope.submitUser = function() {
         
        var method = "POST";
        var url = "ovdje_ide_url";
       
        $http({
            method : method,
            url : url,
            data : angular.toJson($scope.userForm),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( _success, _error );
        }

        function _success(response) {
            _refreshUserData();
            _clearFormData()
        }
 
        function _error(response) {
            console.log(response.statusText);
        }

        function _refreshUsersData() {
            $http({
                method : 'GET',
                url : 'ovdje_ide_url'
            }).then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log(response.statusText);
            });
        }

        function _clearFormData() {
            $scope.userForm.username = "";
            $scope.userForm.password = "";
            $scope.userForm.email = "";
        }

        $scope.test = function() {
            if ($scope.password !== $scope.passwordConfirm) {
              $scope.error = true;
            } 
            else {
              $scope.error = false;
            }
        }


    
});
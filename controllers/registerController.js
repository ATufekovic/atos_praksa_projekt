angular.module("chatApp").controller("registerCtrl", function($scope, $http) {
    $scope.$watch('username',function() {$scope.test();});
    $scope.$watch('email',function() {$scope.test();});
    $scope.$watch('password',function() {$scope.test();});
    $scope.$watch('passwordConfirm',function() {$scope.test();});
    

    $scope.register = function() {
        /*$scope.users = [];
        $scope.userForm = {
            username : $scope.username,
            password : $scope.password,
            email : $scope.email
        };*/
        if(usernameIsValid($scope.username) && passwordIsValid($scope.password) && emailIsValid($scope.email)) $scope.username="dsa";
        
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
            if(usernameIsValid($scope.username)) $scope.usernameWrongInput=false;
            else $scope.usernameWrongInput=true;
            if(passwordIsValid($scope.password)) $scope.passwordWrongInput=false;
            else $scope.passwordWrongInput=true;
            if(emailIsValid($scope.email)) $scope.emailWrongInput=false;
            else $scope.emailWrongInput=true;
        }

        function usernameIsValid(username) {
            var testUsername=username;
            return /^(?=.{8,50}$)[a-zA-Z]([_.-]?[a-zA-Z0-9])*$/.test(username);
        }

        function passwordIsValid(password){
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/.test(password);
        }

        function emailIsValid(email){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
    
});
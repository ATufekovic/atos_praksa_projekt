angular.module("chatApp").controller("chatCtrl", function($scope, usernameStorage) {

    $scope.username = usernameStorage.getUsername();
    $scope.profileUsername = $scope.username;

    $scope.chosenUsername = "null";//TODO: change
    $scope.chosenUsername = usernameStorage.getPassword();

    $scope.chatText=false;

    $scope.profileChange=function(){
        $scope.chatText=true;
    }

    
    var ws = new WebSocket("ws://127.0.0.1:5673/ws");
    var client = Stomp.over(ws);

    var on_connect = function(){
        id = client.subscribe("/topic/" + $scope.chosenUsername + "-" + $scope.profileUsername, function(m){
            if($scope.chatHistory == undefined){
                $scope.chatHistory = m.body + "\n";
            } else{
                $scope.chatHistory += m.body + "\n";
            }

            $scope.$apply();//refresh MVC to display data properly, otherwise it would lag for one message
        });
    }

    var on_error = function(d){
        $scope.chatHistory = "Error on connecting!\n" + d;
        console.log(d);
    }

    client.connect("ChatAppHost", "ChatAppHost", on_connect, on_error, "cah");

    $scope.send = function(){
        var message = $scope.inputText;
        if(message == undefined){
            return;
        }
        client.send("/topic/" + $scope.profileUsername + "-" + $scope.chosenUsername, {"content-type":"text/plain"}, message);
        $scope.inputText = "";
        //TODO: set up exchange somewhere
    }

});


angular.module("chatApp").controller("chatCtrl", function($scope, usernameStorage) {
    //$scope.username = usernameStorage.getName();
    $scope.chatText=false;
    $scope.slikaChange=function(){
        $scope.chatText=true;
    }

    
    var ws = new WebSocket("ws://127.0.0.1:15674/ws");
    var client = Stomp.over(ws);

    var on_connect = function(){
        id = client.subscribe("/topic/test", function(m){
            if($scope.chatHistory == undefined){
                $scope.chatHistory = m.body + "\n";
            } else{
                $scope.chatHistory += m.body + "\n";
            }

            $scope.$apply();
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
        client.send("/topic/test", {"content-type":"text/plain"}, message);
        $scope.inputText = "";
        //TODO: set up exchange somewhere
    }

});


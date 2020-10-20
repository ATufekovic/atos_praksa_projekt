angular.module("chatApp").controller("chatCtrl", function($scope, usernameStorage) {
    $scope.username = usernameStorage.getUsername();
    $scope.profileUsername = $scope.username;

    $scope.users = [
        {username : "test1", email : "email1"},
        {username : "test2", email : "email2"}
    ];

    $scope.chosenUsername = "null";//TODO: change a lot of things
    $scope.chosenUsername = usernameStorage.getPassword();

    $scope.chatText=false;

    $scope.profileChange=function(chosen="default"){
        $scope.chosenUsername = chosen;
        $scope.chatText=true;
        $scope.initClient();
    };

    $scope.initClient = function(){
        var ws = new WebSocket("ws://127.0.0.1:15674/ws");//15674 is the WebStomp port
        var client = Stomp.over(ws);
    
        var on_connect = function(){
            id = client.subscribe("/topic/" + $scope.chosenUsername + "-" + $scope.profileUsername, function(m){
                if($scope.chatHistory == undefined){
                    $scope.chatHistory = $scope.chosenUsername + ": "+ m.body + "\n";
                } else{
                    $scope.chatHistory += $scope.chosenUsername + ": "+ m.body + "\n";
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
    
            if($scope.chatHistory == undefined){
                $scope.chatHistory = ">>" + message + "\n";
            } else{
                $scope.chatHistory += ">>" + message + "\n";
            }
            //TODO: set up exchange somewhere
        }
    };
});


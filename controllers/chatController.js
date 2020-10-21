angular.module("chatApp").controller("chatCtrl", function ($scope, usernameStorage) {
    $scope.username = usernameStorage.getUsername();
    //TODO: change a lot of things
    $scope.chosenUsername = usernameStorage.getPassword();

    $scope.ws = undefined;
    $scope.client = undefined;

    $scope.isFirstTime = true;
    $scope.isConnected = false;

    $scope.users = [
        { username: "test1", email: "email1@ma.il" },
        { username: "test2", email: "email2@ma.il" }
    ];

    $scope.chatText = false;

    $scope.profileChange = function (chosen = "default") {
        $scope.chosenUsername = chosen;
        $scope.chatText = true;
        $scope.initClient();
    };


    $scope.initClient = function () {
        if ($scope.isFirstTime) {
            $scope.ws = new WebSocket("ws://127.0.0.1:15674/ws");//15674 is the WebStomp port
            $scope.client = Stomp.over($scope.ws);
            $scope.isFirstTime = false;
            $scope.connectClient();
        } else {
            $scope.connectClient();
        }
    };

    $scope.connectClient = function () {
        var on_connect = function () {
            subscribeClient();
        };
        var subscribeClient = function(){
            $scope.id = $scope.client.subscribe("/topic/" + $scope.chosenUsername + "-" + $scope.profileUsername, function (m) {
                if ($scope.chatHistory == undefined) {
                    $scope.chatHistory = "[" + $scope.chosenUsername + "]: " + m.body + "\n";
                } else {
                    $scope.chatHistory += "[" + $scope.chosenUsername + "]: " + m.body + "\n";
                }

                $scope.$apply();//refresh MVC to display data properly, otherwise it would lag for one message
            });
        }

        var on_error = function (d) {
            //$scope.chatHistory = "Error on connecting!\n" + d;
            console.log(d);
        };

        if ($scope.isConnected) {
            $scope.id.unsubscribe();
            subscribeClient();
        } else {
            $scope.client.connect("ChatAppHost", "ChatAppHost", on_connect, on_error, "cah");
        }
        $scope.isConnected = true;//make sure that it wont try to reconnect to the MQ

        $scope.send = function () {
            var message = $scope.inputText;
            if (message == undefined || message == "") {
                return;
            }
            $scope.client.send("/topic/" + $scope.profileUsername + "-" + $scope.chosenUsername, { "content-type": "text/plain" }, message);
            $scope.inputText = "";

            if ($scope.chatHistory == undefined) {
                $scope.chatHistory = ">>" + message + "\n";
            } else {
                $scope.chatHistory += ">>" + message + "\n";
            }
            //TODO: set up exchange somewhere
        };
    };
});


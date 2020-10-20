angular.module("chatApp").service("usernameStorage", function(){
    this.username = "";
    this.password = "";

    this.getUsername = function() {
        //console.log("Username called: " + this.username);
        return this.username;
    }
    this.setUsername = function(newName) {
        this.username = newName;
        //console.log("username saved: " + this.username);
        return;
    }

    this.getPassword = function(){
        return this.password;
    }
    this.setPassword = function(newPassword){
        this.password = newPassword;
        return;
    }
});

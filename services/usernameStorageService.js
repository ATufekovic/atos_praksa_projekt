angular.module("chatApp").service("usernameStorage", function(){
    this.username = "default";
    this.password = "default";

    this.getUsername = function() {
        //console.log("Username called: " + this.username);
        return this.username;
    }
    this.setUsername = function(newName) {
        this.username = newName;
        //console.log("username saved: " + this.username);
        return;
    }

    //TODO: secure password storage, hashed?
    this.getPassword = function(){
        return this.password;
    }
    this.setPassword = function(newPassword){
        this.password = newPassword;
        return;
    }
});

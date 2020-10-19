angular.module("chatApp").service("usernameStorage", function(){
    this.username = "";

    this.getUsername = function() {
        return this.username;
    }
    this.setUsername = function(newName) {
        this.username = newName;
        return;
    }
});

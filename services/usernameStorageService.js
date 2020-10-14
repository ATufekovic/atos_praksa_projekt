angular.module("chatApp").service("usernameStorage", function(){
    this.username = "";

    this.getName = function() {
        return this.username;
    }
    this.setName = function(newName) {
        this.username = newName;
        return;
    }
});

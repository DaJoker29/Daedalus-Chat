/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */
$(function() {
    var fbLogin = function () {
        var ref = new Firebase('https://glaring-torch-2044.firebaseio.com');

        ref.authWithOAuthRedirect('google', function (error, authData) {
            if(error) {
                console.log('Login Failed.', error);
            } else {
                console.log('Authenticated successfully:', authData);
            }
        });
    };

    $('#fbLogin').on('click', function() {
        fbLogin();
    });
});
/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */
$(function() {
    var ref = new Firebase('https://glaring-torch-2044.firebaseio.com');
    var scope = angular.element($('#messages')).scope();

    var setName = function ( authData ) {
        scope.$apply(function() {
            if(!authData) {
                scope.nick = 'Guest ' + Math.floor((Math.random() * 10000) + 1);
            } else if(authData.google) {
                scope.nick = authData.google.displayName;
            }
        });
    };

    var setURL = function ( authData ) {
        scope.$apply(function() {
            if(!authData) {
                scope.url = 'http://placehold.it/100x100';
            } else if (authData.google) {
                scope.url = authData.google.profileImageURL;
            }
        });
    };
    var setProvider = function ( authData ) {
        scope.$apply(function() {
            if(!authData) {
                scope.provider = null;
            } else if (authData.google) {
                scope.provider = authData.provider;
            }
        });
    };

    $('#google').click(function() {
        ref.authWithOAuthPopup('google', function (error, authData) {
            if(error) {
                console.log('Login Failed.', error);
            } else {
                console.log('Successful Authentication:', authData);
            }
        });
    });

    $('#logout').click(function() {
        ref.unauth();
    });

    ref.onAuth(function() {
        var authData = ref.getAuth();
        setName( authData );
        setURL( authData );
        setProvider ( authData );

        if (authData) {
            console.log(authData.uid + ' is logged in with ' + authData.provider);
            $('#unauthenticated').hide();
            $('#authenticated').removeClass('hide');
        } else {
            $('#unauthenticated').show();
            $('#authenticated').addClass('hide');
        }
    });
});
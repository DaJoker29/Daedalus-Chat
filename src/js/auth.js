/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */
$(function() {
    var ref = new Firebase('https://glaring-torch-2044.firebaseio.com');
    var scope = angular.element($('#messages')).scope();

    var setName = function ( authData ) {
        scope.$apply(function() {
             scope.nick = (authData) ? authData[authData.provider].displayName : 'Guest ' + Math.floor((Math.random() * 10000) + 1);
        });
    };

    var setURL = function ( authData ) {
        scope.$apply(function() {
            scope.url = (authData) ? authData[authData.provider].profileImageURL : 'http://placehold.it/100x100';
        });
    };
    var setProvider = function ( authData ) {
        scope.$apply(function() {
            scope.provider = (authData) ? authData.provider : null;
        });
    };

    var authCallback = function ( error, authData ) {
        if(error) {
            console.log('Login Failed.', error);
        } else {
            console.log('Successful Authentication:', authData);
        }
    };

    $('#google').click(function() {
        ref.authWithOAuthPopup('google', authCallback);
    });

    $('#twitter').click(function() {
        ref.authWithOAuthPopup('twitter', authCallback);
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
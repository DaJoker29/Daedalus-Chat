/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */
$(function() {
    var ref = new Firebase('https://glaring-torch-2044.firebaseio.com');
    var scope = angular.element($('#messages')).scope();

    var setContext = function ( authData ) {
        if( authData ) {
            scope.$apply(function() {
                scope.nick = authData[authData.provider].displayName;
                scope.url = authData[authData.provider].profileImageURL;
                scope.provider = authData.provider;
            });                        
        }  else {
            scope.$apply(function() {
                scope.nick = 'Guest ' + Math.floor((Math.random() * 10000) + 1);
                scope.url = 'http://placehold.it/100x100';
                scope.provider = null;
            });
        }
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

    $('#github').click(function() {
        ref.authWithOAuthPopup('github', authCallback);
    });

    $('#logout').click(function() {
        ref.unauth();
    });

    ref.onAuth(function() {
        setContext( ref.getAuth() );
    });
});
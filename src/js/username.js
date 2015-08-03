/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */
// $(function() {
//     var username;
//     var input = $('#nickname');
//     var btn = $('#nicknameBtn');
//     var form = $('#nicknames');

//     var generateUsername = function () {
//         return 'Guest' + Math.floor(Math.random() * 100000) + 1;
//     };

//     var set = function ( str ) {
//         username = window.localStorage.HermesName = str;
//     };

//     var display = function() {
//         input.val( username );
//     };

//     // Check if username exists
//     if(window.localStorage.HermesName) {
//         username = window.localStorage.HermesName;
//     } else {
//         set( generateUsername() );
//     }
//     display();

//     // Listen for change
//     $('#nicknames').submit( function ( e ) {
//         var value = e.target.value;

//         console.log(e);
//         if( value !== username ) {
//             set( value );
//         }
//     });
// })();
// 
var Hermes = angular.module ('Hermes', ['ngStorage', 'firebase']);

Hermes.controller('Ctrl', function ($scope, $localStorage, $firebaseArray) {

    /* Username Code */
    $scope.$storage = $localStorage;

    if($localStorage.HermesName) {
        $scope.nickname = $localStorage.HermesName;
    } else {
        $scope.nickname = $localStorage.HermesName = 'Guest' + (Math.floor(Math.random() * 10000) + 1);
    }

    /* Messaging Code */

    var ref = new Firebase('https://glaring-torch-2044.firebaseio.com/messages');

    $scope.messages = $firebaseArray(ref);

    $scope.addMessage = function() {
        $scope.messages.$add({
            nick: $scope.nickname,
            message: $scope.messageText
        });

        $scope.messsageText = '';
        $('#message').val('');
    };
});
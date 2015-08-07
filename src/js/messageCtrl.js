/*
    Message module

    Handles messaging and stuff
 */
angular
    .module('Hermes')
    .controller('MessageCtrl', function ( $scope, $firebaseArray ) {
        var ref = new Firebase('https://glaring-torch-2044.firebaseio.com/messages');

        $scope.messages = $firebaseArray(ref.orderByChild('timestamp').limitToLast(7) );

        $scope.addMessage = function() {

            if($scope.messageText === '') {
                return;
            } else {
                $scope.messages.$add({
                    nick: $scope.nick,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                    message: $scope.messageText
                });

                $scope.messageText = '';
                $('#message').val('');
                var el = document.querySelector('.messages');
                el.scrollTop = el.scrollHeight;
            }
        };
    });
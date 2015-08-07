angular
    .module('Hermes', [
        'ngStorage', 
        'firebase'
    ])
    .controller('MessageCtrl', ['$scope', '$firebaseArray', function ( $scope, $firebaseArray ) {
        var ref = new Firebase('https://glaring-torch-2044.firebaseio.com/messages');

        $scope.messages = $firebaseArray(ref.orderByChild('timestamp').limitToLast(7) );

        $scope.addMessage = function() {

            if($scope.messageText === '') {
                return;
            } else {
                $scope.messages.$add({
                    nick: $scope.nick,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                    message: $scope.messageText,
                    url: $scope.url
                });

                $scope.messageText = '';
                $('#message').val('');
                var el = document.querySelector('.messages');
                el.scrollTop = el.scrollHeight;
            }
        };
    }])
    .filter('capitalize', function() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            }) : '';
        };
    });
/*
    Username module.
    Function: Checks to see if there is a username saved locally. If so, it applies it. Otherwise, it generates a random one and applies that.

 */

angular
    .module('Hermes')
    .controller('UserCtrl', function ($scope, $rootScope, $localStorage) {

    /* Username Code */
    $scope.$storage = $localStorage;

    if($localStorage.HermesName) {
        $rootScope.nickname = $localStorage.HermesName;
    } else {
        $rootScope.nickname = $localStorage.HermesName = 'Guest' + (Math.floor(Math.random() * 10000) + 1);
    }


});

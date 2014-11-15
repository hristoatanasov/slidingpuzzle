spApp.controller('BoardController', ['$scope', 'spGame', function($scope, spGame) {
   $scope.boardItems = spGame.boardItems;
}]);
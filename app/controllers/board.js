spApp.controller('BoardController', ['$scope', 'spGame', function($scope, spGame) {
   $scope.focusTheBoard = true;

   $scope.boardItems = spGame.boardItems;
   
   $scope.swipeLeft = function () {
      spGame.SlideLeft($scope.boardItems);
   }
   
   $scope.swipeRight = function () {
      spGame.SlideRight($scope.boardItems);
   }
   
   $scope.swipeUp = function () {
      spGame.SlideUp($scope.boardItems);
   }
   
   $scope.swipeDown = function () {
      spGame.SlideDown($scope.boardItems);
   }
   
   $scope.keyPress = function(e) {
      if (e.keyCode == 38)
        $scope.swipeUp();
       else if (e.keyCode == 39)
           $scope.swipeRight();
       else if (e.keyCode == 40)
           $scope.swipeDown();
       else if (e.keyCode == 37)
           $scope.swipeLeft();
   }
}]);
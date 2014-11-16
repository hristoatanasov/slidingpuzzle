spApp.directive('boardItem', ['$animate', 'spGame', function ($animate, spGame) {
   return {
      scope: {
           boardItemInfo: '=',
           boardItems: '='
      },
      
      link: function (scope, elem, attrs) {
         elem.bind('click', function () {    
            if(!scope.boardItemInfo.canMove) {         
               $animate.addClass(elem, "shake", function () {
                  elem.removeClass("shake");
               });
            }
            else {
               spGame.SlideItem(scope.boardItemInfo.number, scope.boardItems);
               scope.$apply();
            }
         });
      }
   };
}]);

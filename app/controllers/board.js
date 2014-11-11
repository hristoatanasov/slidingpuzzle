spApp.controller('BoardController', ['$scope', function($scope) {
   $scope.numbers =  getRandomBoardNumbers();
   
   function getRandomBoardNumbers() {
      var randomBoardNumbers = [];
   
      var allAvailableNumbers = [];
      for (var i = 0; i < 16; i++) {
         allAvailableNumbers.push(i + 1);
      }
      
      allAvailableNumbers[Math.floor(Math.random() * allAvailableNumbers.length)] = null;
   
      while (allAvailableNumbers.length > 0) {
         var rowNumbers = [];
         
         while (rowNumbers.length < 4) {
            var randIndex = Math.floor(Math.random() * allAvailableNumbers.length);
            rowNumbers.push(allAvailableNumbers[randIndex]);
            allAvailableNumbers.splice(randIndex, 1);
         }
         
         randomBoardNumbers.push(rowNumbers);
      }
      
      return randomBoardNumbers;
   }
}]);
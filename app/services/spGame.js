spApp.factory('spGame', function(){
  var canItemMove = function (rowIdx, colIdx, numbers) {
      var canMove = false;
      
      if ((validIdx(rowIdx-1, colIdx-1, numbers) && numbers[rowIdx-1][colIdx-1] == null) ||
          (validIdx(rowIdx-1, colIdx, numbers) && numbers[rowIdx-1][colIdx] == null) || 
          (validIdx(rowIdx-1, colIdx+1, numbers) && numbers[rowIdx-1][colIdx+1] == null) ||
          (validIdx(rowIdx, colIdx-1, numbers) && numbers[rowIdx][colIdx-1] == null) ||
          (validIdx(rowIdx, colIdx, numbers) && numbers[rowIdx][colIdx] == null) || 
          (validIdx(rowIdx, colIdx+1, numbers) && numbers[rowIdx][colIdx+1] == null) ||
          (validIdx(rowIdx+1, colIdx-1, numbers) && numbers[rowIdx+1][colIdx-1] == null) ||
          (validIdx(rowIdx+1, colIdx, numbers) && numbers[rowIdx+1][colIdx] == null) || 
          (validIdx(rowIdx+1, colIdx+1, numbers) && numbers[rowIdx+1][colIdx+1] == null)
         )
         canMove = true;
      
      return canMove;
      
      function validIdx (rowIdx, colIdx, numbers) {
         var isValid = true;
         
         if (rowIdx < 0 ||
             rowIdx > 3 ||
             colIdx < 0 ||
             colIdx > 3) 
            isValid = false;
         
         return isValid;
      }
   }
   
   var getRandomBoardNumbers = function() {
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
   
   function BoardItem () {
      this.number = 0;
      this.canMove = false;
   }
   
   //----------------------
   
   var spg = {};
   spg.boardItems = [];
   
   var numbers = getRandomBoardNumbers();
   
   for (var rowIdx = 0; rowIdx < numbers.length; rowIdx++) {
      var rowItems = []
   
      for (var colIdx = 0; colIdx < numbers[rowIdx].length; colIdx++) {
         var number = numbers[rowIdx][colIdx];
         
         var boardItem = new BoardItem();
         boardItem.number = number;
         boardItem.canMove = number != null && canItemMove(rowIdx, colIdx, numbers);
         
         rowItems.push(boardItem);
      }
      
      spg.boardItems.push(rowItems);
   }
   
   return spg;
});
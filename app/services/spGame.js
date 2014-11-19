spApp.factory('spGame', function(){
  var canItemMove = function (rowIdx, colIdx) {
      var canMove = false;
      
      if ((validIdx(rowIdx-1, colIdx) && spg.boardItems[rowIdx-1][colIdx].number == null) || 
          (validIdx(rowIdx, colIdx-1) && spg.boardItems[rowIdx][colIdx-1].number == null) ||
          (validIdx(rowIdx, colIdx) && spg.boardItems[rowIdx][colIdx].number == null) || 
          (validIdx(rowIdx, colIdx+1) && spg.boardItems[rowIdx][colIdx+1].number == null) ||
          (validIdx(rowIdx+1, colIdx) && spg.boardItems[rowIdx+1][colIdx].number == null)
         )
         canMove = true;
      
      return canMove;
      
      function validIdx (rowIdx, colIdx) {
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
      
      allAvailableNumbers[allAvailableNumbers.length - 1] = null;
   
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
   
   function refreshCanMoveInfo() {
      for (var rowIdx = 0; rowIdx < spg.boardItems.length; rowIdx++) {
         for (var colIdx = 0; colIdx < spg.boardItems[rowIdx].length; colIdx++) {
            var boardItem = spg.boardItems[rowIdx][colIdx];
            boardItem.canMove = boardItem.number != null && canItemMove(rowIdx, colIdx);
         }
      }
   }
   
   function getEmptyItemCoordinates(arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      for(var r = 0; r < arr.length; r++) {
         for(var c = 0; c < arr.length; c++) {
            if(arr[r][c].number == null) {
               emptyRowIdx = r;
               emptyColIdx = c;
            }
         }
      }
      
      return {
         row: emptyRowIdx,
         col: emptyColIdx
      }
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
         
         rowItems.push(boardItem);
      }
      
      spg.boardItems.push(rowItems);
   }
   
   refreshCanMoveInfo();
   
   
   spg.SlideItem = function (number, arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      var numRowIdx = -1;
      var numColIdx = -1;
      
      spg.boardItems = arr;
      
      for(var r = 0; r < spg.boardItems.length; r++) {
         for(var c = 0; c < spg.boardItems.length; c++) {
            if(spg.boardItems[r][c].number == null) {
               emptyRowIdx = r;
               emptyColIdx = c;
            } else if(spg.boardItems[r][c].number == number) {
               numRowIdx = r;
               numColIdx = c;
            }
         }
      }
      
      var tmpBoardItem = spg.boardItems[emptyRowIdx][emptyColIdx];
      spg.boardItems[emptyRowIdx][emptyColIdx] = spg.boardItems[numRowIdx][numColIdx];
      spg.boardItems[numRowIdx][numColIdx] = tmpBoardItem;
      
      refreshCanMoveInfo();
   }
   
   spg.SlideLeft = function (arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      spg.boardItems = arr;
      
      var emptyItemCoordinates = getEmptyItemCoordinates(arr);
      emptyRowIdx = emptyItemCoordinates.row;
      emptyColIdx = emptyItemCoordinates.col;
      
      if (emptyColIdx == 0)
         return;
      
      var tmpBoardItem = spg.boardItems[emptyRowIdx][emptyColIdx];
      spg.boardItems[emptyRowIdx][emptyColIdx] = spg.boardItems[emptyRowIdx][emptyColIdx - 1];
      spg.boardItems[emptyRowIdx][emptyColIdx - 1] = tmpBoardItem;
      
      refreshCanMoveInfo();
   }
   
   spg.SlideRight = function (arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      spg.boardItems = arr;
      
      var emptyItemCoordinates = getEmptyItemCoordinates(arr);
      emptyRowIdx = emptyItemCoordinates.row;
      emptyColIdx = emptyItemCoordinates.col;
      
      if (emptyColIdx == spg.boardItems.length - 1)
         return;
      
      var tmpBoardItem = spg.boardItems[emptyRowIdx][emptyColIdx];
      spg.boardItems[emptyRowIdx][emptyColIdx] = spg.boardItems[emptyRowIdx][emptyColIdx + 1];
      spg.boardItems[emptyRowIdx][emptyColIdx + 1] = tmpBoardItem;
      
      refreshCanMoveInfo();
   }
   
   spg.SlideUp = function (arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      spg.boardItems = arr;
      
      var emptyItemCoordinates = getEmptyItemCoordinates(arr);
      emptyRowIdx = emptyItemCoordinates.row;
      emptyColIdx = emptyItemCoordinates.col;
      
      if (emptyRowIdx == 0)
         return;
      
      var tmpBoardItem = spg.boardItems[emptyRowIdx][emptyColIdx];
      spg.boardItems[emptyRowIdx][emptyColIdx] = spg.boardItems[emptyRowIdx - 1][emptyColIdx];
      spg.boardItems[emptyRowIdx - 1][emptyColIdx] = tmpBoardItem;
      
      refreshCanMoveInfo();
   }
   
   spg.SlideDown = function (arr) {
      var emptyRowIdx = -1;
      var emptyColIdx = -1;
      
      spg.boardItems = arr;
      
      var emptyItemCoordinates = getEmptyItemCoordinates(arr);
      emptyRowIdx = emptyItemCoordinates.row;
      emptyColIdx = emptyItemCoordinates.col;
      
      if (emptyRowIdx == spg.boardItems.length - 1)
         return;
      
      var tmpBoardItem = spg.boardItems[emptyRowIdx][emptyColIdx];
      spg.boardItems[emptyRowIdx][emptyColIdx] = spg.boardItems[emptyRowIdx + 1][emptyColIdx];
      spg.boardItems[emptyRowIdx + 1][emptyColIdx] = tmpBoardItem;
      
      refreshCanMoveInfo();
   }
   
   return spg;
});
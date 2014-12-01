$(document).ready(function(){
   $(window).resize(function(){
       setBoardSize();
   });
   
   setBoardSize();
});

function setBoardSize(){
   var $ww = $(window).width();
   var $wh = $(window).height();

   var $squareside = 0;

   if ($ww > $wh) {
      $squareside = $wh * 0.9;
   } else {
      $squareside = $ww * 0.9;
   }
    
   $('#board').css({
      height: $squareside,
      width: $squareside
   }); 
   
   var $fontsize = Math.round($squareside / 11.8);
   
   $(document.body).css({
      fontSize: $fontsize + "px"
   });
}
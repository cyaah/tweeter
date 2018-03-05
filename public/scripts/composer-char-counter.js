//Function to calculate character counter
$(document).ready(function () {
 $('textarea').keyup( function(event) {
   var text_max = 140;
   var text_length = $(this).val().length;
   var text_remaining = $(".counter").html(text_max - text_length);

   if (text_max - text_length < 0){ // When text counter gets under 0 turns text color changes to red

     text_remaining.css("color", "red");

   }else {

     text_remaining.css("color", "black");

   }
 });
});

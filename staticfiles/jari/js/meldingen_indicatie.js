//var sets the amount of notifications for the indicator badge
var Notification_amount = 3;


// If the notifications have already been seen, remove them from the notification amount
if (sessionStorage.getItem("seen01") != null ){
   Notification_amount = Notification_amount - 1; 
};

if (sessionStorage.getItem("seen02") != null ){
   Notification_amount = Notification_amount - 1; 
};

if (sessionStorage.getItem("seen03") != null ){
   Notification_amount = Notification_amount - 1; 
};
     

// Write the amount of notifications to the indicator badge
$(document).ready(function(){
  $("#badge").show(function(){
        $(this).attr('data-content',Notification_amount);   
        });       

});


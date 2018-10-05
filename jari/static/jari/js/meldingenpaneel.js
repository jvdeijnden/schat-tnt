// sets the content of the 'meldingen' page

//Check if document is ready
$(document).ready(function() {
    
    //Message_1 title
       var title_1 = "Bloeddrukmeter_2:";
    //Message_1 content = content from the text input
       var msg_1 = '<table id="t01" style= "table-layout:fixed", border-collapse: collapse;> <tr> <th rowspan="3"><img src="Bloeddrukmeter.png" style="height:125px; margin-right: 125px"</th> <th width="70%"> <i class="fa fa-battery-quarter"></i> Batterij tag bijna leeg!</th> <td rowspan="2,8"; width="30%"; align="right"><i " id="C01" class="fa fa-circle"></i> </td> <tr><td>maandag 4-6-2018 15:38</td></tr> <tr> <td><a href="Bloeddrukmeter_2.html">Meer info</a>';
    
    //Message_2 title
       var title_2 = "Bladderscan_1:";
    //Message_2 content = content from the text input
       var msg_2 = '<table id="t02" style= "table-layout:fixed", border-collapse: collapse;> <tr> <th rowspan="3"><img src="Bladderscan.png" style="height:125px; margin-right: 125px"</th> <th width="70%"> <i class="fa fa-plus"></i> Voorwerp succesvol toegevoegd!</th> <td rowspan="2,8"; width="30%"; align="right"><i " id="C02" class="fa fa-circle"></i> </td> <tr><td>Vrijdag 1-5-2018 11:00</td></tr> <tr> <td><a href="Bladderscan_1.html">Meer info</a></td> </tr>';
    
     //Message_3 title
       var title_3 = "Tillift_3:";
    //Message_3 content = content from the text input
       var msg_3 = '<table id="t03" style= "table-layout:fixed", border-collapse: collapse;> <tr> <th rowspan="3"><img src="Tillift.png" style="height:125px; margin-right: 125px"</th> <th width="70%"><i class="fa fa-exclamation"></i>  Voorwerp heeft het gebouw verlaten!</th> <td rowspan="2,8"; width="30%"; align="right"><i " id="C03" class="fa fa-circle"></i> </td> <tr><td>maandag 4-6-2018 18:59</td></tr> <tr> <td><a href="Tillift_3.html">Meer info</a></td> </tr>';       
    
    //Message options for messages at the panel
       var options_panel = { 
           
           // No way for the message to click or fade away
           extendedTimeOut: '0',
           timeOut: '0',
           tapToDismiss: false,
           
           //Position of the message
           positionClass: 'toast-top-full-width'
           
       };
    
    
    //Make sticky toastr info messages upon loading the "meldingen" page (warning, success, info and error messages)
   
    if (window.location.href.match('Meldingen.html') != null) {
        
        //messages (bottom one is newest)
        window.onload = toastr.success(msg_2,title_2,options_panel);
        window.onload = toastr.warning(msg_1,title_1,options_panel);
        window.onload = toastr.error(msg_3,title_3,options_panel);
        
    
    };   
    
    //Hide the circle that indicates a new notification if you hover over the notifcations
     
   $("#t01").hover(function(){
        $("#C01").hide();
        sessionStorage.setItem("seen01", "true");
    });
    
    $("#t02").hover(function(){
        $("#C02").hide();
        sessionStorage.setItem("seen02", "true");
    });
    
    $("#t03").hover(function(){
        $("#C03").hide();
        sessionStorage.setItem("seen03", "true");
    });
         

    //If the circle was already hidden once with hovering over it keep hiding it!!!
    if (sessionStorage.getItem("seen01") != null ){
        $("#C01").hide();  
    };
    
    if (sessionStorage.getItem("seen02") != null ){
        $("#C02").hide();  
    };
    
    if (sessionStorage.getItem("seen03") != null ){
        $("#C03").hide();  
    };
    
});        





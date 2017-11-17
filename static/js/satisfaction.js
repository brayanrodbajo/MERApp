var events = [];
var val = document.getElementById("valR").value;
document.getElementById("img-video").src = "/static/images/satisfaction/man1/" + val + ".png";
function showVal(newVal){
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    document.getElementById("img-video").src = "/static/images/satisfaction/man1/"+newVal+ ".png";
    events.push([IDSession, "ChangeSatisfactionFace", newVal, secs]);
}



/****** SEND DATA **********/

function sendData(){
    console.log("sendData()");
    console.log(events);
    $.ajax({
        url: "/events",
        type: "POST",
        data: JSON.stringify({events: events}),
        contentType: "application/json; charset=utf-8",
        success: function(dat) { console.log(dat); }
    });
}
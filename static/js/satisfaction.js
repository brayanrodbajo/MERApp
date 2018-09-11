var events = [];
var images = new Array()
var i;
for (i = 1; i <=60; i++) {
    console.log("for images "+i);
    images[i] = new Image();
    images[i].src = path+i+".png";
}

var val = document.getElementById("valR").value;
document.getElementById("img-video").src = "/static/images/satisfaction/man1/" + val + ".png";
function showVal(newVal){
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    document.getElementById("img-video").src = path+newVal+ ".png";
    console.log("new val with "+newVal);
    events.push([IDSession, "ChangeSatisfactionFace", newVal, secs, d]);
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
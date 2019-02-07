/**$(function () {
    $('[data-toggle="popover"]').popover()
})*/
var events = [];
/**events reader **/
function scrollFunction(){
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    var top = parseInt($(document).scrollTop(), 10);
    events.push([IDSession, "Scroll", top, secs, d]);
}

window.onscroll = scrollFunction;


/************** totalValue Computation ***************/

var $ticketPrice = [];
var $hotelsPrice = [];
var $totalValueElem = $('.totalValue');
var $presuValueElem = $('.presuValue');
var selectedCity = false;
var idSelectedHotel = 'none';
var slider = document.getElementById("days");
var output = document.getElementById("demo");
var transValue = 0;
var hotelValue = 0;
var currentDays = 1;
var foodValue = 1000;
var hotelTotalValue = 0; //regarding the days
var presuIni = 2000000;
function setCities(){
    for(var i=1; i<= data.length; i++){
        $("#groupcities ul").append('<li><input class="trans" type="checkbox" id="lcb'+i.toString()+'" name="fooby1" value="lcb'+i.toString()+'"/>' +
            '            <label for="lcb'+i.toString()+'">'+'<img src='+data[i-1]["image"]+'/><br>'+data[i-1]["name"]+' ('+data[i-1]["department"]+')<br>Transporte Ida y Vuelta: COP $'+data[i-1]["costo"].toLocaleString()+'</label>' +
            '</li>');
        $ticketPrice.push(data[i-1]["costo"]);
    }
}

function listAmenities(amenities){
    var imgs = "";
    for (var i = 0; i<amenities.length; i++){
        imgs+='<img class="icon" src="static/images/'+amenities[i]+'"/>';
    }
    var res='<div class="iconcontainer"><h3>Características</h3>'+imgs+'</div>'
    return res;
}

function setHotels(){
    var count=0;
    for(var i=0; i< data.length; i++) {
        for (var j = 0; j < data[i]["hotels"].length; j++) {
            count++;
            $("#grouphotels ul").append('<li><input class="hotel" type="checkbox" id="'+data[i]["hotels"][j]["id"]+'" name="fooby2"  value="'+data[i]["hotels"][j]["id"]+'" disabled/>' +
                '            <label for="'+data[i]["hotels"][j]["id"]+'">'+
                '<img  id="img'+data[i]["hotels"][j]["id"]+'" ' +
                 'src='+data[i]["hotels"][j]["image"]+'/>' +
                '<br>'+data[i]["hotels"][j]["name"]+'<br>Costo/noche: COP $'+data[i]["hotels"][j]["costo"].toLocaleString()+
                '</label>' +
                '</li>');
            $hotelsPrice.push(data[i]["hotels"][j]["costo"]);
        }
    }
}

setCities();
setHotels();

for(var i=0; i< data.length; i++) {
    for (var j = 0; j < data[i]["hotels"].length; j++) {
        var dp = "left"
        if (j % 2 == 0 || j==0){
            dp = "right";
        }
        $('#img'+data[i]["hotels"][j]["id"]).popover({
            html: true,
            trigger: 'hover',
            placement: dp,
            content: listAmenities(data[i]["hotels"][j]["amenities"])
          });
        $('#img'+data[i]["hotels"][j]["id"]).popover('disable');
    }
}

function disableHotels(){
    $( "#grouphotels li" ).each(function( index ) {
        $(this).find("input").attr("disabled", true);
        var idInp = $(this).find("input").attr('id')
        console.log(idInp);
        $("#img"+idInp).popover('disable');
    });
}

function enableHotels(objCity){
    var i = 0;
    $( "#grouphotels li" ).each(function( index ) {
        if(objCity["hotels"].length==i) {
            return false;
        }
        var idInp = $(this).find("input").attr('id');
        if (objCity["hotels"][i]["id"] == idInp) {
            $(this).find("input").removeAttr("disabled");
            $("#img"+idInp).popover('toggleEnabled');
            console.log(idInp);
            i++;
        }
    });
}

$('.trans').click(function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
	if (this.checked) {
		var idd= $(this).attr('id');
		var place = parseInt(idd.substring(3, idd.length))-1;
		transValue=$ticketPrice[place];
		var objCity = data[place];
		selectedCity = true;
		idSelectedHotel = 'none';
        disableHotels();
		enableHotels(objCity);
        events.push([IDSession, "CheckCiudad", idd, secs, d]);
	}else{
		transValue= 0;
		selectedCity = false;
        disableHotels();
        events.push([IDSession, "UncheckCiudad", $(this).attr('id'), secs, d]);
	}
    slider.value = "1";
    output.innerHTML = "1";//when clicks a city the days go back to 1
    document.getElementById('food').value=1000; //when clicks a city the food budget go back to 1000
    writeTotal();
});

$('.hotel').click(function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
	if (this.checked) {
		var idd= $(this).attr('id');
		idSelectedHotel = idd;
        var place = parseInt(idd.substring(3, idd.length))-1;
		hotelValue=$hotelsPrice[place];
        events.push([IDSession, "CheckHotel", $(this).attr('id'), secs, d]);
	}else{
		hotelValue= 0;
		idSelectedHotel = 'none';
        events.push([IDSession, "UncheckHotel", $(this).attr('id'), secs, d]);
	}
    slider.value = "1";
    output.innerHTML = "1"; //when clicks a hotel the days go back to 1
    document.getElementById('food').value=1000; //when clicks a hotel the food budget go back to 1000
    writeTotal();
});

function writeTotal(){
    hotelTotalValue = hotelValue*currentDays;
	var total = transValue+hotelTotalValue+foodValue;
	var presu = presuIni - total ;
	$totalValueElem.html(total.toLocaleString());
	$presuValueElem.html(presu.toLocaleString());
    //effects if the badget is less than 0
	/*if(presu<0) {
        $presuValueElem.css("color", "red");
        $(".total").css("background-color","#ffefef");
        $(".preserror").show();
    }else{
        $presuValueElem.css("color", "black");
        $(".total").css("background-color","#f5f5f5");
        $(".preserror").css("display","none");
    }*/
}

output.innerHTML = slider.value;
slider.oninput = function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    output.innerHTML = this.value;
    currentDays = parseInt(this.value);
    writeTotal();
    changeStep();
    events.push([IDSession, "ChangeDias", currentDays, secs, d]);
};

function changeStep() {
    var x = Math.floor((Math.random() * 5) + 1);
    document.getElementById("days").step = x.toString();
}

$('#food').on('input', function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    foodValue = parseInt($(this).val());
    writeTotal();
    events.push([IDSession, "ChangeComida", $(this).val(), secs, d]);
});


/***************CUSTOM CHECKBOX ***************/
// the selector will match all input controls of type :checkbox
// and attach a click event handler
$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});


/****** SEND DATA **********/

function sendData(){

    $.ajax({
        url: "/events",
        type: "POST",
        data: JSON.stringify({events: events}),
        contentType: "application/json; charset=utf-8",
        success: function(dat) { console.log(dat); }
    });
}


/******** TIMER *** */
document.getElementById('timer').innerHTML =
    15 + ":" + 00;
startTimer();

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    //if(m<0){alert('timer completed')}

    document.getElementById('timer').innerHTML =
        m + ":" + s;
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
}

setTimeout(function(){
    $("#timeoutModal").modal('show');
},900000);


function validate(){
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    var total = transValue+hotelTotalValue+foodValue;
    var presu = presuIni - total ;
    if(presu<0) {
        alert("¡Error! Ha sobrepasado el presupuesto");
        events.push([IDSession, "ERRORPresupuesto", 0, secs, d]);
        return false;
    }else{
        if(idSelectedHotel==='none' || !selectedCity){
            alert("¡Error! No ha seleccionado ciudad y/o hotel");
            events.push([IDSession, "ERRORSeleccion", 0, secs, d ]);
            return false;
        }else{
            var idd = parseInt(idSelectedHotel.split('b')[1])-1; //the string from the letter 'b' is the position
            var posc = parseInt(idd/4, 10);
            var posh = idd%4;
            console.log(idd);
            console.log(posh);
            console.log(posc);
            var profData = data[posc]["hotels"][posh]["profile"];
            console.log(profData);
            if(profData !=profName){
                alert("Inténtelo de nuevo, no ha acertado en su respuesta");
                events.push([IDSession, "ERRORRespuesta", 0, secs, d ]);
                return false;
            }else{
                events.push([IDSession, "ACERTO", 0, secs, d]);
		sendData();
                return true;
            }
        }
    }
}

$('#mainform').submit(validate);

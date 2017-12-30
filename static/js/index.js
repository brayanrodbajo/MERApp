var events = [];
/**events reader **/
function scrollFunction(){
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    var top = $(document).scrollTop();
    events.push([IDSession, "Scroll", top, secs]);
    console.log(events);
}

window.onscroll = scrollFunction;


/************** totalValue Computation ***************/

var $ticketPrice = [];
var $hotelsPrice = [];
var $totalValueElem = $('.totalValue');
var $presuValueElem = $('.presuValue');
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

function setHotels(){
    var count=0;
    for(var i=0; i< data.length; i++) {
        for (var j = 0; j < data[i]["hotels"].length; j++) {
            count++;
            $("#grouphotels ul").append('<li><input class="hotel" type="checkbox" id="'+data[i]["hotels"][j]["id"]+'" name="fooby2"  value="'+data[i]["hotels"][j]["id"]+'" disabled/>' +
                '            <label for="'+data[i]["hotels"][j]["id"]+'">'+'<img src='+data[i]["hotels"][j]["image"]+'/><br>'+data[i]["hotels"][j]["name"]+'<br>Costo/noche: COP $'+data[i]["hotels"][j]["costo"].toLocaleString()+'</label>' +
                '</li>');
            $hotelsPrice.push(data[i]["hotels"][j]["costo"]);
        }
    }
}

setCities();
setHotels();


function disableHotels(){
    $( "#grouphotels li" ).each(function( index ) {
        $(this).find("input").attr("disabled", true);
    });
}

function enableHotels(objCity){
    var i = 0;
    $( "#grouphotels li" ).each(function( index ) {
        if(objCity["hotels"].length==i) {
            return false;
        }
        if (objCity["hotels"][i]["id"] == $(this).find("input").attr('id')) {
            $(this).find("input").removeAttr("disabled");
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
		writeTotal();
        disableHotels();
		enableHotels(objCity);
        events.push([IDSession, "CheckCiudad", $(this).attr('id'), secs]);
        console.log(events);
	}else{
		transValue= 0;
        disableHotels();
		writeTotal();
        events.push([IDSession, "UncheckCiudad", $(this).attr('id'), secs]);
        console.log(events);
	}
});

$('.hotel').click(function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
	if (this.checked) {
		var idd= $(this).attr('id');
        var place = parseInt(idd.substring(3, idd.length))-1;
		hotelValue=$hotelsPrice[place];
		writeTotal();
        events.push([IDSession, "CheckHotel", $(this).attr('id'), secs]);
        console.log(events);
	}else{
		hotelValue= 0;
		writeTotal();
        events.push([IDSession, "UncheckHotel", $(this).attr('id'), secs]);
        console.log(events);
	}
});

function writeTotal(){
    hotelTotalValue = hotelValue*currentDays;
	var total = transValue+hotelTotalValue+foodValue;
	var presu = presuIni - total ;
	$totalValueElem.html(total.toLocaleString());
	$presuValueElem.html(presu.toLocaleString());
    $("#food").prop('max',presu);
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

var slider = document.getElementById("days");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
    output.innerHTML = this.value;
    currentDays = parseInt(this.value);
    writeTotal();
    changeStep();
    events.push([IDSession, "ChangeDias", currentDays, secs]);
    console.log(events);
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
    events.push([IDSession, "ChangeComida", $(this).val(), secs]);
    console.log(events);
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
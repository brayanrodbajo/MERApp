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
/************ cities **********/
/*var citiesStr = '{'+
    '	"Cartagena":[{'+
    '				"image": "/static/images/cartagena/hotels/hotelpirata.jpg",'+
    '				"name": "Hotel Isla del Pirata",'+
    '				"costo": 1221910'+
    '			}, {'+
    '				"image": "/static/images/cartagena/hotels/aptosmorros.jpg",'+
    '				"name": "Apartamentos Morros Cartagena",'+
    '				"costo": 452128'+
    '			} '+
    '	],'+
    '	"Honda":[{'+
    '				"image": "/static/images/cartagena/hotels/aptosmorros.jpg",'+
    '				"name": "Hotel Honda 1",'+
    '				"costo": 1221910'+
    '			}, {'+
    '				"image": "/static/images/cartagena/hotels/hotelpirata.jpg",'+
    '				"name": "Hotel Honda 2",'+
    '				"costo": 452128'+
    '			} '+
    '	]'+
'}';*//*
var citiesJson = {
    	"Cartagena":[{
    				"image": "/static/images/cartagena/hotels/hotelpirata.jpg",
    				"name": "Hotel Isla del Pirata",
    				"costo": 1221910
    			}, {
    				"image": "/static/images/cartagena/hotels/aptosmorros.jpg",
    				"name": "Apartamentos Morros Cartagena",
    				"costo": 452128
    			}
    	],
    	"Honda":[{
    				"image": "/static/images/cartagena/hotels/aptosmorros.jpg",
    				"name": "Hotel Honda 1",
    				"costo": 1221910
    			}, {
    				"image": "/static/images/cartagena/hotels/hotelpirata.jpg",
    				"name": "Hotel Honda 2",
    				"costo": 452128
    			}
    	]
    };*/
//var citiesJson = JSON.parse(citiesStr);


// $('#lcb1'.toString()).change(function() {
// 	// this will contain a reference to the checkbox   
// 	console.log(this);
// 	if (this.checked) {
// 		console.log(1);
// 		transValue=$ticketPrice[0];
// 		writeTotal();
// 	}
// });  


function disableHotels(){
    $( "#grouphotels li" ).each(function( index ) {
        $(this).find("input").attr("disabled", true);
    });
}

function enableHotels(objCity){
    disableHotels();
    var i = 0;
    $( "#grouphotels li" ).each(function( index ) {
        if(objCity["hotels"].length==i) {
            return false;
        }
        console.log(objCity["hotels"][i]["id"]);
        console.log($(this).find("input"));
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
		console.log(place);
		transValue=$ticketPrice[place];
		var objCity = data[place];
		writeTotal();
		enableHotels(objCity);
	}else{
		transValue= 0;
		writeTotal();
	}
});

$('.hotel').click(function() {
    var d = new Date();
    var curTime = d.getTime();
    var secs = parseInt((curTime - iniTime)/1000);
	if (this.checked) {
		var idd= $(this).attr('id');
        var place = parseInt(idd.substring(3, idd.length))-1;
        console.log(place);
		hotelValue=$hotelsPrice[place];
		writeTotal();
	}else{
		hotelValue= 0;
		writeTotal();
	}
});

function writeTotal(){
    hotelTotalValue = hotelValue*currentDays;
	var total = transValue+hotelTotalValue+foodValue;
	var presu = presuIni - total ;
	$totalValueElem.html(total.toLocaleString());
	$presuValueElem.html(presu.toLocaleString());
    $("#food").prop('max',presu);
	if(presu<0) {
        $presuValueElem.css("color", "red");
        $(".total").css("background-color","#ffefef");
        $(".preserror").show();
    }else{
        $presuValueElem.css("color", "black");
        $(".total").css("background-color","#f5f5f5");
        $(".preserror").css("display","none");
    }
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

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

/************** totalValue Computation ***************/
var $ticketPrice = [500000, 20000, 100000, 200000];
var $hotelsPrice = [1221910, 452128, 191024, 40000]
console.log($ticketPrice[0]);
var $totalValueElem = $('.totalValue');
var $presuValueElem = $('.presuValue');
var transValue = 0;
var hotelValue = 0;
var currentDays = 1;
var foodValue = 1000;
var hotelTotalValue = 0; //regarding the days
var presuIni = 2000000;

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
'}';*/
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
    };
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

$('.trans').click(function() {
	if (this.checked) {
		var idd= $(this).attr('id');
		console.log(idd);
		var place = parseInt(idd.charAt(3))-1;
		transValue=$ticketPrice[place];	
		writeTotal();
		var city =   $(this).siblings('label').text().split(" ")[0];
 		console.log(city);
 		console.log(citiesJson[city][0]["image"]);
 		setHotels(city);
	}else{
		transValue= 0;
		writeTotal();
	}
});

$('.hotel').click(function() {
	if (this.checked) {
		var idd= $(this).attr('id');
		console.log(idd);
		var place = parseInt(idd.charAt(3))-1;
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

function setHotels(cityChecked){
    console.log(citiesJson[cityChecked]);
	for(var i=1; i<= citiesJson[cityChecked].length; i++){
		$('#hcb'+i.toString()).siblings('label').html("<img src="+citiesJson[cityChecked][i-1]["image"]+"/><br>"+citiesJson[cityChecked][i-1]["name"]+"<br>Costo/noche: COP $"+citiesJson[cityChecked][i-1]["costo"].toLocaleString());
	}
}

$('#days').on('input', function() {
    currentDays = parseInt($(this).val());
    writeTotal();
});

$('#food').on('input', function() {
    foodValue = parseInt($(this).val());
    writeTotal();
});


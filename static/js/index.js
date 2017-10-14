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


// totalValue Computation
var $ticketPrice = [500000, 20000, 100000, 200000];
console.log($ticketPrice[0]);
var $totalValueElem = $('.totalValue');
var transValue = 0;
var hotelValue = 0;


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
	var idd= $(this).attr('id');
	console.log(idd);
	var place = parseInt(idd.charAt(3));
	transValue=$ticketPrice[place];	
	writeTotal();   
});

function writeTotal(){
	$totalValueElem.html(transValue+hotelValue);
}


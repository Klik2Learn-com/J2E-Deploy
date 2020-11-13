// This handles all the drag and drop functionality for the Activities
// 
// needed  official meteor add ecmascript)

// Activate JqueryUI 
// Check if dragged layer is correct
// Check if ok to proceed.



   
function singleItemDragDrop(itemAmounts ){
	amountCorrect = 0;
	$(".dragEnabled").css("cursor", "move");

	$(".dragEnabled").draggable({
		revert: "invalid",
		opacity: 0.7,
		zindex: 20
	});

	
	$(".dropTarget").not('.complete').droppable({

		drop: function(event, ui) {
			
			if ($(ui.draggable).data("destination") != $(this).data( 'destinationid' )) {
				
				// Incorrect 
				
				$('.incorrectscreen').removeClass('hidden');
				
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			
				ui.draggable.draggable('option', 'revert', true);
				
				return false;
			
			} else {
				
				// Correct
				
				amountCorrect++;
				$(this).append(ui.draggable);
				$(ui.draggable).css("top", "auto");
				$(ui.draggable).css("left", "auto");
				$(ui.draggable).css("cursor", "default");
				$(ui.draggable).draggable("disable");

				//show correct screen
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				
				
				if (amountCorrect === itemAmounts){
					// You have got them all correct!
				
					$(this).closest('section').find('#welldonecap').removeClass('hidden');
					
					setTimeout(function () {
						$(this).closest('section').find('#welldonecap').addClass('hidden');
					}, 2000);

					$(this).closest('section').find('footer .next.hidden').removeClass('hidden');

				}
			}	
		}
			
	});
}		

function alertSomething(message) {
	alert(message);
}


export default { alertSomething,singleItemDragDrop }

/*
export default class 
*/


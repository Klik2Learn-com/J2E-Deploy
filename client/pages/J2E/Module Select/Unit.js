Template.ModuleSelect.rendered = function() {
	
	document.title = "Select Module - Journey 2 English";
	
}

Template.ModuleSelect.events({
	
	"click #unit2-button": function(evt){
		$(".map-unit1").addClass("hidden");
		$(".map-unit2").removeClass("hidden");
	},
	
	"click #unit1-button": function(evt){
		$(".map-unit2").addClass("hidden");
		$(".map-unit1").removeClass("hidden");
	},
	
	"click .go-to": function(evt){

	function action_2(){
		setTimeout(function() {
			$( ".modal-backdrop" ).remove(); // removes modal backdrop entirely
			$("body").removeClass('modal-open'); // adds the scrollbar back in
			$("body").css('padding-right', ''); // removes padding added by Bootstrap when hiding scrollbar
		}, 500);
	}

		$(".modal").modal("hide") // hides modals
		setTimeout(function() {
			$('.modal-backdrop').removeClass('in');
			$('.modal-backdrop').addClass('out'); // fades out modal backdrop
			action_2();
		}, 200);
 	}
	
});

Template.ModuleSelectUnit2.rendered = function() {
	
	document.title = "Select Module - Journey 2 English";
	
}

Template.ModuleSelectUnit2.events({
	
	"click #unit2-button": function(evt){
		$(".map-unit1").addClass("hidden");
		$(".map-unit2").removeClass("hidden");
	},
	
	"click #unit1-button": function(evt){
		$(".map-unit2").addClass("hidden");
		$(".map-unit1").removeClass("hidden");
	},
	
	"click .go-to": function(evt){

	function action_2(){
		setTimeout(function() {
			$( ".modal-backdrop" ).remove(); // removes modal backdrop entirely
			$("body").removeClass('modal-open'); // adds the scrollbar back in
			$("body").css('padding-right', ''); // removes padding added by Bootstrap when hiding scrollbar
		}, 500);
	}

		$(".modal").modal("hide") // hides modals
		setTimeout(function() {
			$('.modal-backdrop').removeClass('in');
			$('.modal-backdrop').addClass('out'); // fades out modal backdrop
			action_2();
		}, 200);
 	}
});

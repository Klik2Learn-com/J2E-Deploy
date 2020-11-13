Template.popovers.rendered = function() {
		// $('[data-toggle="popover"]').popover();

		// $('body').on('click', function (e) {
			// $('[data-toggle="popover"]').each(function () {
				// //the 'is' for buttons that trigger popups
				// //the 'has' for icons within a button that triggers a popup
				// if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					// $(this).popover('hide');
				// }
			// });
		// });
		
		$('[data-toggle="popover"]').click(function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			$('[data-toggle="popover"]').not(this).popover('hide');
			$(this).popover('show');
		});

		$('html').click(function() {
			$('[data-toggle="popover"]').popover('hide');
		});
	}
	

Template.popover.rendered = function() {
		$('[data-toggle="popover"]').popover();
	}
	
Template.popoverImageLink.rendered = function() {
	$('[data-toggle="popover"]').popover();
	}
	
Template.popoverImageContent.rendered = function() {
	$('[data-toggle="popover"]').popover();
	}
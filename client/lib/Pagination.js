// Needed for handling paging betgween sections
$(document).on("click", ".pagination", function (evt) {
	evt.preventDefault();
	if(window.event) window.event.returnValue = false;
	$("section").addClass("hidden");
	var section = $(this).attr("href");
	$(section).removeClass("hidden");
});

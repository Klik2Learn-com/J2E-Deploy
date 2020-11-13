touchScreenHandler = {

	/**
	*	Descr: Function used to autoscroll.
	*	activity: Object for the particular activity, e.g. $.k2l.m1a26_1
	*	body: the document body
	*	speed: how fast the scroll should be 
	*/
	touchScreenAutoscroll : function(activity, body, speed) {
		activity.timer = setTimeout(function() {
	    	var pos = body.scrollTop();
	   		body.scrollTop(pos + speed);
	   		touchScreenHandler.touchScreenAutoscroll(activity, body, speed);
		}, 10);
	},

	/**
	*	Descr: Checks if an autoscroll should occur then scrolls.
	*			Autoscroll should occur if a 'scrollUp' element ID is passed into this function
	*	activity: Object for the particular activity, e.g. $.k2l.m1a26_1
	*	body: the document body
	*	speed: how fast the scroll should be
	*	targetId: ID of the element the drag has entered.
	*/
	checkScroll : function(activity, body, speed, targetId) {
    	if (targetId == 'scrollUp') {
    		if (!activity.isScrolling) {
    			activity.isScrolling = true;
    			speed = speed * -1;
			  	activity.timer = setTimeout(function() {
				    var pos = body.scrollTop();
				    body.scrollTop(pos + speed);
				    touchScreenHandler.touchScreenAutoscroll(activity, body, speed);
			    }, 10);
			}
    	} else if (targetId == 'scrollDown') {
    		if (!activity.isScrolling) {
    			activity.isScrolling = true;
			    activity.timer = setTimeout(function() {
				    var pos = body.scrollTop();
				    body.scrollTop(pos + speed);
				    touchScreenHandler.touchScreenAutoscroll(activity, body, speed);
			    }, 10);
			}
    	} else {
    		clearTimeout(activity.timer);
    		activity.isScrolling = false;
    	}		
	},

	/**
	*	Descr: This function positions the drag ghost when dragging using touchscreens
	*	xPos: the x coordinate of the ghost
	*	yPos: the y coordinate of the ghost
	*	element: the ghost element
	*/
	dragGhost : function(xPos, yPos, element, opacityVal) {
		$(element).css('opacity', opacityVal);
		$(element).css('position', 'fixed');
		$(element).css({top: yPos, left: xPos});
	},

	removeGhost : function(element) {
		$(element).remove();
	}

}
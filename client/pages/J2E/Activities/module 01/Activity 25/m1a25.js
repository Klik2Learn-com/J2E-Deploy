Template.m1a25.rendered = function () {

	document.title = "Journey 2 English";
	
    setStartActivity(1, 25);

    var oldLocation = location.href;
    $.locationInterval = setInterval(function () {
        if (location.href != oldLocation) {
            subpage = location.href.split("#")[1];
            setLatestSubPage(1, 25, subpage);
            oldLocation = location.href;
        }
    }, 500);

}


Template.m1a25.helpers({
    endPageSect: function () {
        var session = Session.get('activeSection');
        if (session == '#m1a25_end') {
            return false;
        }

        return true;
    }
});

Template.m1a25.created = function () {
    this.subscribe("userProgress");
    this.subscribe("pauseConnection", 1, 25, Meteor.userId());
    Session.set('dirty', true);
    window.addEventListener("beforeunload", beforeUnloadConfirm);

};

Template.m1a25.destroyed = function () {
    clearInterval($.locationInterval);
    window.removeEventListener("beforeunload", beforeUnloadConfirm);
    Session.set('dirty', false);
};



Template.m1a25_1.events({
    'click .pagination': function (evt) {
        $.k2l.mod1_idioms_AB.sound.src = {};
    }

});

Template.m1a25_2.events({
    'click .pagination': function (evt) {
        $.k2l.mod1_idioms.sound.src = {};
    }

});


Template.m1a25_1.rendered = function () {

    /*
        if(typeof $.k2l == 'undefined'){
            $.k2l = {};
        };
    	
        if (typeof $.k2l.m1a25_1 == 'undefined') {
            $.k2l.m1a25_1 = {};
        };
    	
        $.k2l.m1a25_1.sound = new Audio();
    */
}




Template.m1a25_3.events({

    "click .pagination": function (evt) {
        $.k2l.m1a25_3.draggedElement = {};
        $.k2l.m1a25_3.counter = 0;
    }
})

Template.m1a25_3.rendered = function () {

    if (typeof $.k2l == 'undefined') {
        $.k2l = {};
    };

    if (typeof $.k2l.m1a25_3 == 'undefined') {
        $.k2l.m1a25_3 = {};
    };

    $.k2l.m1a25_3.draggedElement = {};
    $.k2l.m1a25_3.counter = 0;

    $.k2l.m1a25_3.dragWords = [];

    //$.k2l.m1a25_3.max = 4;

    // Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m1a25_3";
	initDragDrop(selector, dragDropAmount);

}


Template.m1a25_1.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m1a25_1");
    }
});

Template.m1a25_2.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m1a25_2");
    }
});

Template.m1a25_3.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m1a25_3");
    }
});

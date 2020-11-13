Template.m6a22.helpers({
    endPageSect: function () {
        var session = Session.get('activeSection');
        if (session == '#m6a22_end') {
            return false;
        }
        return true;
    }
});

Template.m6a22.rendered = function () {
    document.title = "Journey 2 English";
	
	setStartActivity(6, 22);

    var oldLocation = location.href;
    $.locationInterval = setInterval(function () {
        if (location.href != oldLocation) {
            subpage = location.href.split("#")[1];
            setLatestSubPage(6, 22, subpage);
            oldLocation = location.href;
        }
    }, 500);

}

Template.m6a22.created = function () {
    this.subscribe("userProgress");
    this.subscribe("pauseConnection", 6, 22, Meteor.userId());
    Session.set('dirty', true);
    window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a22.destroyed = function () {
    clearInterval($.locationInterval);
    window.removeEventListener("beforeunload", beforeUnloadConfirm);
    Session.set('dirty', false);
};

Template.m6a22_1.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m6a22_1");
    }
});

Template.m6a22_1.events({

});

Template.m6a22_1.rendered = function () {
}

Template.m6a22_2.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m6a22_2");
    }
});

Template.m6a22_2.events({

});

Template.m6a22_2.rendered = function () {
}

Template.m6a22_3.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m6a22_3");
    }
});


Template.m6a22_3.events({
    "click .next_question_button": function (evt) {
        $('.number').html($.k2l.m6a22_3.counter + 1);
        $('#question_text').html($.k2l.m6a22_3.questions[$.k2l.m6a22_3.counter]);
        $(".next_question_button").addClass("hidden");
        $('.m6a22_3_a1').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][0]);
        $('.m6a22_3_a2').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][1]);
        $('.m6a22_3_a3').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][2]);
        var newAnswer = $.k2l.m6a22_3.answer_index[$.k2l.m6a22_3.counter];
        $('.m6a22_3_a1').attr("data-destination", "");
        $('.m6a22_3_a2').attr("data-destination", "");
        $('.m6a22_3_a3').attr("data-destination", "");
        $('.m6a22_3_a1').removeClass("hidden");
        $('.m6a22_3_a2').removeClass("hidden");
        $('.m6a22_3_a3').removeClass("hidden");
        $('.m6a22_3_a' + newAnswer).attr("data-destination", "target1");
    },

    "click .pagination": function (evt) {
        $.k2l.m6a22_3.draggedElement = {};
        $.k2l.m6a22_3.counter = 0;
    }

});

Template.m6a22_3.rendered = function () {

    if (typeof $.k2l == 'undefined') {
        $.k2l = {};
    };

    if (typeof $.k2l.m6a22_3 == 'undefined') {
        $.k2l.m6a22_3 = {};
    };



    $.k2l.m6a22_3.draggedElement = {};
    $.k2l.m6a22_3.counter = 0;

    $.k2l.m6a22_3.max = 20; // number of drag spaces on this page.

    var questions = [

        "I've <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> about an important question.",
        "How do you make peace <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> in Northern Ireland?",
        "It's a sincere, genuine, <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div>.",
        "Enduring peace can only come <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> through true respect for others.",

        "We all have a <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> to express and celebrate our diverse cultures.",
        "We all have an obligation to value each other <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> individuals.",
        "I want to live <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> the future.",
        "We are growing up in a world where we are taught to be <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div>",

        "To live peacefully, we must put this <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> practice.",
        "I think my age group <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> be the focus.",
        "<div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> need to be broken down.",
        "If we can take <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> prejudice...",

        "We can create a society that can get <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> together.",
        "We should not let the past pull us <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div>.",
        "We need to create a future that builds <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div>.",
        "We need to listen to <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> other.",

        "It takes a lot of work to make it <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div>.",
        "It's easy for some to sit <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> and hold on to the past.",
        "We all need to take <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> in the present.",
        "There is no time <div class='ddseatedtarget ddwidth10 dd1line' data-destinationid='target1'>&nbsp;</div> the present.",

    ];

    var answers = [
        ["thought", "been thinking", "considered"],
        ["permanent", "lasting", "fixed"],
        ["inspiration", "aspiration", "implication"],
        ["by", "along", "about"],


        ["right", "hope", "duty"],
        ["like", "as", "through"],
        ["in", "for", "towards"],
        ["respecting", "indulgent", "tolerant"],

        ["into", "across", "over"],
        ["might", "had better", "should"],
        ["Fences", "Bridges", "Barriers"],
        ["up", "away", "out"],

        ["on", "by", "through"],
        ["away", "apart", "through"],
        ["roads", "fences", "bridges"],
        ["one", "the", "each"],

        ["happen", "occur", "arrive"],
        ["up", "tight", "back"],
        ["care", "responsibility", "accountable"],
        ["as", "like", "for"],
    ];

    var answer_index = ["2", "1", "2", "3",
        "1", "2", "2", "3",
        "1", "3", "3", "2",
        "1", "2", "3", "3",
        "1", "3", "2", "2"];

    $.k2l.m6a22_3.questions = questions;
    $.k2l.m6a22_3.answers = answers;
    $.k2l.m6a22_3.answer_index = answer_index;

    $("#m6a22_3").mouseover(function () {
        initCustomDragDrop();
    });

}

Template.m6a22_4.helpers({
    activeSection: function () {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#m6a22_4");
    }
});

var initCustomDragDrop = function () {
    $(".ddsourceseated").css("cursor", "move");
    $(".ddsourceseated").draggable({
        scroll: false,
        revert: "invalid",
        opacity: 0.7,
        zindex: 20
    });

    $(".ddseatedtarget").droppable({
        drop: function (event, ui) {
            var parentSection = $(this).parents('section');
            if ($(ui.draggable).attr("id") === "target1") {
                $.k2l.m6a22_3.counter++;
                ui.draggable.draggable = true;
    
                $('.correctscreen').removeClass('hidden');
                setTimeout(function () {
                    $('.correctscreen').addClass('hidden');
                }, 1000);
    
                $(this).removeClass('ddwidth10 dd1line');
                $(this).removeClass('ddseatedtarget');
                $(this).addClass('ddseatedtarget2');
                $(this).html('');
    
                var listItem = document.createElement('div');
                $(listItem).html($(ui.draggable).text());
                $(listItem).addClass('ddsource');
                $(listItem).addClass('ddwidth10 dd1line');

                $(ui.draggable).draggable('option', 'revert', true);
                $(ui.draggable).addClass('hidden');
                $(ui.draggable).removeClass('shadow');
                $(this).append(listItem);
                setTimeout(function () {
                    $('.number').html($.k2l.m6a22_3.counter + 1);
                    $('#question_text').html($.k2l.m6a22_3.questions[$.k2l.m6a22_3.counter]);
                    $('.m6a22_3_a1').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][0]);
                    $('.m6a22_3_a2').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][1]);
                    $('.m6a22_3_a3').html($.k2l.m6a22_3.answers[$.k2l.m6a22_3.counter][2]);
                    var newAnswer = $.k2l.m6a22_3.answer_index[$.k2l.m6a22_3.counter];
                    $('.m6a22_3_a1').attr("id", "1");
                    $('.m6a22_3_a2').attr("id", "2");
                    $('.m6a22_3_a3').attr("id", "3");
                    $('.m6a22_3_a1').removeClass("hidden");
                    $('.m6a22_3_a2').removeClass("hidden");
                    $('.m6a22_3_a3').removeClass("hidden");
                    $('.m6a22_3_a' + newAnswer).attr("id", "target1");
                    
                }, 2000);
    
                if ($.k2l.m6a22_3.counter >= $.k2l.m6a22_3.max) {
                    setTimeout(function () {
                        $('#welldonecap').removeClass('hidden');
                    }, 1000);
                    setTimeout(function () {
                        $('#welldonecap').addClass('hidden');
                    }, 2000);
                    setTimeout(function () {
                        $.k2l.m6a22_3.counter = 0;
                        $(parentSection).addClass('hidden'); // hide this page
                        $(parentSection).next('section').removeClass('hidden');// reveal next page.
                        document.location.hash = $(parentSection).next('section').attr('id');
                        Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
                    }, 2000);
                }
            } else {
                $('.incorrectscreen').removeClass('hidden');
                setTimeout(function () {
                    $('.incorrectscreen').addClass('hidden');
                }, 1000);
                $(ui.draggable).draggable('option', 'revert', true);
				return false;
            }
        },
    });
}
Template.B2l.helpers({
    
    activeSection: function() {
        var activeSection = Session.get("activeSection");
        return (activeSection == "#B2l");
    },

    remainingPlays: function() {
        return Template.instance().remainingPlays.get();
    },

    isComplete: function() {
        var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
        var section = {};
        for (var i = 0; i < doc.sections.length; i++) {
            if (doc.sections[i].name == "Listening") {
                section = doc.sections[i];
            }
        }
        return (section.completeDate != null)
    }

});

Template.B2l.events({

    'click *[data-function="playAudio"]': function(evt) {
        if (Template.instance().remainingPlays.get() > 0) {
            Template.instance().audio.play();
            Template.instance().remainingPlays.set(Template.instance().remainingPlays.get() - 1);
        }
    },

    'click #assess-finish': function(evt) {
        evt.preventDefault();
        $(".finish").removeClass('hidden');
        $(".finish").addClass('fadeIn');
    }

});

Template.B2l.created = function() {
    this.subscribe('studentAssessments');
    Template.instance().remainingPlays = new ReactiveVar();
    var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
    for (var i = 0; i < doc.sections.length; i++) {
        if (doc.sections[i].name == "Listening") {
            Template.instance().remainingPlays.set(doc.sections[i].playsAllowed);
        }
    }

    Template.instance().audio = new Audio();
    Template.instance().audio.src = "/audio/initial/conversations/b2.m4a";
};

Template.B2l.destroyed = function() {
    Template.instance().audio.pause();
    Template.instance().audio = {};
}

Template.B2l.rendered = function(){
    window.scrollTo(0, 0);
    assessmentShowStartMessage("B2");
}
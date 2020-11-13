Template.assessmentreport.helpers({

    organisation: function () {
        return Session.get("ar-organisation");
    },

    studentName: function () {
        return Session.get("ar-studentName");
    },

    date: function () {
        return Session.get("ar-date");
    },

    reading: function () {
        return Session.get("ar-reading");
    },

    readingScore: function(){
        return Session.get("ar-reading").length <=3;
    },

    readingClass: function(){
        return (Session.get("ar-reading") == "Not Completed" ? "not-completed" : "not-done");
    },

    writing: function () {
        return Session.get("ar-writing");
    },

    writingClass: function(){
        return (Session.get("ar-writing") == "Not Completed" ? "not-completed" : "not-done");
    },

    writingScore: function(){
        return Session.get("ar-writing").length <=3;
    },

    listening: function () {
        return Session.get("ar-listening");
    },

    listeningScore: function(){
        return Session.get("ar-listening").length <=3;
    },

    listeningClass: function(){
        return (Session.get("ar-listening") == "Not Completed" ? "not-completed" : "not-done");
    },

    speaking: function () {
        return Session.get("ar-speaking");
    },

    speakingScore: function(){
        return Session.get("ar-speaking").length <=3;
    },

    speakingClass: function(){
        return (Session.get("ar-speaking") == "Not Completed" ? "not-completed" : "not-done");
    },

    overall: function(){
        return Session.get("ar-overall");
    },

    selected: function(section, score){
        if(section == "reading"){
            return (Session.get("ar-reading") == score ? "selected" : "");
        }
        if(section == "writing"){
            return (Session.get("ar-writing") == score ? "selected" : "");
        }
        if(section == "listening"){
            return (Session.get("ar-listening") == score ? "selected" : "");
        }
        if(section == "speaking"){
            return (Session.get("ar-speaking") == score ? "selected" : "");
        }
    }

});

Template.assessmentreport.created = function(){
    Session.set("ar-organisation", "North Caledonian College");
    Session.set("ar-studentName", "Kabir Nur");
    Session.set("ar-date", "27/6/2017");
    Session.set("ar-reading", "B1");
    Session.set("ar-writing", "A2");
    Session.set("ar-listening", "Not Completed");
    Session.set("ar-speaking", "Not Attempted");
    Session.set("ar-overall", "A2");

}

Template.assessmentreport.rendered = function() {	
	document.title = "Assessment Report - Journey 2 English";
}
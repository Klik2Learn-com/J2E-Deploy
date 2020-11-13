Template.m1a1.events({

    'click a.character': function (evt) {

        var character = $(evt.currentTarget).attr('data-character');

        if (Session.get(character + "-played")) {
            $.k2l.m1a1.answers.push(character.substring(0, 1));
            Session.set("m1a1" + character + "Count", getCount(character.substring(0, 1)));
            Session.set("tu-played", false);
            Session.set("elle-played", false);
            Session.set("kay-played", false);
        } else {
            alert("Please first listen to what " + character + " will say before selecting that answer.");
            evt.preventDefault();
            return false;
        }

    },

    'click .buttonaudio': function (evt) {
        if ($(evt.currentTarget).data("audiosrc").indexOf("tu.") >= 0) {
            Session.set("tu-played", true);
        } else if (($(evt.currentTarget).data("audiosrc").indexOf("kay.") >= 0)) {
            Session.set("kay-played", true);
        } else if (($(evt.currentTarget).data("audiosrc").indexOf("elle.") >= 0)) {
            Session.set("elle-played", true);
        }

        audioButtonClickSetup($.k2l.m1a1.sound, $(evt.currentTarget));
        playPauseAudio($.k2l.m1a1.sound, $(evt.currentTarget));
    },

    'click .pagination': function (evt) {
        if ($(evt.currentTarget).hasClass("next")) {
            updateAnsLen();
        } else {
            if ($.k2l.m1a1.ansLen != $.k2l.m1a1.answers.length) {
                var lastChar = (location.href.substring(location.href.length - 1));
                if ($(evt.currentTarget).hasClass("previous") && (lastChar == "1" || lastChar == "e")) {
                    var oldChar = $.k2l.m1a1.answers.pop();
                    var updateChar = "";
                    if (oldChar == "e")
                        updateChar = "elle";
                    else if (oldChar == "t")
                        updateChar = "tu";
                    else
                        updateChar = "kay";

                    Session.set("m1a1" + updateChar + "Count", getCount(oldChar));
                }
            }
        }

        $(".buttonaudio").removeClass("is-playing");
        $.k2l.m1a1.sound.src = {};
    },

    'click a.restart': function (evt) {
        // Reset activity variables
        $.k2l.m1a1.answers = [];
        Session.set("m1a1elleCount", 0);
        Session.set("m1a1tuCount", 0);
        Session.set("m1a1kayCount", 0);
    }

});

Template.m1a1.helpers({
    endPageSect: function () {
        var session = Session.get('activeSection');
        if (session == '#m1a1_end') {
            return false;
        }
        return true;
    },

    hasElleCount: function () {
        return Session.get("m1a1elleCount") > 0;
    },

    hasTuCount: function () {
        return Session.get("m1a1tuCount") > 0;
    },

    hasKCount: function () {
        return Session.get("m1a1kayCount") > 0;
    },

    getElleCount: function () {
        return Session.get("m1a1elleCount");
    },

    getTuCount: function () {
        return Session.get("m1a1tuCount");
    },

    getKCount: function () {
        return Session.get("m1a1kayCount");
    },

    getFinalResult: function () {
        var ecount = Session.get("m1a1elleCount");
        var tcount = Session.get("m1a1tuCount");
        var kcount = Session.get("m1a1kayCount");
        // Assume Elle has the highest score
        var maxScore = ecount;
        if (tcount > maxScore) {
            maxScore = tcount;
        }
        if (kcount > maxScore) {
            maxScore = kcount;
        }
        // THere are several ways of doing the presentation side of things but this way demos the triple handle bar approach
        // Now we have the maxScore we can append the relevant html
        var html = "";
        if (kcount == maxScore) {
            html = html + '<div style="width: 300px; display: inline-block; padding: 15px; text-align: center;"><div class="ph-w trans" style="max-width: 195px;"><div class="ph" style="padding-top: 141%;"><img draggable="false" src="images/module1/k.png" alt="K"></div></div><div class="caption shadow fold" style="display: block;">K</div><br><p>You like to read information and learn by looking at visual representations of things. You are a more visual learner.</p></div>';
        } else if (tcount == maxScore) {
            html = html + '<div style="width: 300px; display: inline-block; padding: 15px; text-align: center;"><div class="ph-w trans" style="max-width: 195px;"><div class="ph" style="padding-top: 141%;"><img draggable="false" src="images/module1/tu.png" alt="Tu"></div></div><div class="caption shadow fold" style="display: block;">Tu</div><br><p>You like to hear information and learn by listening and talking. You are a more auditory learner.</p></div>';
        } else if (ecount == maxScore) {
            html = html + '<div style="width: 300px; display: inline-block; padding: 15px; text-align: center;"><div class="ph-w trans" style="max-width: 195px;"><div class="ph" style="padding-top: 141%;"><img draggable="false" src="images/module1/elle.png" alt="Elle"></div></div><div class="caption shadow fold" style="display: block;">Elle</div><br><p>You like to do things and learn by experimenting and trying things out. You are a more kinaesthetic or tactile learner.</p></div>';
        }
        return html;
    }

});

Template.m1a1.rendered = function () {

    document.title = "Journey 2 English";

    if ($.k2l == undefined) {
        $.k2l = {};
    }

    if ($.k2l.m1a1 == undefined) {
        $.k2l.m1a1 = {};
    }

    //Array to hold "k", "t" and "e" chars then to be counted to determine the score;
    $.k2l.m1a1.answers = [];
    $.k2l.m1a1.ansLen = 0;

    $.k2l.m1a1.kayCount = 0;
    $.k2l.m1a1.tuCount = 0;
    $.k2l.m1a1.elleCount = 0;
    $('[data-toggle="popover"]').popover();
    $.k2l.m1a1.sound = new Audio();

    setStartActivity(1, 1);

    var oldLocation = location.href;
    $.locationInterval = setInterval(function () {
        if (location.href != oldLocation) {
            subpage = location.href.split("#")[1];
            setLatestSubPage(1, 1, subpage);
            oldLocation = location.href;
        }
    }, 500);

    Session.set("m1a1elleCount", 0);
    Session.set("m1a1tuCount", 0);
    Session.set("m1a1kayCount", 0);

}

Template.m1a1.created = function () {
    this.subscribe("userProgress");
    this.subscribe("pauseConnection", 1, 1, Meteor.userId());
    Session.set('dirty', true);
    window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a1.destroyed = function () {
    clearInterval($.locationInterval);
    window.removeEventListener("beforeunload", beforeUnloadConfirm);
    Session.set('dirty', false);
};


getCount = function (char) {
    var count = 0;
    $.k2l.m1a1.answers.forEach(function (item, index) {
        if (item == char) {
            count++;
        }
    });
    return count;
}

updateAnsLen = function () {
    $.k2l.m1a1.ansLen = $.k2l.m1a1.answers.length;
}
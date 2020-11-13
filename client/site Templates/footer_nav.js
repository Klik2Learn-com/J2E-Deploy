Template.footer_nav.events({
    'click a': function (evt) {
        var href = evt.currentTarget.getAttribute("href");
        if (href != "#") {
            $("section").addClass("hidden");
            var section = $(this).attr("href");
            $(section).removeClass("hidden");

            Session.set("activeSection", href);
        }
    }
});

Template.styleguide.events({
    'click a': function (evt) {
        var href = evt.currentTarget.getAttribute("href");
        if (href != "#") {
            $("section").addClass("hidden");
            var section = $(this).attr("href");
            $(section).removeClass("hidden");

            Session.set("activeSection", href);
        }
    }
});

Template.game_footer_nav.events({
    'click a': function (evt) {
        var href = evt.currentTarget.getAttribute("href");
        if (href != "#") {
            $("section").addClass("hidden");
            var section = $(this).attr("href");
            $(section).removeClass("hidden");

            Session.set("activeSection", href);
        }
    }
});

Template.next_section_nav.events({
    'click #next_section': function (evt) {
        $(evt.currentTarget).closest('section').next('section').removeClass('hidden');
        $(evt.currentTarget).closest('section').addClass('hidden');
    },

    'click #prev_section': function (evt) {

    }

});
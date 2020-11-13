Template.achievementsModal.rendered = function () {

}

Template.achievementsModal.events({
    // 'shown.bs.modal #achievementsModal': function (evt) {
    //     console.log("OPENED");
    //     var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
    //     var moduleNum = 10;
    //     for (var i = 1; i <= moduleNum; i++) {
    //         if (modulesFinishedNotification[i] != null && modulesFinishedNotification[i] != 'undefined') {
    //             console.log("STATUS: " + modulesFinishedNotification.i);
    //             var modulestr = '.mod' + i.toString();
    //             console.log("Module String: " + modulestr);
    //             var parentWrapper = $(modulestr).parent();
    //             parentWrapper.removeClass('locked');
    //             //$(moduleStr).find('.trophy-label')[0].text('Completed');
    //         }
    //     }
        
    // }

    'hidden.bs.modal #achievementsModal': function (evt) {
		evt.preventDefault();

		var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
		if(modulesFinishedNotification != null && modulesFinishedNotification != undefined){
			var moduleNum = 10;
			for(var i = 1; i <= moduleNum; i++){
				if(modulesFinishedNotification[i] == 'Read')
					Meteor.call('setModuleProgress', i, "ModalSeen");
			}
		}
	
		var trophies = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
		if(trophies != null && trophies != undefined){
			var trophiesNum = 3;
			for(var i = 0; i <= trophiesNum; i++){
				if(trophies[i] != null && trophies[i] != undefined)
					Meteor.call('setTrophyProgress', i, "ModalSeen");
			}
		}
	}
})

setStartActivity = function (module, activity) {
	Session.set("disableButton", true);
	
	Meteor.subscribe("userProgress", function () {
		// Update latest activity in DB so user can start back from here if they leave.
		
		Meteor.call("setLastActivity", Meteor.userId(), module, activity, function (error, result) {
			console.log("module: " + module);
			console.log("act: " + activity);

			// console.log(result);
			// if (result == disableBtnStr) {
			// 	console.log("equalll");
			// 	Session.set("equalActivities", true);
			// } else {
			// 	console.log("not equalll");
			// 	Session.set("equalActivities", false);
			// }

			Session.set("disableButton", null);
			// Client-side check, repeated on server
			var dateEndedField = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1].dateEnded;
			if (dateEndedField == null) {
				Meteor.call('setStartActivity', module, activity);

				// var latestSubpage = userProgress.findOne({ userId : Meteor.userId() }).modules[module-1].activities[activity-1].latestSubpage;
				// 				
				// if (latestSubpage != undefined && latestSubpage != null){
				// 	$("article.shadow section").addClass("hidden");
				// 	latestSubpage = "#" + latestSubpage;
				// 	$(latestSubpage).removeClass("hidden");
				// 	Session.set(activeSection, "#" + latestSubpage);
				// }
			}
		});

	});

};

// No longer called, kept for reference

// setPauseActivity = function(module, activity) {
// 	Meteor.subscribe("userProgress", function(){
// 		// Client-side check, repeated on server
// 		var dateStartedField = userProgress.findOne({ userId : Meteor.userId() }).modules[module-1].activities[activity-1].dateStarted;
// 		var dateEndedField = userProgress.findOne({ userId : Meteor.userId() }).modules[module-1].activities[activity-1].dateEnded;
// 		var completed = userProgress.findOne({ userId : Meteor.userId() }).modules[module-1].activities[activity-1].completed;
// 		if(dateStartedField != null && dateEndedField == null){
// 			Meteor.call('setPauseActivity', module, activity);
// 		}
// 	});
// };

// This allows anchor links to function correctly
var scrollToHash = function (hash, time) {
	hash = hash || window.location.hash;
	time = time || 200;

	if ($(hash).length) {
		$('html').animate({
			scrollTop: $(hash).offset().top
		}, time);
	}
};


Meteor.startup(scrollToHash);


setResumeActivity = function (module, activity) {
	Meteor.subscribe("userProgress", function () {
		// Client-side check, repeated on server
		var dateStartedField = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1].dateStarted;
		var completed = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1].completed;
		if (completed == "Paused" && dateStartedField != null) {
			Meteor.call('setResumeActivity', module, activity);
		}
	});
};


setResumeActivityButton = function (module, activity) {
	var latestSubpage = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1].latestSubpage;

	if (latestSubpage != undefined && latestSubpage != null) {
		$("article.shadow section").addClass("hidden");
		latestSubpage = "#" + latestSubpage;
		$(latestSubpage).removeClass("hidden");
		Session.set(activeSection, "#" + latestSubpage);
	}
}


setEndActivity = function (module, activity) {
	Meteor.subscribe("userProgress", function () {
		// Client-side check, repeated on server
		var dateEndedField = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1].dateEnded;
		if (dateEndedField == null) {
			Meteor.call('setEndActivity', module, activity, function (err) {
				if (err)
					Bert.alert( err.toString() , 'danger', 'growl-top-right' );
			});
		}
		//var notificationVar = Meteor.users.findOne({ _id: Meteor.userId() }).progCompNotification;
		var orgName = getOrgNameById(Meteor.users.findOne({ _id: Meteor.userId() }).organisation[0]);
	/*	if (notificationVar != null && notificationVar != 'undefined' && notificationVar != 'Read' ) {
			if(orgName != "City and Guilds"){
				if(notificationVar == "Completed"){
					//localStorage.setItem("completionStatus", "80");
					Session.set("completionStatus", "80");
				} else if (notificationVar == "Half-Way"){
					//localStorage.setItem("completionStatus", "40");
					Session.set("completionStatus", "40");
				}
				setTimeout(function () {
					$("#notificationModal1").modal();
				}, 2000);
			}	
		}
		*/

		setTimeout(function(){
			showFinishedModule(module);
			showEarnedTrophy();
			showFeedbackForm(module);
		}, 4000)

	});
	

};


showFinishedModule = function(module){
	var moduleInt = parseInt(module);
	var notificationModule = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
	if(notificationModule != null && notificationModule != undefined)
		notificationModule = notificationModule[module];

	if(notificationModule == 'Finished'){
		Session.set("finishedModule", moduleInt);
		//setTimeout(function () {
			$("#notificationModal2").modal();
		//}, 2000);
	}
};

// showFeedbackForm = function () {
// 	var unitOneCompleted = checkUnits(1, 5);
	
// 	var unitTwoCompleted = checkUnits(6, 10);

// 	if (unitOneCompleted) {
// 		setTimeout(function (){
// 			$("#feedbackUnit1Modal").modal();
// 		}, 2000);
// 	} 
// 	if (unitTwoCompleted) {
// 		setTimeout(function() {
// 			$("#feedbackUnit2Modal").modal();
// 		}, 2000);
// 	}
// };

// checkCompletedUnit = function(moduleNum) {
// 	var progress = userProgress.findOne({ userId : Meteor.userId() });
// 	var modules = progress.modules;
// 	if (modules[moduleNum-1].finished == true) {
// 		return true;
// 	}
// 	return false;
// }

// checkUnits = function(startModule, endModule) {
// 	for (var i = startModule; i <= endModule; i++) {
// 		if (!checkCompletedUnit(i)) {
// 			return false;
// 		}
// 	}
// 	return true;
// };


/**
 * Detect the if a user is idling during an activity
 * If yes, the user is redirected to "Home"
 * 
 * It needs to be called from each activity's template .js file, inside the rendered() function
 */
// detectIdlePage = function() {
// 	console.log("Detecting idling....");

// 	var idleTime = 0;

// 	var idleInterval = setInterval(function() {
// 		idleTime++;		
// 		console.log("Minutes idle: " + idleTime);

// 		if (idleTime > 2) { //2 minutes
// 			console.log("INACTIVEEEEE");			
// 			clearInterval(idleInterval);
// 			window.removeEventListener("beforeunload", beforeUnloadConfirm);
// 			Session.set("dirty", false);
// 			$(this).mousemove(null);
// 			$(this).keypress(null);
// 			window.location.href = '/'; //redirect to home
// 		}
// 	}, 60000) // increment the timer every 1 minute

// 	//Zero the idle timer on mouse movement.
//     $(this).mousemove(function (e) {
// 		idleTime = 0;
// 		console.log("Mouse Moved");
//     });
//     $(this).keypress(function (e) {
// 		idleTime = 0;
// 		console.log("Key pressed");
//     });
// }


showEarnedTrophy = function() {
	var trophyNotification = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
	var trophiesCount = 3;
	if (trophyNotification != null && trophyNotification != undefined) {
		for (var i = 1; i <= trophiesCount; i++) {
			if (trophyNotification[i] != null && trophyNotification[i] != undefined) {
				if (trophyNotification[i] == 'Finished' && trophyNotification[i] != 'Read' && trophyNotification[i] != 'ModalSeen') {
					var trophyInt = i;
					Session.set("trophyEarned", trophyInt);
					//setTimeout(function () {
						$("#notificationModal3").modal();
					//}, 2000);
					break;
				}
			}
		}
	}

};

showFeedbackForm = function(currModule) {
	if (currModule <= 5) {
		var currUnit = 1;
	} else if (currModule >5) {
		var currUnit = 2;
	}
	var feedbackForms = Meteor.users.findOne({ _id: Meteor.userId() }).unitFeedbackForms;
	var feedbackFormsCount = 2;
	if (feedbackForms != null && feedbackForms != undefined) {
		for (var i = 1; i <= feedbackFormsCount; i++) {
			if (feedbackForms[i] != null && feedbackForms[i] != undefined) {
				if (feedbackForms[currUnit] == 'Not completed' && feedbackForms[currUnit] != 'Ignored' && feedbackForms[currUnit] != 'Completed') {
					//console.log(feedbackForms[currUnit]);
					var feedbackToShow = '#feedbackUnit'+currUnit.toString()+'Modal';
					//console.log("MODAL TO SHOW: " + feedbackToShow);
					Session.set("feedbackFormUnit", currUnit);
					//setTimeout(function() {
						$(feedbackToShow).modal();
					//}, 2000);
					break;
				}
			}
		}
	}
};


setLatestSubPage = function (module, activity, subpage) {
	Meteor.subscribe("userProgress", function () {
		Meteor.call('setLatestSubpage', module, activity, subpage);
	});
};

/**
 * Ask the user for confirmation before leaving a page that has been set to "dirty"
 * - user started something but wants to leave the page before finishing it.
 */
beforeUnloadConfirm = function (e) {
	window.onunload = function () {
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
	};
	var confirmationMessage = "\o/";
	e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
	return confirmationMessage;              // Gecko, WebKit, Chrome <34
};

/**
 * Add loading spinner to an audio button while waiting for the audio to load.
 * 
 * @param audio - the audio element that is waiting to load
 * @param audioButton - the button that holds the audio data-audiosrc and the place where to put the loading spinner
 */
addSpinner = function (audio, audioButton) {
	removeAllSpinners();

	var audiosrc = audio.getAttribute('src');
	if (!audioButton.classList)
		audioButton = audioButton[0];

	if (!(audioButton.classList.contains("buttonaudio")) && !(audioButton.classList.contains("buttonaudioc"))) {
		audioButton = $("button[data-audiosrc = '" + audio.getAttribute('src') + "']");
	}

	if (!audio.paused) {
		return;
	}

	var loading = document.createElement("div");
	loading.classList.add("src-loading");
	loading.id = "div" + audiosrc;

	var spinneri = document.createElement("i");
	spinneri.classList.add("fa", "fa-spinner", "fa-pulse", "fa-3x", "fa-fw");

	var spinnerspan = document.createElement("span");
	spinnerspan.classList.add("sr-only");

	var section = document.querySelector("section:not(.hidden)");

	section.appendChild(loading);
	loading.appendChild(spinneri);
	spinneri.appendChild(spinnerspan);

	audio.onplaying = function () {
		//removeSpinner(loading.id);
		removeAllSpinners();
	}
}

/**
 * @param loading_id - the id of the <div> element of the spinner
 */
removeSpinner = function (loading_id) {
	var spinner = document.getElementById(loading_id);
	if (spinner) {
		spinner.parentElement.removeChild(spinner);
	}
}

removeAllSpinners = function () {
	var spinners = [];
	spinners = spinners.concat(document.getElementsByClassName("src-loading"))[0];
	for (var i = 0; i < spinners.length; i++) {
		spinners[i].parentElement.removeChild(spinners[i]);
	}
}

/**
 * Onclick function called when user wants to leave the page
 * but has not finished an activity they started.
 */
safeLeave = function (location) {
	if (Session.get("dirty") == true) {
		window.addEventListener("beforeunload", beforeUnloadConfirm);
	}
	window.location = location;
}

/**
 * @param audio - the audio element on the page
 * @param audioButton - the button which holds the audiosrc for the audio and
 * where to put the animations for loading and pause/play
 * 
 */
playPauseAudio = function (audio, audioButton) {
	if (!audioButton.classList)
		audioButton = audioButton[0];

	if ($(audioButton).hasClass("is-playing")) {
		audio.pause();
		$(audioButton).removeClass("is-playing");
	} else {
		audio.play();
		$(audioButton).addClass("is-playing");
	}


	audio.onended = function () {
		$(audioButton).removeClass("is-playing");
	}

	/*
	if(audioButton.classList.contains("is-playing")){
		audio.pause();
		audioButton.classList.remove("is-playing");
	}else{
		if(Session.get("audio-paused") > 0)
			audio.currentTime = ((Session.get("audio-paused") - Session.get("audio-started")).toFixed(4) / 1000);
		else
			audio.currentTime = 0;
		
		audio.play();
		audioButton.classList.add("is-playing");
		Session.set("audio-paused", 0);
		Session.set("audio-started", (new Date() - (audio.currentTime * 1000) ));
	}

    
	*/
}

pauseAudio = function (audio, audioButton) {
	if (!audioButton.classList)
		audioButton = audioButton[0];

	audio.pause();
	$(audioButton).removeClass("is-playing");
}

// /**
//  * Sets session variables used for playing / pausing audio elements on the page
//  */
// audioTimestamp = function () {
// 	if (Session.get("audio-started") && Session.get("audio-started") > 0) {
// 		if (Session.get("audio-paused") == 0)
// 			Session.set("audio-paused", new Date());
// 	} else {
// 		Session.set("audio-started", new Date());
// 	}
// }

/**
 * Sets the audio source to the corresponding button clicked even when multiple audio elements exist.
 */
checkForSwitch = function (audio, audioButton) {
	var audiosrc = (audioButton.attr) ? audioButton.attr('data-audiosrc') : audioButton.getAttribute("data-audiosrc");
	if (audio.src.indexOf(audiosrc) < 0) {
		//Button is not the same as last click so change source
		audio.src = audiosrc;

		//Add spinner in case of slow internet and loading
		//For now we can remove the spinner from IE browser, till we find out why it is not being rendered...
		if (!isInternetExplorer()) {
			addSpinner(audio, audioButton);
		}


		Session.set("audio-started", new Date());
		Session.set("audio-paused", 0);

	}
}

/**
 * Performs checks and set-up for playing/pausing an audio button on the page.
 * 
 * @param audio - the audio element on the page
 * @param audioButton - the button which holds the audiosrc for the audio and
 * where to put the animations for loading and pause/play
 * 
 */
audioButtonClickSetup = function (audio, audioButton) {
	if (!audioButton.classList)
		audioButton = audioButton[0];

	$(".is-playing").not(audioButton).removeClass("is-playing");
	//audioTimestamp();
	checkForSwitch(audio, audioButton);
}

resetAllAudioButtons = function () {
	$("audio").load();
	$(".is-playing").removeClass("is-playing");
	removeAllSpinners();
}


/*
	This function should be called when the page is rendered
	so that events are attached and can be triggered later on.
 */
preventBackButton = function () {

	document.onmouseover = function () {
		//User's mouse is inside the page.
		window.innerDocClick = true;
	}

	document.onmouseleave = function () {
		//User's mouse has left the page.
		window.innerDocClick = false;
	}

	window.onhashchange = function () {
		if (!window.innerDocClick) {
			if (confirm("Are you sure you want to leave the page?")) {
				/* User wants to go back using the browser's back button */

				//The above code goes back to the previous page however the section content is not there
			} else { return; }

		} else {
			//Activity back button pressed or some other way of leaving the page from withing the DOM
		}

		if (Session.get("audio-paused"))
			Session.set("audio-paused", 0);
		if (Session.get("audio-started"))
			Session.set("audio-started", 0);

		$('audio').each(function () {
			this.pause(); // Stop playing
			this.currentTime = 0; // Reset time
		});
		$('video').each(function () {
			this.pause(); // Stop playing
			this.currentTime = 0; // Reset time
		});
	}
}

/**
 * Creates a doughnut chart.
 * @requires <div> element with id "progressWrap" on the page.
 */
createDoughnutChart = function () {
	// This function was taken from the following website and modified to suit the needs of our website.
	//https://codepen.io/rogerxu/pen/rLqvd

	if (document.getElementById("progressChart")) {
		return;
	}


	//Refresh the DB 
	var refreshDBInterval = setInterval(function () {
		var progress = userProgress.findOne({ userId: Meteor.userId() });
		if (progress != null && progress != 'undefined') {
			clearInterval(refreshDBInterval);
		}
	}, 5);

	//Allow the DB 1000ms to update if needed and then create the graph.
	setTimeout(function () {

		clearInterval(refreshDBInterval);

		var progress = userProgress.findOne({ userId: Meteor.userId() });
		var activityCount = 0;
		var completedCount = 0;

		if (progress == null || progress == "undefined") { return; }

		for (var i = 0; i < progress.modules.length; i++) {
			for (var j = 0; j < progress.modules[i].activities.length; j++) {
				activityCount++;
				if (progress.modules[i].activities[j].completed == "Completed") {
					completedCount++;
				}
			}
		}

		var colors = {
			'blue': '#425bda'
		};

		//Select color for the progress (probably blue...) green used for example
		var color = colors.blue;

		//How big the chart should be
		var radius = 60;
		//Thickness
		var border = 24;
		var padding = 0;
		var startPercent = 0;


		//This is the current completion percent for the user so the graph will fill only this much
		var endPercent = (parseFloat((completedCount / activityCount) * 100).toFixed(1) / 100);

		var twoPi = Math.PI * 2;
		var formatPercent = d3.format('.1%');
		var boxSize = (radius + padding) * 2;


		var count = Math.abs((endPercent - startPercent) / 0.001);
		var step = 0.001;

		var arc = d3.svg.arc()
			.startAngle(0)
			.innerRadius(radius)
			.outerRadius(radius - border);

		var parent = d3.select('div#progressWrap');

		var svg = parent.append('svg')
			.attr('id', 'progressChart')
			.attr('width', boxSize)
			.attr('height', boxSize);

		var defs = svg.append('defs');

		var g = svg.append('g')
			.attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

		var meter = g.append('g')
			.attr('class', 'progress-meter');

		meter.append('path')
			.attr('class', 'background')
			.attr('d', arc.endAngle(twoPi));

		var foreground = meter.append('path')
			.attr('class', 'foreground')
			.attr('fill', color)
			.attr('fill-opacity', 1)
			.attr('stroke', color)
			.attr('stroke-width', 0)
			.attr('stroke-opacity', 1);

		var front = meter.append('path')
			.attr('class', 'foreground')
			.attr('fill', color)
			.attr('fill-opacity', 1);

		//STYLE THE PROGRESS LABEL HERE
		var numberText = meter.append('text')
			.attr('class', 'prog-perc')
			.attr('text-anchor', 'middle')
			.attr('dy', '.35em');

		function updateProgress(progress) {
			foreground.attr('d', arc.endAngle(twoPi * progress));
			front.attr('d', arc.endAngle(twoPi * progress));
			numberText.text(formatPercent(progress));
		}

		var progress = startPercent;
		$('.completedPercentage').html(progress);

		(function loops() {
			updateProgress(progress);

			if (count > 0) {
				count--;
				progress += step;
				setTimeout(loops, 4);
			}
		})();

	}, 1000);

}


/**
 * Returns users % complete
 * A simplified version of the createDoughnutChart function above.
 * Used for sending the user progress through to the SCORM API
 */
showPercentageComplete = function () {

	var progress = userProgress.findOne({ userId: Meteor.userId() });
	var activityCount = 0;
	var completedCount = 0;

	if (progress == null || progress == "undefined") { return; }

	for (var i = 0; i < progress.modules.length; i++) {
		for (var j = 0; j < progress.modules[i].activities.length; j++) {
			activityCount++;
			if (progress.modules[i].activities[j].completed == "Completed") {
				completedCount++;
			}
		}
	}

	//This is the current completion percent for the user
	var endPercent = (parseFloat((completedCount / activityCount) * 100).toFixed(1) / 100);
	return endPercent;

}



createPDF = function (source, name) {
	var pdf = new jsPDF('p', 'mm', 'a3');
	if (source != null) {

		pdf.addHTML(source, 10, 10, { pagesplit: true }, function (dispose) {
			pdf.save(name + '.pdf');
		});
	}

	return;
}


getCourseDashboard = function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
		return "AdminDashboard";
	} else if (Roles.userIsInRole(Meteor.userId(), 'tutor')) {
		return "TutorDashboard";
	} else if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
		return "ModeratorDashboard";
	} else {
		return "StudentDashboard";
	}
}


/**
 * Get all groups from this organisation
 * @param organisationId: The organisation who's groups you need
 */
getOrganisationGroups = function (organisationId) {
	return groups.find({ organisation: organisationId });
}



getUserRole = function (userId) {
	var user = Meteor.users.findOne({ _id: userId });
	setTimeout(function(){
		userRole = user.roles[0];
		if (userRole == null || userRole == "undefined") {
			userRole = "student";
		}
		return userRole;
	}, 200);
}



getUserGroup = function (userId) {
	var userGroup = Meteor.users.findOne({ _id: userId }).groups[0];

	if (userGroup == null || userGroup == "undefined") {
		userGroup = "undefined";
	}

	return userGroup;
}


/**
 * Determines wether a user input was "Correct", "Wrong", or "Almost", using hamming_distance
 * to determine the distance between the user input and the expected correct answer.
 * 
 * @param input : The userinput wanting to score
 * @param expected : The string used for comparison
 * @param caseSensitive : Boolean flag to indicate whether to watch for case sensitivity or to ignore it.
 * 
 */
validateUserInput = function (input, expected, caseSensitive) {
	if (caseSensitive == null) {
		caseSensitive = false;
	}
	var hammingDistance = hamming_distance(input, expected, caseSensitive);
	var errorLimit = (expected.length <= 5) ? 1 : 2;

	if (hammingDistance == 0)
		return "correct";
	if (hammingDistance <= errorLimit)
		return "almost";

	return "wrong";

}

/**
 * Calculates the hamming distance between two strings
 * (operations needed to transform string a to string b).
 * 
 */
hamming_distance = function (a, b, caseSensitive) {
	if (caseSensitive == null) {
		caseSensitive = false;
	}
	var prim = "",
		sec = "",
		len = 0,
		dist = 0;

	//If null, undefined or empty string, return error value
	if (a == null || b == null || a == "undefined" || b == "undefined" || a.length < 1 || b.length < 1) {
		return -1;
	}

	//Decide which string is the "primary"
	if (a.length > b.length) {
		prim = a;
		sec = b;
	} else {
		prim = b;
		sec = a;
	}

	//Case sensitivity does not matter so make both lowercase for easier comparison.
	if (!caseSensitive) {
		prim = prim.toLowerCase();
		sec = sec.toLowerCase();
	}

	//For each character of the "primary" string, compare it with the "secondary" and increase
	//The total distance on the way.
	for (var i = 0; i < prim.length; i++) {
		//The second string still has characters left
		if (sec[i]) {
			//Characters are the same so continue to the next one
			if (prim[i] == sec[i])
				continue;

			//Check for fat-fingered letter.
			var temp = prim.substring(0, i) + prim.substring((i + 1), prim.length);
			if (sec == temp)
				return 1;
		}

		dist++;
	}

	return dist;

}

/**
 * Toggles on/off all checkboxes in the userlist menu
 * @param source: The checkbox which determines on/off for all others.
 * 
 */
userlistSelectAll = function (source, checkBoxNames) {
	checkboxes = document.getElementsByName(checkBoxNames);
	for (var i = 0, n = checkboxes.length; i < n; i++) {
		checkboxes[i].checked = source.checked;
	}
}


/**
 * Fills in the data from the assessment report in the HTML Example
 * so that it can be later saved as PDF and sent to the student
 * 
 * @param assessmentReport: Object containing data about the student's assessment and organisation
 */
uaReportHtml = function (assessmentReport) {

	// document.getElementsByName("organisation")[0].innerHTML = assessmentReport.organisation;
	// document.getElementsByName("Student-name")[0].innerHTML = assessmentReport.user;

	var date = assessmentReport.completeDate.getDate() + "/"
		+ (assessmentReport.completeDate.getMonth() + 1) + "/"
		+ assessmentReport.completeDate.getFullYear();

	if (assessmentReport.reading.pass == null || assessmentReport.reading.pass == 'undefined') {
		assessmentReport.reading.pass = "Not Attempted";
	}

	if (assessmentReport.writing.pass == null || assessmentReport.writing.pass == 'undefined') {
		assessmentReport.writing.pass = "Not Attempted";
	}

	if (assessmentReport.listening.pass == null || assessmentReport.listening.pass == 'undefined') {
		assessmentReport.listening.pass = "Not Attempted";
	}

	if (assessmentReport.speaking.pass == null || assessmentReport.speaking.pass == 'undefined') {
		assessmentReport.speaking.pass = "Not Attempted";
	}

	Session.set("ar-organisation", assessmentReport.organisation);
	Session.set("ar-studentName", assessmentReport.user);
	Session.set("ar-date", date);
	Session.set("ar-reading", assessmentReport.reading.pass);
	Session.set("ar-writing", assessmentReport.writing.pass);
	Session.set("ar-listening", assessmentReport.listening.pass);
	Session.set("ar-speaking", assessmentReport.speaking.pass);
	Session.set("ar-overall", assessmentReport.pass);


	// document.getElementsByName("date")[0].innerHTML = date;

	// var reading = document.getElementsByName("reading")[0];
	// reading.innerHTML = assessmentReport.reading.pass;
	// reading.classList.remove("label-result");
	// document.getElementsByName("B1-reading")[0].classList.remove("selected");
	// var readingPass = assessmentReport.reading.pass.toUpperCase();
	// if(readingPass == "NOT COMPLETED"){
	// 	reading.classList.add("not-completed");
	// }else if(readingPass == "NOT ATTEMPTED"){
	// 	reading.classList.add("not-done");
	// }else{
	// 	reading.classList.add("label-result");
	// 	reading.innerHTML = "Result: <b>" + assessmentReport.reading.pass + "</b>";
	// 	document.getElementsByName(assessmentReport.reading.pass+"-reading")[0].classList.add("selected");
	// }

	// var writing = document.getElementsByName("writing")[0];
	// writing.innerHTML = assessmentReport.writing.pass;
	// writing.classList.remove("label-result");
	// document.getElementsByName("A2-writing")[0].classList.remove("selected");
	// var writingPass = assessmentReport.writing.pass.toUpperCase();
	// if(writingPass == "NOT COMPLETED")
	// 	writing.classList.add("not-completed");
	// else if(writingPass == "NOT ATTEMPTED")
	// 	writing.classList.add("not-done");
	// else{
	// 	writing.classList.add("label-result");
	// 	writing.innerHTML = "Result: <b>" + assessmentReport.writing.pass + "</b>";
	// 	document.getElementsByName(assessmentReport.writing.pass+"-writing")[0].classList.add("selected");
	// }



	// var listening = document.getElementsByName("listening")[0];
	// listening.innerHTML = assessmentReport.listening.pass;
	// listening.classList.remove("not-completed");
	// var listeningPass = assessmentReport.listening.pass.toUpperCase();
	// if(listeningPass == "NOT COMPLETED")
	// 	listening.classList.add("not-completed");
	// else if(listeningPass == "NOT ATTEMPTED")
	// 	listening.classList.add("not-done");
	// else{
	// 	listening.classList.add("label-result");
	// 	listening.innerHTML = "Result: <b>" + assessmentReport.listening.pass + "</b>"; 
	// 	document.getElementsByName(assessmentReport.listening.pass+"-listening")[0].classList.add("selected");
	// }

	// var speaking = document.getElementsByName("speaking")[0];
	// speaking.innerHTML = assessmentReport.speaking.pass;
	// speaking.classList.remove("not-done");
	// var speakingPass = assessmentReport.speaking.pass.toUpperCase();
	// if(speakingPass == "NOT COMPLETED")
	// 	speaking.classList.add("not-completed");
	// else if(speakingPass == "NOT ATTEMPTED")
	// 	speaking.classList.add("not-done");
	// else{
	// 	speaking.classList.add("label-result");
	// 	speaking.innerHTML = "Result: <b>" + assessmentReport.speaking.pass + "</b>";
	// 	document.getElementsByName(assessmentReport.speaking.pass+"-speaking")[0].classList.add("selected");
	// }

	// document.getElementsByName("overall")[0].innerHTML = assessmentReport.pass;

	return;
}

askToRedirect = function (e) {
	if (confirm("This will open in a new window. Do you want to continue?") == true) {
		return true;
	} else {
		e.preventDefault();
		return false;
	}
}

disableScrolling = function () {
	$("body").addClass("noscroll");
}

enableScrolling = function (evt) {
	if (evt.preventDefault) {
		evt.preventDefault();
	}
	if (evt.stopPropagation) {
		evt.stopPropagation();
	};

	$("body").removeClass("noscroll");
	return false;
};

var idleTime = 0;
$(document).ready(function () {
	var scormActive = localStorage.getItem("isScormAPIActive");

	if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') return;

	//Increment the idle time counter every minute.
	var idleInterval = setInterval(function () {
		idleTime = idleTime + 1;
		console.log("Idling for " + idleTime + " minutes");
		if (idleTime >= 30) {
			if (!Meteor.userId()) {
				idleTime = 0;
				return false;
			}
			window.removeEventListener("beforeunload", beforeUnloadConfirm);
			Session.set("dirty", false);
			Meteor.logout();
			$(this).mousemove(null);
			$(this).keypress(null);
			clearInterval(idleInterval);
			//window.location = window.location
			window.location.href = '/'; //redirect to home

		}
	}, 60000); // 1 minute

	//Zero the idle timer on mouse movement.
	$(this).mousemove(function (e) {
		idleTime = 0;
	});
	$(this).keypress(function (e) {
		idleTime = 0;
	});
});


assessmentShowStartMessage = function (currLevel) {
	Session.set("currLevel", currLevel);
	$(".sectionStartDialog").removeClass("hidden");
	setTimeout(function () {
		$(".sectionStartDialog").addClass("hidden");
	}, 3500)
}


isInternetExplorer = function () {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		return true;
	}

	return false;
}

markReadAnnouncement = function (annId, userId) {
	Meteor.call("markReadAnnouncement", annId, userId, function (err) {
		if (err) alert(err);
	});
}

refreshPageOnce = function (pageName) {
	var storageName = pageName + "refreshOnce";
	var refresh = localStorage.getItem(storageName);
	if (refresh == null || refresh == "undefined" || refresh == "refresh") {
		localStorage.setItem(storageName, " ");
		window.location = window.location;
	}
}

getOrgNameById = function (orgId) {
	org = organisations.findOne({ _id: orgId });

	var orgName = null;
	if (org != null && org != 'undefined') {
		orgName = org.name;
	}

	return orgName;
}

/*
progressCompletionNotification = function (orgId, num) {
	var orgName = getOrgNameById(orgId);
	switch (num) {
		case "40":
			return "Well done! You have completed " + num + "% of the course. Keep going and you will receive your course completion certificate.";
        /*
        case "Tata":

        case "Aspire English":
        
	   case "80":
			return "Congratulations! You have completed all 10 modules of the course. You can now receive your course completion certificate. We will need some information from you if you want this. Are you happy to supply your full name, email address and date of birth?";
		default:
			return "Error! If you see this message, something went wrong. Please ignore this pop-up and return to learning English.";
	}
} */


Object.size = function (obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};


//selector should be unique identifier for the droppable elements on the currPage
//the rest is same as below
initDragDrop = function (selector, maxDrops, options) {
	if(options === undefined) {
		options = {};
	 }
	//Make sure that the correct section is rendered to initialise the correct drag and drop
	if (!$("" + selector + ">.content").size()) {
		//if the section is not displayed yet, wait 250ms and try again
		setTimeout(function(){
			initDragDrop(selector, maxDrops, options);
		},250);
	} else {
		//the correct section is on screen, so initialise d&d
		dragDrop(maxDrops, options);
	}
}


/**
 * 
 * maxDrops should be the number of drops (number of targets) on the currPage
 * 
 * options = {
 *     multiAns: true/false,
 *     autoNav : true/alse,
 *     currPage: "#m1a1_1", > Example only. could be any page
 *     nextPage: "#m1a1_2", > Example only. could be any page
 *     showNext: true/false - True by default, Not needed untill we need more functionality
 * 	   currAudio: audio object, for example- $.k2l.m8a19_6.sound, used for reseting
 * }
 * more options can be added to suite other activities
 */

dragDrop = function (maxDrops, options) {
	var correct = 0;
	var multiAns = null;
	var parent = 0;
	if(options === undefined)
		options = {};

	Session.set("d&d_multi-ans", []);
	if (options != {}) {
		if (options.multiAns != null && options.multiAns != undefined) {
			multiAns = options.multiAns
		}
	}

	$(".ddsourceseated, .dd-img-wrapper").css("cursor", "move");

	$(".ddsourceseated, .dd-img-wrapper").draggable({
		scroll: false,
		revert: function(is_valid_drop){
			$('.dd-fixed-source-container').removeClass('of-vis');
			return true;
        },
		opacity: 0.7,
		zindex: 20,
		start: function () {
			$(this).attr("draggable", "false");
			$('.dd-fixed-source-container').addClass('of-vis'); // this lets the drag sources be seen outside the container on mobile view
			
			$(this).attr("zindex", "0");
			parent = this.parentElement;
		}
	});

	/*
	$(body).droppable({
		drop: function(event,ui){
			alert('hello');
			ui.draggable.draggable('option', 'revert', true);
			$('.dd-fixed-source-container').removeClass('of-vis');
		}

	})
*/
	
	$(".ddseatedtarget, .ddtarget, .ddtarget2").not('.complete').droppable({

		drop: function (event, ui) {
			
			var dragSource = $(ui.draggable).data("destination");
			var dropTarget = $(this).data("destinationid");

			dragSourceArray = dragSource.split(' ');

			correctDestination = false;
			for (var i = 0; i < dragSourceArray.length; i++){
				if (dragSourceArray[i] == dropTarget && dragSourceArray[i] != "") {
					correctDestination = true;
				}
			}			
			$('.dd-fixed-source-container').removeClass('of-vis');
			if (!correctDestination) {
				// Incorrect 
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				ui.draggable.draggable('option', 'revert', true);
				return false;

			} else {
				// Correct
				correct++;
				//if the drag and drop allows for one answer to be in two places
				//i.e to be dragged twice out of the box - we have to make a copy
				//of the element and send that so the second can be sent to the
				//other answer. Also have to make sure that it is only the amount of times
				//required - not less, not more
				$(ui.draggable).css("top", "auto");
				$(ui.draggable).css("left", "auto");
				$(ui.draggable).css("cursor", "default");

				var needsClones = ($(ui.draggable).data("destination").split("target").length - 1) >= 2;

				if (needsClones) {
					//If the draggable has to clone in order to allow for
					//multiple targets drag and drop
					//then create a clone and make it draggable.
					var clone = $(ui.draggable).clone();
					var dataTargets = $(ui.draggable).data("destination");
					dataTargets = dataTargets.replace($(this).data('destinationid'), '').trim();
					$(clone).data("destination", dataTargets);
					$(clone).css('opacity', '1');
					$(clone).css('cursor', 'move');
					$(clone).addClass('animated'); 
					$(clone).addClass('fadeIn');
					$(clone).appendTo(parent);
					$(clone).draggable({
						scroll: false,
						revert: function(is_valid_drop){
							$('.dd-fixed-source-container').removeClass('of-vis');
							return true;
        				},
						opacity: 0.7,
						zindex: 20,
						start: function () {
							$(this).attr("draggable", "false");
							$('.dd-fixed-source-container').addClass('of-vis'); // this lets the drag sources be seen outside the container on mobile view
				
							$(this).attr("zindex", "0");
							parent = this.parentElement;
						}
					});
				}

				var targets = [];
				if (multiAns) {
					//Each target can be up to 8 characters in length.
					//variations of tmp string - "target1 ", "target10".
					//variations of ui.draggable.data('destination') - "target1", "target1 target2", "target1 target2 target3"...
					//Those should really be external functions but we can extract them later when
					//everything works.
					var destination = ui.draggable.data('destination');
					var hasMoreTargets = destination.length > 0;
					while (hasMoreTargets) {
						destination = ui.draggable.data('destination');
						//here the length might be 7 and not 8, thus resulting in an exception..
						var tmp = destination.substring(0, (destination.length > 7 ? 8 : 7));

						if (tmp.substring(7, 8) == " ") {
							tmp = tmp.substring(0, 7);
						}
						targets.push(tmp);
						//Take the next target which should start either from character 8 or 9. in case it is 9, we trim to get rid of the
						//space in front
						ui.draggable.data('destination', destination.substring(8, destination.length).trim());
						//destination !== ui.draggable.data('destination') after we modified the actual data attribute
						//therefore need to check against the correct one
						hasMoreTargets = ui.draggable.data('destination').length > 0;
					}

				}
				//we have the array of all possible answers - targets
				//we have the correct answer that was just used - $(this).data('destinationid')
				//add the correct answer to session variable and check the array against that -
				var pastAnswers = Session.get("d&d_multi-ans");
				pastAnswers = pastAnswers || []; //make sure we don't get null/undefined exception if the array does not exist
				pastAnswers.push($(this).data('destinationid'));

				//stack overflow is always good :)
				//check that each element of targets is in pastAnswers
				if(targets.length < 1 || targets.length === pastAnswers.length && targets.every(function(v, i){v === pastAnswers[i]})) {
					//if the arrays match, this drag and drop was the last one for this element
					//clear the array for future answers and move on
					Session.set("d&d_multi-ans", []);

				} else {
					//if the arrays do not match there should be more drag and drops for this element (or something went completely wrong)
					Session.set("d&d_multi-ans", pastAnswers);
					//Create a copy of the current element being dragged so that it can be appended to the correct drop
				}

				//s$(ui.draggable).removeClass('shadow');
				$(ui.draggable).draggable("disable");
				$(ui.draggable).attr("zindex", "20");
				$(this).append(ui.draggable);
				$(this).removeClass('shadow');
				if ($(this).hasClass('ddtarget2')) {
					var draggedElement = ui.draggable;
					$(draggedElement).removeClass('ui-draggable-disabled');
				}


				//show correct screen
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);

				//due to initialisation issues, the maxDrops is the last number
				//the function was called with on that page
				if (correct === maxDrops) {
					// You have got them all correct!
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1500);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
					}, 2500);


					//make sure to reset all variables
					Session.set("d&d_multi-ans", []);
					correct = 0;
					if (options.autoNav) {
						//Navigate to next page 
						//options.currPage
						//options.nextPage ...
						// Load the next page automatically
						setTimeout(function () {
							//reset audio src, if there is any
							var audio = options.currAudio;
							if (audio != null && audio != undefined) {
								audio.pause();
								audio.currentTime = 0;
								audio.src = {};
							}
							$(options.currPage).addClass('hidden'); // hide this page
							$(options.nextPage).removeClass('hidden');// reveal next page.
							document.location.hash = $(options.nextPage).attr('id');
							Session.set("activeSection", '#' + $(options.nextPage).attr('id'));
						}, 3000);


					} else /* if (options.showNext) */ {
						// leaving this for now as default. if we want another default behaviour we have to implement it
						setTimeout(function () {
							$("section:not(.hidden) .next").removeClass('hidden');
						},2500);
					}
				}
			}
		}

	});
}

initDragDropTest = function (selector, options) {
	if(options === undefined)
		options = {};
	//Make sure that the correct section is rendered to initialise the correct drag and drop
	if (!$("" + selector + ">.content").size()) {
		//if the section is not displayed yet, wait 250ms and try again
		setTimeout(function(){
			initDragDropTest(selector, options);
		},250);
	} else {
		//the correct section is on screen, so initialise d&d
		dragDropTest(options);
	}
}

/*	drag-drop function used for test activities, need to ensure there is no text or &nbsp within ddseatedtarget
	so that it works
*/
dragDropTest = function (options) {
	if(options === undefined)
		options = {};

	$(".ddsourceseated").css("cursor", "move");

	$(".ddsourceseated").draggable({
		scroll: false,
		revert: function(is_valid_drop){
			$('.dd-fixed-source-container').removeClass('of-vis');
			var parent = $(this).parent();
			parent.addClass('inline-block')
			$(parent).removeClass('ddseatedtarget');
			console.log('reverting');
			return true;
        },
		opacity: 0.7,
		zindex: 20,
		start: function(){
			var parent = $(this).parent();
			$(parent).removeClass('ddseatedtarget2');
			$(parent).addClass('ddseatedtarget');
			$(parent).css("min-width", "85px");
			$(parent).css("min-height", "23.8px");
			$('.dd-fixed-source-container').addClass('of-vis'); // this lets the drag sources be seen outside the container on mobile view
			
			$(this).attr("zindex", "0");
			
		}
	});

	$(".ddseatedtarget, .ddseat").droppable({
		drop: function (event, ui) {
			if(this.childNodes.length == 0){
				var parent = $(ui.draggable).parent();
				$(this).append(ui.draggable);
				$(ui.draggable).css("top", "auto");
				$(ui.draggable).css("left", "auto");
				$(ui.draggable).css("cursor", "default");
				$(this).removeClass('ddseatedtarget');
				$(this).addClass('ddseatedtarget2');
			}else{
				ui.draggable.draggable('option', 'revert', true);
			}
			$(ui.draggable).attr("zindex", "20");
			$('.dd-fixed-source-container').removeClass('of-vis');
		},
	});

}

forceReload = function(){
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set("dirty", false);
	location.reload(true);
}


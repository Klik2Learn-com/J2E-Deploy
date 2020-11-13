Template.notebook.rendered = function () {
	$.notebook = {};
	$.notebook.pos1 = 0;
	$.notebook.pos2 = 0;
	$.notebook.pos3 = 0;
	$.notebook.pos4 = 0;
	$.notebook.elmnt = document.getElementById("notebookmodal");

	$("#notebookContainer").mousedown(dragMouseDown);
}

/* This code for this function is taken (and modified) from : https://www.w3schools.com/howto/howto_js_draggable.asp */
var closeDragElement = function () {
	/* stop moving when mouse button is released: */
	document.onmouseup = null;
	document.onmousemove = null;
}

var dragMouseDown = function (e) {
	e = e || window.event;

	if ($("#note_read").hasClass("hidden")) {
		var notebookWidth = parseInt($("#note_write .notebookmain").offset().left) + parseInt($("#note_write .notebookmain").width());
		var notebookHeight = parseInt($("#note_write .notebookmain").offset().top) + parseInt($("#note_write .notebookmain").height());
		if (e.clientX >= $("#note_write .notebookmain").offset().left && e.clientX <= notebookWidth && e.clientY >= $("#note_write .notebookmain").offset().top && e.clientY <= notebookHeight) {
			//Mouse is over the inputs of the write form, so dont drag.
			return true;
		}
	} else {
		var notebookWidth = parseInt($("#note_read .notebookmain").offset().left) + parseInt($("#note_read .notebookmain").width());
		var notebookHeight = parseInt($("#note_read .notebookmain").offset().top) + parseInt($("#note_read .notebookmain").height());
		if (e.clientX >= $("#note_read .notebookmain").offset().left && e.clientX <= notebookWidth && e.clientY >= $("#note_read .notebookmain").offset().top && e.clientY <= notebookHeight) {
			//Mouse is over the read form, so dont drag.
			return true;
		}
	}





	$.notebook.pos3 = e.clientX;
	$.notebook.pos4 = e.clientY;
	$(".modal-backdrop.in").addClass("hidden");
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
}

var elementDrag = function (e) {
	e = e || window.event;
	// calculate the new cursor position:
	$.notebook.pos1 = $.notebook.pos3 - e.clientX;
	$.notebook.pos2 = $.notebook.pos4 - e.clientY;
	$.notebook.pos3 = e.clientX;
	$.notebook.pos4 = e.clientY;
	// set the element's new position:
	$.notebook.elmnt.style.top = ($.notebook.elmnt.offsetTop - $.notebook.pos2) + "px";
	$.notebook.elmnt.style.left = ($.notebook.elmnt.offsetLeft - $.notebook.pos1) + "px";
}


Template.notebook_holder.events({

	'click .nbTab': function (evt) {
		$(evt.currentTarget).parents('section').addClass('hidden');
		$($(evt.currentTarget).attr('data-target')).removeClass('hidden');
	}

});

// Events for notebookwrite section
Template.notebookwrite.events({

	'submit #formnotebookwrite': function (evt) {
		evt.preventDefault();
		var userId = Meteor.userId(); // In the final build this will be the user's login ID. e.g. Meteor.User() or similar
		var title = $('#notetitle').val();
		var body = $('#notebody').val();
		Bert.alert("Note saved!", 'success', 'growl-top-right');

		var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
		var monthNames = [  "Jan", "Feb", "Mar",  "Apr", "May", "June", "July",  "Aug", "Sept", "Oct",  "Nov", "Dec"];
		var date = new Date();
		var dayIndex = date.getDay();
		var dateNo = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var hours = date.getHours();
		var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
		var formattedDate = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateNo + ' ' + year + ' ' + hours + ':' + minutes;

		Meteor.call("saveNote", userId, title, body, formattedDate, function (error, data) {
			if (!error) {
				$('#notetitle').val('');
				$('#notebody').val('');
			} else {
				alert(error.reason);
			}
		})
	}

});


// Helpers for notebookread section
Template.notebookread.helpers({
	savedNotes: function () {
		return userNotes.find({}, { sort: { noteDate: -1 } });
	},

	addComment: function () {
		return Template.instance().addComment.get();
	},

	lastCommentIsTutor: function () {
		if (this.comments == undefined) {
			return false;
		}
		var length = this.comments.length;
		if (this.comments[length - 1].userType == "tutor") {
			return true;
		} else {
			return false;
		}
	},

	isTutorNote: function () {
		return this.userType == "tutor"
	},

	comments: function () {
		if (this.comments == undefined) {
			return false;
		} else {
			return true;
		}
	}
});

// Events for notebookread section
Template.notebookread.events({

	'click .nbDelete': function (evt) {
		evt.preventDefault();
		var date = $(evt.currentTarget).parent('div').parent('div').prev('div').children('.note-date').html();
		var title = $(evt.currentTarget).parent('div').parent('div').prev('div').children('.note-title').html();
		var author = "testUser1"  // In the final build this will be the user's login ID. e.g. Meteor.User() or similar
		//var noteId = $(evt.currentTarget).parent('div').parent('div').prev('div').children('.noteId').html();
		var noteId = $(evt.currentTarget).parent().parent().parent().prev('.note-titlebar').attr("data-target");
		noteId = noteId.substring(1, noteId.length);
		

		Meteor.call("deleteNote", noteId, function (error, data) {
			console.log("deleting note....");
			if(error) {
				alert(error.reason);
			}
		});
	},

	'click .nbEdit': function (evt) {
		evt.preventDefault();
		var body = $(evt.currentTarget).parent('div').prev('p').html();
		var bodyHolder = $(evt.currentTarget).parent('div').parent('div.note-content');
		var tempHeight = $(evt.currentTarget).parent('div').prev('p').height();

		$(evt.currentTarget).parent().addClass('hidden');
		$(bodyHolder).append('<form id="newNoteBody"> <div class="notebookbox"><textarea id="notebody" style="margin: 0px; height: ' + (tempHeight + 30) + 'px; width: 100%; resize: none;" placeholder="Type your edit here...">' + body + '</textarea></div><div class="notebookbox text-right"><input type="submit" value="Save" class="button1 buttonsmall nbSave"><button class="button1 buttonsmall nbCancel">Cancel</button></div>');
		$(evt.currentTarget).parent('div').prev('p').addClass('hidden');

	},

	'click .nbCancel': function (evt) {
		evt.preventDefault();
		$(evt.currentTarget).parent().parent().parent().children('p').removeClass('hidden');
		$(evt.currentTarget).parent().parent().prev().removeClass('hidden');
		$(evt.currentTarget).parent().parent().remove();
	},

	'click .nbSave': function (evt) {
		evt.preventDefault();
		var noteId = $(evt.currentTarget).parent().parent().parent().parent().prev('.note-titlebar').attr("data-target");
		noteId = noteId.substring(1, noteId.length);
		var body = $(evt.currentTarget).parent().prev().children('textarea').val();

		Meteor.call("editNote", noteId, body, function (error, data) {
			if (!error) {
				$(evt.currentTarget).parent().parent().parent().children('p').removeClass('hidden');
				$(evt.currentTarget).parent().parent().prev().removeClass('hidden');
				$(evt.currentTarget).parent().parent().remove();
			} else {
				alert(error.reason);
			}
		});
	},

	'click *[data-function="addComment"]': function (evt) {
		Template.instance().addComment.set(true);
	},

	'click *[data-function="cancel-comment"]': function (evt) {
		Template.instance().addComment.set(false);
	},

	'click *[data-function="confirm-comment"]': function (evt, template) {
		var comment = $('#' + this._id + '-comment').val();
		var noteId = this._id;
		if (comment != "") {
			Meteor.call('insertStudentNoteComment', noteId, comment, function (error, result) {
				if (!error) {
					template.addComment.set(false);
				}
			});
		} else {
			alert('Please write a comment or click cancel');
		}
	}

});

Template.notebookread.rendered = function () {
	this.subscribe('nbnotes');
	Template.instance().addComment = new ReactiveVar(false);
};

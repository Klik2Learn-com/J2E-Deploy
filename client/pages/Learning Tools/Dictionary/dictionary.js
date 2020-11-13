Template.dictionary.events({
	
	"submit #srchdict": function(evt) {
		evt.preventDefault();
		var temp = $('#wordorphrase').val();
		var searchTerm = $.trim(temp);
		if (searchTerm != undefined && searchTerm != "") {
			// gbmSearch(searchTerm);
			Search(searchTerm);
		}
		
		/*if ($('input[name=srchtype]:checked', '#srchdict').val() == 'gbm') {
			
		} else if ($('input[name=srchtype]:checked', '#srchdict').val() == 'mas') {
			masSearch(searchTerm);
		}*/
			
	}

})

Template.dictionary_holder.helpers({


});

Template.dictionary_holder.created = function(){

	$.k2l = {};
	$.k2l.dictionary = {};
	$.k2l.dictionary.audio = new Audio();
}

Template.dictionary_holder.events({
	
	'click a.playback': function(event) {
		//var source = $(event.currentTarget).attr('src');
		var audio = new Audio();
		var source = $(event.currentTarget).next('audio').children('source').attr('src');
		audio.src = source;
		audio.play();
	},

	'click .buttonaudio': function(evt){
		evt.preventDefault();
		audioButtonClickSetup($.k2l.dictionary.audio, $(evt.currentTarget));
        playPauseAudio($.k2l.dictionary.audio, $(evt.currentTarget));
	},

	'click span.xr > a': function(event) {
		event.preventDefault();
		var searchTerm = $(event.currentTarget).attr('data-topic');
		entrySearch(searchTerm);
	}

});

/* Current API for searching using the Oxford Dictionary API */
function Search(searchTerm){
	Meteor.call('dictionarySearch', searchTerm, function(err, result){
		if (!err) {
			var word, phoneticSpelling, lexicalCategory, definition = "";

			var data = result.data.results["0"];
			if(data){
				var cat = data.lexicalEntries["0"];
				word = data.word;
			}
			if(cat){
				var entry = cat.entries["0"];
				lexicalCategory = cat.lexicalCategory.text;
			}
			if(entry){
				var pronunciation = entry.pronunciations["0"];
				definition = entry.senses["0"].definitions["0"] 
			}
			if(pronunciation){
				$.k2l.dictionary.audio.src = pronunciation.audioFile;
				phoneticSpelling = pronunciation.phoneticSpelling;
			}
	
			$('#dictionary_table').html(
				"<h2>" + word + "</h2>" +
				"<p>[" + phoneticSpelling+ "]" +
				"<button class='buttonround buttonaudio buttonroundsmall' data-audiosrc='" + $.k2l.dictionary.audio.src +  "'></button></p>" +
				"<p><i> " + lexicalCategory + "</i></p>" +
				"<ul><li>" + definition + "</li></ul>"
			);
		} else {
			$('#dictionary_table').html('<article class="entry">Sorry, we could not find <b>' + searchTerm + '</b> in the learners\' dictionary. You may find this word by consulting a full English dictionary.</article>');
		}
	});
}

/* Old API for searching using the GBM dictionary */
function gbmSearch(searchTerm) {
	try {
		Meteor.call("dictionaryGBMRequest", searchTerm, function (error, result){
			if (!error) {
				$('#dictionary_table').empty();
				var decodedResult = decodeEntities(result.content);
				var entryContent = $('entrycontent', decodedResult)
				$('#dictionary_table').html(entryContent); // Puts the HTML returned from API into table
			} else {
				$('#dictionary_table').empty();
				$('#dictionary_table').append('<article class="entry">Sorry, we could not find <b>' + searchTerm + '</b> in the learners\' dictionary. You may find this word by consulting a full English dictionary.</article>');
			}
		})
	} catch (e) {
		$('#dictionary_table').empty();
		$('#dictionary_table').append('Error. Unable to connect to dictionary. Please try again later.');
	}
}

function entrySearch(searchTerm) {
	try { 
		Meteor.call("dictionaryEntrySearch", searchTerm, function(error, result) {
			if (!error) {
				$('#dictionary_table').empty();
				$('#wordorphrase').val(null);

				var decodedResult = decodeEntities(result.content);
				var entryContent = $('entrycontent', decodedResult)
				$('#dictionary_table').html(entryContent); // Puts the HTML returned from API into table
			} else {
				$('#dictionary_table').empty();
				$('#dictionary_table').append('<article class="entry">Sorry, we could not find <b>' + searchTerm + '</b> in the learners\' dictionary. You may find this word by consulting a full English dictionary.</article>');
			}
		})
	} catch (e) {
		$('#dictionary_table').empty();
		$('#wordorphrase').val(null);
		$('#dictionary_table').append('Error. Unable to connect to dictionary. Please try again later.');		
	}
}

function masSearch(searchTerm) {
	try {
		Meteor.call("dictionaryMASRequest", searchTerm, function (error, result){
			if (!error){

				for (var i = 0; i < result.data.results.length; i++) {
					$('#dictionary_table').append(result.data.results[i].entryUrl);
				}
				
			} else {
				$('#dictionary_table').empty();
				$('#wordorphrase').val(null);
				$('#dictionary_table').append('<article class="entry">Sorry, we could not find <b>' + searchTerm + '</b> in the learners\' dictionary. You may find this word by consulting a full English dictionary.</article>');
				
			}
		})
	} catch (e) {
		$('#dictionary_table').empty();
		$('#wordorphrase').val(null);
		$('#dictionary_table').append('Error. Unable to connect to dictionary. Please try again later.');
	}
}

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

(function(){Meteor.methods({
	// Returns the 'Best Match' of the user's search.
	// 'dictionaryGBMRequest': function(searchTerm) {
	// 	if (Meteor.userId) {
	// 		var result = HTTP.call('GET', 'https://api.collinsdictionary.com/api/v1/dictionaries/english-learner/search/first/?q=' + searchTerm + '&format=html',
	// 			{ headers: { 
	// 					Accept: 'application/xml', 
	// 					accessKey: 'fBAPlBWOupM2dPpU4njH75ATCjVmNDBZO4IHV4RgtjDoKxJdkNmhZkstKG5ohnz4'
	// 				}
	// 			});
	// 		return result;
	// 	}
	// },

	
	'dictionarySearch': function(searchTerm) {
		if (Meteor.userId) {
			var result = HTTP.call('GET', 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + searchTerm,
				{ headers: { 
						Accept: 'application/json',
						app_id: '046baef6', 
						app_key: '6479550290009ca38a812a64e7337f5d'
					}
				});
			return result;
		}
	},

	// Used to find the 'See Also' words and phrases which is returned from other searches.
	'dictionaryEntrySearch': function(searchTerm) {
		var result = HTTP.call('GET', 'https://api.collinsdictionary.com/api/v1/dictionaries/english-learner/entries/'+searchTerm+'?format=html',
			{ headers: {
					Accept: 'application/xml', 
					accessKey: 'fBAPlBWOupM2dPpU4njH75ATCjVmNDBZO4IHV4RgtjDoKxJdkNmhZkstKG5ohnz4'
				}
			});
		return result;
	}
	/*'dictionaryMASRequest': function(searchTerm){
		var result = HTTP.call("GET", "https://dictionary.cambridge.org/api/v1/dictionaries/learner-english/search/?q=" + searchTerm,
								{headers: {accessKey: 'XeP9lybBzAcet0psiaZOTkRLk7QGsfUE2hSJYBOUFxgKCZcghvcu5vGBlJO6QnmC'}});
		
		var resultList = result.data.results; // All the resuls from the search	
		var matchedList = [];
		
		for (var i = 0; i < resultList.length; i++){
			if (resultList[i].entryId == searchTerm || resultList[i].entryId == (searchTerm+'_' + (i + 1))) {
				var found = false;
				for (var j = 0; j < matchedList.length; j++){
					if (matchedList[j] == resultList[i].entryId) {
						found = true;
						break;
					}
				}
				//var found = jQuery.inArray(resultList.entryId, matchedList) > -1; // Check if entryId is in array
				if (!found){
					matchedList.push(resultList[i]);
				}
			}
		}
		
		var entriesList = [];
		for (var i = 0; i < matchedList.length; i++){
			var result = HTTP.call("GET", "https://dictionary.cambridge.org/api/v1/dictionaries/learner-english/entries/" + matchedList[i].entryId + '/',
								   {headers: {accessKey: 'XeP9lybBzAcet0psiaZOTkRLk7QGsfUE2hSJYBOUFxgKCZcghvcu5vGBlJO6QnmC'}});
			entriesList.push(result);
		}
		return entriesList;
	},
	  
	 'dictionaryGBMRequest': function(searchTerm){
		var result = HTTP.call("GET", "https://dictionary.cambridge.org/api/v1/dictionaries/learner-english/search/first/?q=" + searchTerm,
							   {headers: {accessKey: 'XeP9lybBzAcet0psiaZOTkRLk7QGsfUE2hSJYBOUFxgKCZcghvcu5vGBlJO6QnmC'}});
			return result;
	}*/
	/*'dictionaryMASRequest': function(searchTerm){
		var result = HTTP.call('GET', 'https://api.collinsdictionary.com/api/v1/dictionaries/english-learner/search/?q=' + searchTerm,
			{ headers: { 
					Accept: 'application/json', 
					accessKey: 'fBAPlBWOupM2dPpU4njH75ATCjVmNDBZO4IHV4RgtjDoKxJdkNmhZkstKG5ohnz4'
				}
			}, function(error, result) {
				if (!error) {
					for (var i = 0; i < result.data.results.length; i++) {
						console.log(result.data.results[i].entryUrl);
					}
				}
				return result;
			});
	

	},*/




})
}).call(this);

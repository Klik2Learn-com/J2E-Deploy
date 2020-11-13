if(!isInternetExplorer()){
	// var AudioContext = window.AudioContext || window.webkitAudioContext;
	// var audioCtx = new AudioContext();  
	var audioCtx = null;
	var fileStream = null;
	var buffers = [];
	var tempData = {};
	var tempAudioBlob = {};
	var source = {};
	var scriptNode = {};
	var biquadFilter = {};


	navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia);

	var startTime;
	var endTime;

	var micStream;
	var mediaStreamTracks;

	var temp;

	var rec;

	Template.InitialSpeaking_1.helpers({

		activeSection: function(){
			var activeSection = Session.get("activeSection");
			return (activeSection == "#InitialSpeaking_1");
		},

		listenAudio: function() {
			return Template.instance().listenAudio.get();
		},

		listenedOnce: function() {
			return Template.instance().listenedOnce.get();
		},

		recording: function() {
			return Template.instance().recording.get();
		},

		recordingTimeRemaining: function() {
			var duration = moment.duration(Template.instance().timeRemaining.get(), 'milliseconds');
			var minutes = duration.minutes();
			var seconds = duration.seconds();
			// return (hours<10 ? hours : hr) + "hr " + (minutes<10 ? minutes : minutes) + "min";
			return (minutes<10 ? '0'+ minutes : minutes) + ':' + (seconds<10 ? '0'+seconds : seconds);	
		},

		questionNumber: function() {
			return Template.instance().index.get() + 1;
		},

		// If the index reaches 10 the section is complete.
		sectionComplete: function() {
			return (Template.instance().index.get() >= 6);
		},

		recordButtonState: function() {
			if (Template.instance().audioPlaying.get()) {
				return 'faded'
			} else {
				return;
			}
		},

		isComplete: function() {
			var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
			var section = {};
			for (var i = 0; i < doc.sections.length; i++) {
				if (doc.sections[i].name == "Speaking") {
					section = doc.sections[i];
				}
			}
			return (section.completeDate != null)
		}

	});

	Template.InitialSpeaking_1.events({

		'click #listen-question': function(evt) {
			var t = Template.instance();
			$('#test').attr('src', Template.instance().audioFiles[Template.instance().index.get()]);
			$('#test').get(0).play();
			Template.instance().audioPlaying.set(true)
			Template.instance().listenedOnce.set(true);
		},

		'ended #test': function(evt) {
			Template.instance().audioPlaying.set(false);
		},

		'click #btnReturn': function(evt) {
			evt.preventDefault();
			Session.set("dirty", false);
			var assessmentId = Router.current().params.assessmentid;
			Meteor.call('setSectionComplete', Meteor.userId(), assessmentId, "Speaking", function() {
				Session.set("activeSection", "#InitialAssessment");
				Router.go('/assessment/' + assessmentId);	
			})
		},
		
		// RECORDER.JS IMPLEMENTATION
		'click #record-response': function(evt, template) {
			if (template.audioPlaying.get() == false) {
				audioCtx = null;
				// Template.instance().recording.set(true);
				// Template.instance().listenAudio.set(false);
				var instance = Template.instance();
				var AudioContext = window.AudioContext || window.webkitAudioContext;
				audioCtx = new AudioContext();
				// console.log("Audio Context:");
				// console.log(audioCtx);
				micStream = null;
				buffers = [];
				tempData = {};
				tempAudioBlob = {};
				source = {};
				scriptNode = {};
				biquadFilter = {};
				var question = Template.instance().audioFilesText[Template.instance().index.get()];

				if (navigator.mediaDevices.getUserMedia) {

					// This code is used to end the recording after 5 minutes.
					var newIndex = instance.index.get() + 1
					instance.recordingTimer = setTimeout(function() {
						console.log("Ran out of time");

						instance.recording.set(false);
						instance.listenAudio.set(true);
						instance.listenedOnce.set(false);

						instance.index.set(instance.index.get() + 1);
						instance.timeRemaining.set(180000);
						var question = instance.audioFilesText[instance.index.get() -1];
						Meteor.clearInterval(instance.recordingInterval);
						saveRecording(instance.index.get(), question);


						// Meteor.clearInterval(template.recordingInterval);				
						// template.index.set(template.index.get() + 1);
						// template.timeRemaining.set(180000);
						// saveRecording(newIndex, question);
					}, 179500)
					
					// This code deals with the timer by running a Meteor Interval.
					var currentDate = new Date();
					var newDate = new Date(currentDate.getTime() + 3*60000);
					// var temp = Template.instance();
					instance.recordingInterval = Meteor.setInterval(function() {
						currentDate = new Date().getTime();
						instance.timeRemaining.set((newDate - currentDate))
					}, 1000)
			
					// This code is used to obtain the recording.
					Session.set("recordingsupported", "true");
					startTime = new Date().getTime();
					navigator.mediaDevices.getUserMedia({audio: true}).then(
						// successCallback
						function(localMediaStream) {

							micStream = localMediaStream;

							source = audioCtx.createMediaStreamSource(localMediaStream);

							rec = new Recorder(source,{numChannels:1});

							//start the recording process
							rec.record();

							console.log("Recording started");

							instance.recording.set(true);
							instance.listenAudio.set(false);
							console.log("instance: " + instance.recording.get());
							
						}).catch(
							// errorCallback
							function(err) {
								console.log("The following error occured: " + err);
								Session.set("soundRecording", "false");
						});
				} else {
					Session.set("recordingsupported", "false");
					Session.set("soundRecording", "false");
				}
			}
		},

		/*
		'click #record-response': function(evt, template) {
			// console.log("===============INITIATE REC===============");
			// console.log("template: ");
			// console.log(template);
			// console.log(template.audioPlaying.get());
			if (template.audioPlaying.get() == false) {
				audioCtx = null;
				// console.log("template.audioPlaying.get() is false");
				Template.instance().recording.set(true);
				Template.instance().listenAudio.set(false);
				var AudioContext = window.AudioContext || window.webkitAudioContext;
				audioCtx = new AudioContext();
				// console.log("Audio Context:");
				// console.log(audioCtx);
				micStream = null;
				buffers = [];
				tempData = {};
				tempAudioBlob = {};
				source = {};
				scriptNode = {};
				biquadFilter = {};
				var question = Template.instance().audioFilesText[Template.instance().index.get()];

					
				// if (navigator.getUserMedia) {
				// 	// This code is used to end the recording after 2 minutes.
				// 	var newIndex = Template.instance().index.get() + 1
				// 	Template.instance().recordingTimer = setTimeout(function() {
				// 		Meteor.clearInterval(template.recordingInterval);
				// 		saveRecording(newIndex, question);
				// 		template.recording.set(false);
				// 		template.listenAudio.set(true);
				// 		template.index.set(template.index.get() + 1);
				// 		template.timeRemaining.set(120000)

				// 	}, 119500)
					
				// 	// This code deals with the timer by running a Meteor Interval.
				// 	var currentDate = new Date();
				// 	var newDate = new Date(currentDate.getTime() + 2*60000);
				// 	temp = Template.instance();
				// 	Template.instance().recordingInterval = Meteor.setInterval(function() {
				// 		currentDate = new Date().getTime();
				// 		temp.timeRemaining.set((newDate - currentDate))
				// 	}, 1000)
			
				// 	// This code is used to obtain the recording.
				// 	Session.set("recordingsupported", "true");
				// 	startTime = new Date().getTime();
				// 	navigator.getUserMedia(
				// 	// constraints
				// 	{
				// 	audio: true
				// 	},
				// 	// successCallback
				// 	function(localMediaStream) {
				// 	micStream = localMediaStream;
				// 	// Create a media stream source from the new stream
				// 	mediaStreamTracks = localMediaStream.getTracks()[0]
				// 	source = audioCtx.createMediaStreamSource(localMediaStream);
				// 	// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
				// 	scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
				// 	// Create biquadFilter required for down sampling to reduce high frequency artefacts
				// 	biquadFilter = audioCtx.createBiquadFilter();
				// 	biquadFilter.type = "lowpass";
				// 	// The nominal capture frequency is 44100 but ideally we want to aim for 8000 
				// 	// but for perfomance reasons we must use an integer downsample ratio so 44100 / 5 = 8820
				// 	biquadFilter.frequency.value = 8820;
				// 	scriptNode.onaudioprocess = function(audioProcessingEvent) {
				// 		var inputBuffer = audioProcessingEvent.inputBuffer;
				// 		var leftChannel = inputBuffer.getChannelData(0);
				// 		var sampleBuffer = new Float32Array(820);
				// 		var bufferPointer = 0;

				// 		for (var i = 0; i < leftChannel.length; i += 5) {
				// 		sampleBuffer[bufferPointer++] = leftChannel[i];
				// 		}
				// 		buffers.push(sampleBuffer);
				// 	};
				// 	// Coonect source stream to our filter and processor nodes
				// 	source.connect(biquadFilter);
				// 	biquadFilter.connect(scriptNode);
				// 	scriptNode.connect(audioCtx.destination);
				// 	},
				// 	// errorCallback
				// 	function(err) {
				// 	console.log("The following error occured: " + err);
				// 	Session.set("soundRecording", "false");
				// 	}
				// );
				// } else {
				// Session.set("recordingsupported", "false");
				// Session.set("soundRecording", "false");
				// }

				// console.log("navigator.mediaDevices.getUserMedia below >>");
				// console.log(navigator.mediaDevices.getUserMedia);

				if (navigator.mediaDevices.getUserMedia) {
					// console.log("INSIDE getUserMedia check");
					// This code is used to end the recording after 2 minutes.
					// var newIndex = Template.instance().index.get() + 1
					// Template.instance().recordingTimer = setTimeout(function() {
					// 	Meteor.clearInterval(template.recordingInterval);
					// 	saveRecording(newIndex, question);
					// 	template.recording.set(false);
					// 	template.listenAudio.set(true);
					// 	template.listenedOnce.set(false);
					// 	template.index.set(template.index.get() + 1);
					// 	template.timeRemaining.set(120000)

					// }, 119500)
					
					// This code deals with the timer by running a Meteor Interval.
					// var currentDate = new Date();
					// var newDate = new Date(currentDate.getTime() + 2*60000);
					// temp = Template.instance();
					// Template.instance().recordingInterval = Meteor.setInterval(function() {
					// 	currentDate = new Date().getTime();
					// 	temp.timeRemaining.set((newDate - currentDate))
					// }, 1000)
			
					// This code is used to obtain the recording.
					Session.set("recordingsupported", "true");
					startTime = new Date().getTime();
					navigator.mediaDevices.getUserMedia({audio: true}).then(
						// successCallback
						function(localMediaStream) {
							micStream = localMediaStream;
							// Create a media stream source from the new stream
							mediaStreamTracks = localMediaStream.getTracks()[0]
							source = audioCtx.createMediaStreamSource(localMediaStream);
							// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
							scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
							// Create biquadFilter required for down sampling to reduce high frequency artefacts
							biquadFilter = audioCtx.createBiquadFilter();
							biquadFilter.type = "lowpass";
							// The nominal capture frequency is 44100 but ideally we want to aim for 8000 
							// but for perfomance reasons we must use an integer downsample ratio so 44100 / 5 = 8820
							biquadFilter.frequency.value = 8820;
							scriptNode.onaudioprocess = function(audioProcessingEvent) {
								var inputBuffer = audioProcessingEvent.inputBuffer;
								var leftChannel = inputBuffer.getChannelData(0);
								var sampleBuffer = new Float32Array(820);
								var bufferPointer = 0;

								for (var i = 0; i < leftChannel.length; i += 5) {
								sampleBuffer[bufferPointer++] = leftChannel[i];
								}
								buffers.push(sampleBuffer);
							};
							// Coonect source stream to our filter and processor nodes
							source.connect(biquadFilter);
							biquadFilter.connect(scriptNode);
							scriptNode.connect(audioCtx.destination);
						}).catch(
							// errorCallback
							function(err) {
								console.log("The following error occured: " + err);
								Session.set("soundRecording", "false");
						});
				} else {
					Session.set("recordingsupported", "false");
					Session.set("soundRecording", "false");
				}
			}

			// console.log("===============EXIT RECORDING===============\n\n");
		},
		*/

		'click #btnStop': function() {
			Template.instance().recording.set(false);
			Template.instance().listenAudio.set(true);
			Template.instance().listenedOnce.set(false);

			Template.instance().index.set(Template.instance().index.get() + 1);
			Template.instance().timeRemaining.set(180000);
			var question = Template.instance().audioFilesText[Template.instance().index.get() -1];
			clearTimeout(Template.instance().recordingTimer);
			Meteor.clearInterval(Template.instance().recordingInterval);
			saveRecording(Template.instance().index.get(), question);
		}
	});

	Template.InitialSpeaking_1.created = function() {

		Template.instance().audioFiles = [
			"/audio/initial/1N2a.m4a",
			"/audio/initial/1N2b.m4a",
			"/audio/initial/2N3a.m4a",
			"/audio/initial/2N3b.m4a",
			"/audio/initial/3N4a.m4a",
			"/audio/initial/3N4b.m4a"
		]

		Template.instance().audioFilesText = [
			"Tell me about yourself.",
			"Tell me about your family.",
			"What do you like doing in your free time?",
			"What are your plans for the future?",
			"Tell me about your country.",
			"How could you improve your English?"
		]

		Template.instance().index = new ReactiveVar(0);
		Template.instance().audioPlaying = new ReactiveVar(false);
		Template.instance().listenedOnce = new ReactiveVar(false);
		Template.instance().recording = new ReactiveVar(false);
		Template.instance().listenAudio = new ReactiveVar(true);
		Template.instance().recordingTimer = {};
		Template.instance().timeRemaining = new ReactiveVar(180000);
		Template.instance().recordingInterval;

	}

	// RECORDER.JS IMPLEMENTATION
	function saveRecording(answerNumber, question) {
		console.log("===============SAVING REC===============");
		console.log("answerNumber: " + answerNumber);
		console.log("question: " + question);

		if(navigator.mediaDevices.getUserMedia){
			// console.log("INSIDE check SAVE");		

			audioCtx.close().then(function () {	

				endTime = new Date().getTime();
				
				//tell the recorder to stop the recording
				rec.stop();

				//stop microphone access
				micStream.getAudioTracks()[0].stop();

				//create the wav blob and pass it on to createSpeakingBlob
				rec.exportWAV(function(blob) {
					tempAudioBlob = blob;

					tempData = { "name": "tempaudio", "duration": ((endTime - startTime) / 1000).toFixed(2)}

					var value = tempData.duration;
					var assessmentId = Router.current().params.assessmentid;
					SpeakingBinaryFileReader.read(tempAudioBlob, function(err, fileinfo){
						var recDate = Date.now();
						var newFile = new FS.File();
						newFile.attachData(fileinfo, {type: 'audio/wav'}, function(error){
							newFile.name("speaking");
							newFile.metadata = {duration: value};
							newFile.audioAuthor = Meteor.userId();
							newFile.assessmentId = assessmentId;
							// console.log("newFile details:");
							// console.log(newFile);
							assessmentRecordings.insert(newFile, function (err, fileObj) {
								// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
								console.log("insert err: " + err);
								Meteor.call('addAssessmentAudio', fileObj._id, assessmentId, "Speaking", answerNumber, question, function(err, result) {
									console.log("add err: " + err);
								})
							});
						})
					})
				});
				
				

			});
			
		}
		// console.log("===============EXIT SAVING REC===============\n\n");

	}

	/*
	function saveRecording(answerNumber, question) {
		// console.log("===============SAVING REC===============");
		// console.log("answerNumber: " + answerNumber);
		// console.log("question: " + question);
		if(navigator.mediaDevices.getUserMedia){
			// console.log("INSIDE check SAVE");
			endTime = new Date().getTime();
			mediaStreamTracks.stop();
		
			source.disconnect(biquadFilter);
			biquadFilter.disconnect(scriptNode);
			scriptNode.disconnect(audioCtx.destination);

			audioCtx.close().then(function () {	
						
				var totalLength = 0;
				for (var i = buffers.length - 1; i >= 0; i--) {
					totalLength += buffers[i].length;
				}
				var audioBuffer = new Float32Array(totalLength);
				var offset = 0;
				for (var i = 0; i < buffers.length; i++) {
					audioBuffer.set(buffers[i], offset);
					offset += buffers[i].length;
				}
				var dataview = encodeMonoWAV(audioBuffer, 8820);
				var audioBlob = new Blob([dataview], { type: 'audio/wav'});
				tempAudioBlob = audioBlob;
				tempData = {"name": "tempaudio", "duration":((endTime - startTime)/1000).toFixed(2)}

				var value = tempData.duration;
				var assessmentId = Router.current().params.assessmentid;
				BinaryFileReader.read(tempAudioBlob, function(err, fileinfo){
					var recDate = Date.now();
					var newFile = new FS.File();
					newFile.attachData(fileinfo, {type: 'audio/wav'}, function(error){
						newFile.name("speaking");
						newFile.metadata = {duration: value};
						newFile.audioAuthor = Meteor.userId();
						newFile.assessmentId = assessmentId;
						// console.log("newFile details:");
						// console.log(newFile);
						assessmentRecordings.insert(newFile, function (err, fileObj) {
							// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
							console.log("insert err: " + err);
							Meteor.call('addAssessmentAudio', fileObj._id, assessmentId, "Speaking", answerNumber, question, function(err, result) {
								console.log("add err: " + err);
							})
						});
					})
				})

			});
			
		}
		// console.log("===============EXIT SAVING REC===============\n\n");

	}
	*/

	/**********************************************
	*
	*
	***********************************************/

	SpeakingBinaryFileReader = {
		read: function (file, callback) {
			var reader = new FileReader;
			var fileInfo = {
				name: file.name,
				type: file.type,
				size: file.size,
				file: null
			};

			reader.onload = function () {
				fileInfo.file = new Uint8Array(reader.result);
				fileInfo.file.type = fileInfo.type;
				callback(null, fileInfo.file);
			};
			reader.onerror = function () {
				callback(reader.error);
			};

			reader.readAsArrayBuffer(file);
		}
	};

	// function floatTo16BitPCM(output, offset, input) {
	// 	for (var i = 0; i < input.length; i++ , offset += 2) {
	// 		var s = Math.max(-1, Math.min(1, input[i]));
	// 		output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	// 	}
	// }

	// function writeString(view, offset, string) {
	// 	for (var i = 0; i < string.length; i++) {
	// 		view.setUint8(offset + i, string.charCodeAt(i));
	// 	}
	// }

	// var encodeMonoWAV = function encodeMonoWAV(samples, sampleRate) {
	// 	console.log("-----------ENTER encodeMonoWAV-----------");
	// 	var buffer = new ArrayBuffer(44 + samples.length );
	// 	var view = new DataView(buffer);

	// 	/* RIFF identifier */
	// 	writeString(view, 0, 'RIFF');
	// 	/* file length */
	// 	view.setUint32(4, 44 + samples.length , true);
	// 	/* RIFF type */
	// 	writeString(view, 8, 'WAVE');
	// 	/* format chunk identifier */
	// 	writeString(view, 12, 'fmt ');
	// 	/* format chunk length */
	// 	view.setUint32(16, 16, true);
	// 	/* sample format (raw) */
	// 	view.setUint16(20, 1, true);
	// 	/* channel count */
	// 	view.setUint16(22, 1, true); // mono
	// 	/* sample rate */
	// 	view.setUint32(24, sampleRate, true);
	// 	/* byte rate (sample rate * block align) */
	// 	view.setUint32(28, sampleRate , true);
	// 	/* block align (channel count * bytes per sample) */
	// 	view.setUint16(32, 2, true);
	// 	/* bits per sample */
	// 	view.setUint16(34, 16, true);
	// 	/* data chunk identifier */
	// 	writeString(view, 36, 'data');
	// 	/* data chunk length */
	// 	view.setUint32(40, samples.length , true);

	// 	floatTo16BitPCM(view, 44, samples);

	// 	console.log("view:");
	// 	console.log(view);
	// 	console.log("-----------EXIT encodeMonoWAV-----------");

	// 	return view;
	// }


	function createSpeakingBlob(blob) {

		console.log(blob);

		console.log("HEYYY");
	
		tempAudioBlob = blob;
		
	}
}
if (!isInternetExplorer()) {

	Session.setDefault("counter", 0);
	Session.setDefault("recordingsupported", "???");
	Session.setDefault('soundRecorded', "false");
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

	var rec;
	var micStream;

	navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	var startTime;
	var endTime;


	Template.recordersave.helpers({

		recorded: function () {
			return Template.instance().recorded.get();
		},

		recording: function () {
			return Template.instance().recording.get();
		},

		audioLength: function () {
			console.log(tempData);
			if (tempData.duration == undefined || tempData.duration == null) {
				return "Sorry, an error occurred and no audio was captured.";
			}
			return tempData.duration + " seconds";
		}

		// audioSize: function () {
		// 	return tempData.length + " kilobytes";
		// }

	})

	Template.recordersave.events({

		'click #btnplaytemp': function (evt) {
			if (window.URL) {
				var url = window.URL.createObjectURL(tempAudioBlob);
			} else {
				var url = window.webkitURL.createObjectURL(tempAudioBlob);
			}
			var player = document.getElementById('player');
			player.setAttribute("src", url);
			player.play();

		},

		'click #btndelete': function (evt) {
			// Delete the file which was just recorded.
			Template.instance().recorded.set(false);

			micStream = null;
			fileStream = null;
			buffers = [];
			tempData = {};
			tempAudioBlob = {};
			Session.set('soundRecorded', 'false');
		},

		'click #btnsave': function (evt) {

			var instance = Template.instance();
			// Bert.alert( 'Recording Successfully Saved!', 'success', 'growl-top-right' );
			
			// Save the file which was just recorded.
			var value = tempData.duration;

			var regExp = new RegExp(/[!@#$%^&*(),.?":{}|<>/\\]/g);
			var saveTitle = $('#savename').val();
			var savename = saveTitle.replace(regExp, "_");
			RecorderBinaryFileReader.read(tempAudioBlob, function (err, fileinfo) {
				var recDate = Date.now();
				var newFile = new FS.File();

				//toolRecs.insert(fileinfo);
				
				newFile.attachData(fileinfo, { type: 'audio/wav' }, function (error) {
					newFile.name(savename);
					newFile.metadata = { duration: value };
					newFile.audioAuthor = Meteor.userId();
					newFile.comments = [];
				// 	// Meteor.call('insertNewRecording', newFile, fileObj._id, function (err, result) {
				// 	// 	Session.set('soundRecorded', 'false');
				// 	// })
					audioRecordings.insert(newFile, function (err, fileObj) {
						// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
						Session.set('soundRecorded', 'false'); // Returns to preRecord state.
						instance.recorded.set(false);
						Bert.alert( 'Recording Successfully Saved!', 'success', 'growl-top-right' );
					});
					
				})
				
			})
		},

		'click #btnrecord': function (evt) {
			// console.log("===============INITIATE REC===============");


			// Template.instance().recording.set(true);

			// $.k2l.voicerecorder.micStream = null;
			// var AudioContext = window.AudioContext || window.webkitAudioContext;
			// audioCtx = new AudioContext();
			// buffers = [];
			// tempData = {};
			// tempAudioBlob = {};


			// console.log("navigator.mediaDevices.getUserMedia below >>");
			// console.log(navigator.mediaDevices.getUserMedia);

			// if (navigator.mediaDevices.getUserMedia) {
			// 	console.log("INSIDE getUserMedia check");
			// 	Session.set("recordingsupported", "true");
			// 	startTime = new Date().getTime();
			// 	navigator.mediaDevices.getUserMedia({audio: true}).then(
			// 		// successCallback
			// 		function (localMediaStream) {
			// 			console.log(localMediaStream);
			// 			//var AudioContext = window.AudioContext || window.webkitAudioContext;
			// 			//var audioCtx = new AudioContext();
			// 			$.k2l.voicerecorder.micStream = localMediaStream;
			// 			// Create a media stream source from the new stream
			// 			$.k2l.voicerecorder.micStreamTrack = localMediaStream.getTracks()[0]
			// 			//var source = audioCtx.createMediaStreamSource(localMediaStream);
			// 			source = audioCtx.createMediaStreamSource(localMediaStream);
			// 			console.log(source);
			// 			// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
			// 			//var scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
			// 			scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
			// 			// Create biquadFilter required for down sampling to reduce high frequency artefacts
			// 			//var biquadFilter = audioCtx.createBiquadFilter();
			// 			biquadFilter = audioCtx.createBiquadFilter();
			// 			biquadFilter.type = "lowpass";
			// 			// The nominal capture frequency is 44100 but ideally we want to aim for 8000 
			// 			// but for perfomance reasons we must use an integer downsample ratio so 44100 / 5 = 8820
			// 			biquadFilter.frequency.value = 8820;
			// 			scriptNode.onaudioprocess = function (audioProcessingEvent) {
			// 				var inputBuffer = audioProcessingEvent.inputBuffer;
			// 				var leftChannel = inputBuffer.getChannelData(0);
			// 				var sampleBuffer = new Float32Array(820);
			// 				var bufferPointer = 0;

			// 				for (var i = 0; i < leftChannel.length; i += 5) {
			// 					sampleBuffer[bufferPointer++] = leftChannel[i];
			// 				}
			// 				buffers.push(sampleBuffer);
			// 			};						
			// 			// Coonect source stream to our filter and processor nodess
			// 			source.connect(biquadFilter);
			// 			biquadFilter.connect(scriptNode);
			// 			scriptNode.connect(audioCtx.destination);
			// 		}).catch(
			// 			// errorCallback
			// 			function (err) {
			// 				console.log("The following error occured: " + err);
			// 				Session.set("soundRecording", "false");
			// 		});
			// } else {
			// 	Session.set("recordingsupported", "false");
			// 	Session.set("soundRecording", "false");
			// }



			//RECORDERJS IMPLEMENTATION
			var instance = Template.instance();

			$.k2l.voicerecorder.micStream = null;
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new AudioContext();
			buffers = [];
			tempData = {};
			tempAudioBlob = {};

			if (navigator.mediaDevices.getUserMedia) {
				Session.set("recordingsupported", "true");
				startTime = new Date().getTime();
				navigator.mediaDevices.getUserMedia({audio: true}).then(
					// successCallback
					function (localMediaStream) {

						micStream = localMediaStream;

						source = audioCtx.createMediaStreamSource(localMediaStream);
						
						rec = new Recorder(source,{numChannels:1});

						//start the recording process
						rec.record();
						instance.recording.set(true);
						
					}).catch(
						// errorCallback
						function (err) {
							console.log("The following error occured: " + err);
							Session.set("soundRecording", "false");
					});
			} else {
				Session.set("recordingsupported", "false");
				Session.set("soundRecording", "false");
			}
		},

		'click #btnstop': function (evt) {

			// console.log("===============INITIATE STOP===============");

			// Template.instance().recording.set(false);
			// Template.instance().recorded.set(true);

			// console.log("navigator.mediaDevices.getUserMedia below >>");
			// console.log(navigator.mediaDevices.getUserMedia);

			// if (navigator.mediaDevices.getUserMedia) {
			// 	console.log("INSIDE check on STOP");
			// 	endTime = new Date().getTime();
			// 	$.k2l.voicerecorder.micStreamTrack.stop();

			// 	source.disconnect(biquadFilter);
			// 	biquadFilter.disconnect(scriptNode);
			// 	scriptNode.disconnect(audioCtx.destination);
			// 	// Post-Deprecation
			// 	/*$.k2l.voicerecorder.MediaStreamTracks = $.k2l.voicerecorder.micStream.getTracks()[0];
			// 	$.k2l.voicerecorder.MediaStreamTracks.stop();*/

			// 	audioCtx.close().then(function () {
			// 		var totalLength = 0;
			// 		for (var i = buffers.length - 1; i >= 0; i--) {
			// 			totalLength += buffers[i].length;
			// 		}
			// 		var audioBuffer = new Float32Array(totalLength);
			// 		var offset = 0;
			// 		for (var i = 0; i < buffers.length; i++) {
			// 			audioBuffer.set(buffers[i], offset);
			// 			offset += buffers[i].length;
			// 		}
			// 		var dataview = encodeMonoWAV(audioBuffer, 8820);
			// 		var audioBlob = new Blob([dataview], { type: 'audio/wav' });
			// 		tempAudioBlob = audioBlob;
			// 		tempData = { "name": "tempaudio", "duration": ((endTime - startTime) / 1000).toFixed(2), "length": buffers.length }
	
	
			// 		/*BinaryFileReader.read(audioBlob, function(err, fileinfo){
			// 			var recDate = Date.now();
			// 			var newFile = new FS.File();
			// 			newFile.attachData(fileinfo, {type: 'audio/wav'}, function(error){
			// 			newFile.name('tempaudio.wav');
			// 			newFile.metadata = {duration: ((endTime - startTime)/1000).toFixed(2)};
			// 			audioRecordings.insert(newFile, function (err, fileObj) {
			// 			 // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
			// 			});
			// 		  })
			// 		})*/
			// 		Session.set("soundRecorded", "true");
			// 	});

				
			// }


			//RECORDERJS IMPLEMENTATION
			// Template.instance().recording.set(false);
			// Template.instance().recorded.set(true);	
			var instance = Template.instance();
			if (navigator.mediaDevices.getUserMedia) {

				audioCtx.close().then(function () { 
					endTime = new Date().getTime();

					//tell the recorder to stop the recording
					rec.stop();
	
					//stop microphone access
					micStream.getAudioTracks()[0].stop();
	
					//create the wav blob and pass it on to createDownloadLink
					rec.exportWAV(function(blob) {
						tempAudioBlob = blob;
						tempData = { "name": "tempaudio", "duration": ((endTime - startTime) / 1000).toFixed(2)};
						console.log(tempData);
						instance.recording.set(false);
						instance.recorded.set(true);	
					});					
					
				});
			}
		}
	})

	Template.recordersave.onCreated(function () {
		Template.instance().recorded = new ReactiveVar(false);
		Template.instance().recording = new ReactiveVar(false);
	});

	Template.recordersave.rendered = function () {
		if ($.k2l == undefined) {
			$.k2l = {};
		}

		if ($.k2l.voicerecorder == undefined) {
			$.k2l.voicerecorder = {};
		}

		$.k2l.voicerecorder.micStream = {};
		$.k2l.voicerecorder.MediaStreamTracks = {};
	}
	/**********************************************
	*
	*
	***********************************************/

	RecorderBinaryFileReader = {
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

	// encodeMonoWAV = function encodeMonoWAV(samples, sampleRate) {
	// 	console.log("-----------ENTER encodeMonoWAV-----------");
	// 	var buffer = new ArrayBuffer(44 + samples.length * 2);
	// 	var view = new DataView(buffer);

	// 	/* RIFF identifier */
	// 	writeString(view, 0, 'RIFF');
	// 	/* file length */
	// 	view.setUint32(4, 44 + samples.length * 2, true);
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
	// 	view.setUint32(28, sampleRate * 2, true);
	// 	/* block align (channel count * bytes per sample) */
	// 	view.setUint16(32, 2, true);
	// 	/* bits per sample */
	// 	view.setUint16(34, 16, true);
	// 	/* data chunk identifier */
	// 	writeString(view, 36, 'data');
	// 	/* data chunk length */
	// 	view.setUint32(40, samples.length * 2, true);

	// 	floatTo16BitPCM(view, 44, samples);

	// 	console.log("view:");
	// 	console.log(view);
	// 	console.log("-----------EXIT encodeMonoWAV-----------");

	// 	return view;
	// }

}
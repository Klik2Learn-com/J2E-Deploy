Template.voicerecorder.helpers({

  issupported: function () {
    return Session.get("recordingsupported");
  },

  samplerate: function(){
    var nativeSampleRate = audioCtx.sampleRate;
    return nativeSampleRate;
  },

  recordexists: function(){
    var result = "None";
    var recording = audioRecordings.findOne({
      filename: "tempaudio.wav"
    }, {sort: {recorded_on: -1}});
    if (recording){
      var recDate = new Date(recording.recorded_on);
      result = recDate.toLocaleString();
    }
    return result;
  }
});

Template.voicerecorder.rendered = function() {
  if ($.k2l == undefined) {
    $.k2l = {};
  }

  if ($.k2l.voicerecorder == undefined) {
    $.k2l.voicerecorder = {};
  }

  $.k2l.voicerecorder.micStream = {};
  $.k2l.voicerecorder.MediaStreamTracks = {};
}

Template.voicerecorder.events({
    
  'click .vrTab': function(evt) {
    $(evt.currentTarget).parents('section').addClass('hidden');
    $($(evt.currentTarget).attr('data-target')).removeClass('hidden');
  }

});
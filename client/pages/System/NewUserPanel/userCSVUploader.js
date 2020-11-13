Template.userCSVUploader.rendered = function() {
	
	document.title = "Upload - Journey 2 English";
	
}

Template.userCSVUploader.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
  Template.instance().uploadedData = new ReactiveVar();
});

Template.userCSVUploader.helpers({
  
  uploading: function() {
    return Template.instance().uploading.get();
  },

  getUploadedData: function() {
    return Template.instance().uploadedData.get();
  },

  isUploadedData: function() {
    if (Template.instance().uploadedData.get() && Template.instance().uploadedData.get().length != undefined) {
      return true;
    } else {
      return false;
    }
  }

});

Template.userCSVUploader.events({

  'change [name="uploadCSV"]': function ( event, template ) {
    template.uploading.set( true );
    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        template.uploadedData.set(results.data);
        template.uploading.set( false );
      }
    });
  },

  'click *[data-function="confirm-users"]': function(evt, template) {
    
    var uploadedData = template.uploadedData.get();
    $('input[name="autoPassAssessment"]:checked').each(function() {
      var index = $(this).attr('data-index');
      uploadedData[index]['autoPassAssessment'] = true;
    })

    template.uploadedData.set(uploadedData);
    
    var users = template.uploadedData.get();
    Meteor.call( 'parseUpload', users, function(error, response) {
      if (error) {
        console.log(error.message);
      } else {
        template.uploading.set(false);
        template.uploadedData.set(undefined);
        Bert.alert( 'Users Created!', 'success', 'growl-top-right' );
      }
    });

  },

  'click *[data-function="clear-table"]': function(evt) {
    Template.instance().uploadedData.set(undefined);
  },
  
  'click *[name="checkAll"]': function(evt, template) {
    if ($('*[name="checkAll"]').prop('checked') == true) {
      $('*[name="autoPassAssessment"]').prop('checked', true);
    } else {
      $('*[name="autoPassAssessment"]').prop('checked', false);
    }
  }

});





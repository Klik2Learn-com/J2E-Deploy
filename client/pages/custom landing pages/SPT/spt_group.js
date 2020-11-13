Template.spt.helpers({
    organisationId: function(e){
        var orgId = null;
        Meteor.call("getOrgIdByName", "Shinny Performance Training Group Limited", function(err, result){
            if(err) alert(err);
            
            orgId = result;
        });
        return orgId;
    }
})

Template.spt.rendered = function() {	
	document.title = "Journey 2 English";
}
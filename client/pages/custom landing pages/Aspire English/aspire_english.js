Template.aspire.helpers({
    organisationId: function(e){
        var orgId = null;
        Meteor.call("getOrgIdByName", "Aspire English", function(err, result){
            if(err) alert(err);
            
            orgId = result;
        });
        return orgId;
    }
})

Template.aspire.rendered = function() {	
	document.title = "Journey 2 English";
}
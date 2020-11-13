Router.route('/forums', {
	name: 'forums',
	template: 'forums',
});


Router.route('/forums/:organisation', {
	template: 'forums_org',
});

Router.route('/forums/:organisation/:group', {
	template: 'forums_org_group',
});

Router.route('/forums/:organisation/:group/:subgroup', {
	template: 'forums_org_group_subgroup',
});
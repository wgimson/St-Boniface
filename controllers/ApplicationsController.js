var Application = require('../models/application');

exports.getAllApplications = function(req, res) {
	var query = Application.find();
	query.sort({ DateOfRequest: 1 })
	     .exec(function(err, apps) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('Returning Applications from Back End');
	     	res.json(apps);
	     });
};
var Application = require('../models/application');

function getStatusCode(status) {
	switch (status) {
		case 'Submitted':
			return 1;
		case 'Approved':
			return 2;
		case 'Completed':
			return 3;
		case 'Finalized':
			return 4;
		case 'Rejected':
			return 5;
		default:
			return 1;
	}
}

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

exports.getApplicationsByStatus = function(req, res) {
	var status = req.params.status;
	var statusCode = getStatusCode(status);
	Application.find({ AppStatus: statusCode }, function(err, apps) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('Returning Applications by Status from Back End');
	     	res.json(apps);
	     });
};


exports.getApplicationById = function(req, res) {
	var id = req.params.id;
	Application.findOne({ _id: id }, function(err, app) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('Returning Application by Id from Back End');
	     	res.json(app);
	     });
};
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

exports.getApplicationStatusById = function(req, res) {
	var appId = req.params.id;
	var query = Applications.findOne({ _id: id }).select('AppStatus');
	query.exec(function (err, status) {
        if (err) {
        	console.log('Error returning app status: ' + err.message);
	     	return;
		} 
        res.json(status);
    });
}


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

exports.approveApplication = function(req, res) {
	var id = req.params.id;
	Application.update({ _id: id}, { $set: { AppStatus: 2 }}, function(err) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('application approved');
	     	return;
	     });
}
var Application = require('../models/user');

exports.getUserByNameAndPass = function(req, res) {
	var email = req.body.email,
	pass = req.body.password;
	Application.findOne({ Email: email, Pass: pass }, function(err, user) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('Returning User by Name and Pass from Back End');
	     	res.json(user);
	     });
};
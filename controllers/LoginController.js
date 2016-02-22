var User = require('../models/user');

exports.getUserByNameAndPass = function(req, res) {
	var email = req.body.email,
	pass = req.body.password;
	User.findOne({ Email: email, Pass: pass }, function(err, user) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		return;
	     	}
	     	console.log('Returning User by Name and Pass from Back End');
	     	res.json(user);
	     });
};

exports.registerUser = function(req, res) {
		var Email    = req.body.Email,
	   	    Password = req.body.Password,
	   	    FormKey  = req.body.FormKey;

	User.create({
			UName: Email,
		    Pass: Password,
		    Email: Email,
		    IsAdmin: false,
		    FormKey: FormKey
		},
		function(err, user) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		res.status(500).json(err);
	     	}
	     	console.log('user registered');
	     	res.status(200).json(user);
		});
}
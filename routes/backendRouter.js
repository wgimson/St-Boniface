var express = require('express');
var router = express.Router();
var ApplicationsController = require('../controllers/ApplicationsController');

/* GET ALL APPLICATIONS */
router.get('/applications', function(req, res) {
	return ApplicationsController.getAllApplications(req, res);
});

/* GET APPLICATIONS BY STATUS */
router.get('/applications/:status', function(req, res) {
	return ApplicationsController.getApplicationsByStatus(req, res);
});

module.exports = router;
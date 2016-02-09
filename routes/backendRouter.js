var express = require('express');
var router = express.Router();
var ApplicationsController = require('../controllers/ApplicationsController');

/* GET ALL APPLICATIONS */
router.get('/applications', function(req, res) {
	return ApplicationsController.getAllApplications(req, res);
});

/* GET APPLICATIONS BY STATUS */
router.get('/applications/status/:status', function(req, res) {
	return ApplicationsController.getApplicationsByStatus(req, res);
});

/* GET APPLICATION BY ID */
router.get('/applications/id/:id', function(req, res) {
	return ApplicationsController.getApplicationById(req, res);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var ApplicationsController = require('../controllers/ApplicationsController');

/* GET ALL BOOKS */
router.get('/applications', function(req, res) {
	return ApplicationsController.getAllApplications(req, res);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var ApplicationsController = require('../controllers/ApplicationsController');
var LoginController = require('../controllers/LoginController');

/* GET ALL APPLICATIONS */
router.get('/applications', function(req, res) {
	return ApplicationsController.getAllApplications(req, res);
});

/* GET APPLICATIONS BY STATUS */
router.get('/applications/status/:status', function(req, res) {
	return ApplicationsController.getApplicationsByStatus(req, res);
});

/* GET APPLICATION STATUS BY ID */
router.get('/applications/status/id/:id', function(req, res) {
	return ApplicationsController.getApplicationStatusById(req, res);
});

/* GET APPLICATION BY ID */
router.get('/applications/id/:id', function(req, res) {
	return ApplicationsController.getApplicationById(req, res);
});

/* APPROVE APPLICATION */
router.post('/applications/approve/id/:id', function(req, res) {
	return ApplicationsController.approveApplication(req, res);
});

/* GET USER BY USERNAME AND PASSWORD */
router.post('/user/', function(req, res) {
	return LoginController.getUserByNameAndPass(req, res);
});

/* GET USER BY USERNAME AND PASSWORD */
router.post('/user/register', function(req, res) {
	return LoginController.registerUser(req, res);
});

/* SUBMIT APPLICATION */
router.post('/applications/submit', function(req, res) {
	return ApplicationsController.submitApplication(req, res);
})

/* COMPLETE APPLICATION */
router.post('/applications/complete/id/:id', function(req, res) {
	return ApplicationsController.completeApplication(req, res);
});

/* FINALIZE APPLICATION */
router.post('/applications/finalize/id/:id', function(req, res) {
	return ApplicationsController.finalizeApplication(req, res);
});

module.exports = router;
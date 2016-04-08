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
	var query = Application.findOne({ _id: appId }).select('AppStatus');
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

exports.submitApplication = function(req, res) {
	var FirstName = req.body.FirstName,
	    LastName = req.body.LastName,
	    MiddleInitial = req.body.MiddleInitial,
	    RequestDate = req.body.RequestDate,
	    Title = req.body.Title,
		Occupation = req.body.Occupation,
	    CellPhone = req.body.CellPhone,
	    Email = req.body.Email,
	    Purpose = req.body.Purpose,
	    PaidFor = req.body.PaidFor,
		FirstTime = req.body.FirstTime,
		NumberInTrip = req.body.NumberInTrip,
		Sponsor = req.body.Sponsor,
		SponsorInHaiti = req.body.SponsorInHaiti,
		SponsorCell = req.body.SponsorCell,
		SponsorRelationship = req.body.SponsorRelationship,
		Visitors = req.body.Visitors,
		Requested = req.body.Requested,
		AirTransport = req.body.AirTransport,
		SpecialRoutingInfo = req.body.SpecialRoutingInfo,
		AirfareExpense = req.body.AirfareExpense,
		GroundExpense = req.body.GroundExpense,
		EvacExpense = req.body.EvacExpense,
		OtherExpense = req.body.OtherExpense,
		FrenchSpeaking = req.body.FrenchSpeaking,
		VisitorWillStay = req.body.VisitorWillStay,
		BookedByNewton = req.body.BookedByNewton,
		DirectExpense = req.body.DirectExpense,
		ReimbursableExpense = req.body.ReimbursableExpense,
		TypeOfVisit = req.body.TypeOfVisit,
		Fees = req.body.Fees,
	    AppStatus = req.body.AppStatus;

	Application.create({
					FirstName: FirstName,
					LastName: LastName,
					MiddleInitial: MiddleInitial,
					RequestDate: RequestDate,
					Title: Title,
					Occupation: Occupation,
					CellPhone: CellPhone,
					Email: Email,
					Purpose: Purpose,
					PaidFor: PaidFor,
					FirstTime: FirstTime,
					NumberInTrip: NumberInTrip,
					Sponsor: Sponsor,
					SponsorInHaiti: SponsorInHaiti,
					SponsorCell: SponsorCell,
					SponsorRelationship: SponsorRelationship,
					Requested: Requested,
					Visitors: Visitors,
					AirTransport: AirTransport,
					SpecialRoutingInfo: SpecialRoutingInfo,
					AirfareExpense: AirfareExpense,
					GroundExpense: GroundExpense,
					EvacExpense: EvacExpense,
					OtherExpense: OtherExpense,
					FrenchSpeaking: FrenchSpeaking,
					VisitorWillStay: VisitorWillStay,
					BookedByNewton: BookedByNewton,
					DirectExpense: DirectExpense,
					ReimbursableExpense: ReimbursableExpense,
					TypeOfVisit: TypeOfVisit,
					Fees: Fees,
					AppStatus: AppStatus
				},
				function(err, app) {
			     	if (err) {
			     		console.log('Back End Error: ' + err.message);
			     		res.status(500).json(err);
			     	}
			     	console.log('application created');
			     	res.status(200).json(app);
				});
}; 

exports.approveApplication = function(req, res) {
	var id = req.params.id;
	Application.update({ _id: id}, { $set: { AppStatus: 2 }}, function(err, app) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		res.status(500).json(err);
	     	}
	     	console.log('application approved');
	     	res.status(200).json({ newStatus: 2});
	     });
};

exports.completeApplication = function(req, res) {
	var id = req.params.id;
	var DateOfBirth 			 = req.body.DateOfBirth,
		Cell 					 = req.body.Cell,
		Email 					 = req.body.Email,
		EmergencyContact 		 = req.body.EmergencyContact,
		EmergencyContactCell 	 = req.body.EmergencyContactCell,
		PassportNumber 			 = req.body.PassportNumber,
		PassportCountry 		 = req.body.PassportCountry,
		IsInternationalVisitor   = req.body.IsInternationalVisitor,
		HasVisitorHandbook 		 = req.body.HasVisitorHandbook,
		FeesCollectedAtResidence = req.body.FeesCollectedAtResidence,
		NeedLodging 			 = req.body.NeedLodging,
		NeedMeals 				 = req.body.NeedMeals,
		NeedOther 				 = req.body.NeedOther,
		TripAdded 				 = req.body.TripAdded,
		CoordinatorNotified 	 = req.body.CoordinatorNotified,
		MedEvacInsurance 		 = req.body.MedEvacInsurance,
		VolunteerWaiver 		 = req.body.VolunteerWaiver,
		AdditionalInfo 			 = req.body.AdditionalInfo

	Application.update({ _id: id}, { $set: 
		{ 
			AppStatus 				: 3,
			DateOfBirth 			: DateOfBirth,
			Cell 					: Cell,
			Email 					: Email,
			EmergencyContact 		: EmergencyContact,
			EmergencyContactCell	: EmergencyContactCell,
			PassportNumber			: PassportNumber,
			PassportCountry         : PassportCountry,
			IsInternationalVisitor  : IsInternationalVisitor,
			HasVisitorHandbook      : HasVisitorHandbook,
			FeesCollectedAtResidence: FeesCollectedAtResidence,
			NeedLodging				: NeedLodging,
			NeedMeals    			: NeedMeals,
			NeedOther 				: NeedOther,
			TripAdded 				: TripAdded,
			CoordinatorNotified		: CoordinatorNotified,
			MedEvacInsurance 		: MedEvacInsurance,
			VolunteerWaiver 		: VolunteerWaiver,
			AdditionalInfo 			: AdditionalInfo
		}
	}, function(err, app) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		res.status(500).json(err);
	     	}
	     	console.log('application completed');
	     	res.status(200).json({ newStatus: 3});
	});
};

exports.finalizeApplication = function(req, res) {
	var id = req.params.id;
	Application.update({ _id: id}, { $set: { AppStatus: 4 }}, function(err, app) {
	     	if (err) {
	     		console.log('Back End Error: ' + err.message);
	     		res.status(500).json(err);
	     	}
	     	console.log('application finalized');
	     	res.status(200).json({ newStatus: 4});
	     });
};
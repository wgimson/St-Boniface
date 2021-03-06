var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appSchema = new Schema({
	LastName: {
		type: String
	},
	FirstName: {
		type: String
	},
	MiddleInitial: {
		type: String
	},
	RequestDate: {
		type: Date
	},
	Title: {
		type: String
	},
	Occupation: {
		type: String
	},
	CellPhone: {
		type: String
	},
	Email: {
		type: String
	},
	Purpose: {
		type: String
	},
	PaidFor: {
		type: Boolean
	},
	FirstTime: {
		type: Boolean
	},
	NumberInTrip: {
		type: Number
	},
	Sponsor: {
		type: String
	},
	SponsorInHaiti: {
		type: Boolean
	},
	SponsorCell: {
		type: String
	},
	SponsorRelationship: {
		type: String
	},
	Requested: {
		type: Boolean
	},
	AirTransport: {
		type: String
	},
	SpecialRoutingInfo: {
		type: String
	},
	AirfareExpense: {
		type: Number
	},
	GroundExpense: {
		type: Number
	},
	EvacExpense: {
		type: Number
	},
	OtherExpense: {
		type: Number
	},
	FrenchSpeaking: {
		type: Boolean
	},
	/*Visitors: {
		type: [Schema.Types.Mixed]
	},*/
	Visitors: {
		type: [{ maleOrFemale: String, departureDate: Date, arrivalDate: Date, name: String }]
	},
	VisitorWillStay: {
		type: Boolean
	},
	BookedByNewton: {
		type: Boolean
	},
	DirectExpense: {
		type: Number
	},
	ReimbursableExpense: {
		type: Number
	},
	TypeOfVisit: {
		type: String
	},
	Fees: {
		type: Number
	},
	AppStatus: {
		type: Number
	},
	DateOfBirth: {
		type: Date
	},
	Cell: {
		type: String
	},
	Email: {
		type: String
	},
	EmergencyContact: {
		type: String
	},
	EmergencyContactCell: {
		type: String
	},
	PassportNumber: {
		type: String
	},
	PassportCountry: {
		type: String
	},
	IsInternationalVisitor: {
		type: Boolean
	},
	HasVisitorHandbook: {
		type: Boolean
	},
	FeesCollectedAtResidence: {
		type: Boolean
	},
	NeedLodging: {
		type: Boolean
	},
	NeedMeals: {
		type: Boolean
	},
	NeedOther: {
		type: Boolean
	},
	TripAdded: {
		type: Boolean
	},
	CoordinatorNotified: {
		type: Boolean
	},
	MedEvacInsurance: {
		type: Boolean
	},
	VolunteerWaiver: {
		type: Boolean
	},
	AdditionalInfo: {
		type: String
	}
}, { collection: 'Applications' });

module.exports = mongoose.model('Application', appSchema);
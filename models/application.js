var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appSchema = new Schema({
	LastName: {
		type: String
	},
	FirstName: {
		type: String
	},
	RequestDate: {
		type: Date
	},
	CellPhone: {
		type: String
	},
	Email: {
		type: String
	},
	PurposeOfTrip: {
		type: String
	},
	NumberInGroup: {
		type: Number
	},
	AppStatus: {
		type: Number
	}
}, { collection: 'Applications' });

module.exports = mongoose.model('Application', appSchema);
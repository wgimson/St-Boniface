var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	UName: {
		type: String
	},
	Pass: {
		type: String
	},
	IsAdmin: {
		type: Boolean
	},
	Email: {
		type: String
	},
	FormKey: {
		type: String
	}
}, { collection: 'Users' });

module.exports = mongoose.model('Users', userSchema);
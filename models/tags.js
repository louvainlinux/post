module.exports = {
	id: {type: 'increments', nullable: false, primary: true},
	name: {type: 'string', maxlength: 254, nullable: false, unique: true}
}
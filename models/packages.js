module.exports = {
	id: {type: 'increments', nullable: false, primary: true},
	name: {type: 'string', maxlength: 254, nullable: false, unique: true},
	descriptionShort: {type: 'string', maxlength: 1024, nullable: false},
	descriptionLong: {type: 'text', maxlength: 1677215, nullable: false},
	preSelected: {type: 'integer', nullable: false, unsigned: true}
}
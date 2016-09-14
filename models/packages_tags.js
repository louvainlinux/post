module.exports = {
	id: {type: 'increments', nullable: false, primary: true},
	package_id: {type: 'integer', nullable: false, unsigned: true},
	tag_id: {type: 'integer', nullable: false, unsigned: true}
}
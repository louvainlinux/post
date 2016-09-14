module.exports = {
	id: {type: 'increments', nullable: false, primary: true},
	package_id: {type: 'integer', nullable: false, unsigned: true},
	category_id: {type: 'integer', nullable: false, unsigned: true}
}
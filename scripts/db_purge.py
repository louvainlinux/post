import mysql.connector

package_path = "../config/package"
description_name = "pkg.yml"
dest_path = "../temp"
dest_tag = "tag.json"
dest_category = "category.json"
dest_package = "package.json"
dest_primary_install = "primary_install.json"
dest_alternate_install = "alternate_install.json"

def dummy_config_reader():
	config = {}
	with open("./config/db_config.js", 'r') as f:
		for i in f:
			if '{' in i or '}' in i:
				pass
			else:
				config[i.strip().split(':')[0]] = i.strip().split("'")[1]
	return config

if __name__ == "__main__":
	config = dummy_config_reader();
	conn = mysql.connector.connect(host=config["host"],user=config["user"],password=config["password"], database=config["database"])
	cursor = conn.cursor()
	
	cursor.execute("show tables")
	tables = cursor.fetchall()
	for i in tables:
		cursor.execute("drop table %s" % i)
		conn.commit()
	

	cursor.close()
	conn.close()
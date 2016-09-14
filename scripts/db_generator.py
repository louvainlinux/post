import yaml
import shutil
import os
import json
import sys
import mysql.connector

package_path = "./config/package"
description_name = "pkg.yml"
dest_path = "./temp"
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

def insert_tag(conn,cursor):
	tag_list = []
	tag_dict = {}
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		for j in os.listdir(package_folder):
			if j == "pkg.yml":
				with open(os.path.join(package_folder, j), 'r') as f:
					load = yaml.load(f)
				for tag in load["tag"]:
					t = tag.lower()
					if t not in tag_list:
						tag_list.append(t)
	for i in tag_list:
		cursor.execute("INSERT INTO tags (name) VALUES ('%s')" % i)
		conn.commit()
		tag_dict[i] = cursor.lastrowid
	return tag_dict

def insert_category(conn, cursor):
	category_list = []
	category_dict = {}
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		for j in os.listdir(package_folder):
			if j == "pkg.yml":
				with open(os.path.join(package_folder, j), 'r') as f:
					load = yaml.load(f)
				for category in load["category"]:
					cat = category.lower()
					if cat not in category_list:
						category_list.append(cat)
	for i in category_list:
		cursor.execute("INSERT INTO categories (name) VALUES ('%s')" % i)
		conn.commit()
		category_dict[i] = cursor.lastrowid
	return category_dict

def insert_package_waterfall(conn, cursor, tag_dict, cat_dict):
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		with open(os.path.join(package_folder, "pkg.yml"), 'r') as f:
			load = yaml.load(f)	
		package = {}
		package["name"] = load["name"]
		package["descriptionShort"] = load["description"]["short"]
		package["descriptionLong"] = load["description"]["long"]
		package["preSelected"] = 1 if load["preselected"] else 0
		package["category"] = list(set([c.lower() for c in load["category"]]))
		package["tag"] = list(set([t.lower() for t in load["tag"]]))

		cursor.execute("INSERT INTO packages (name, descriptionShort, descriptionLong, preSelected) VALUES ('%s', '%s', '%s', %i)" % (package["name"], package["descriptionShort"], package["descriptionLong"], package["preSelected"]))
		conn.commit()
		package_id = cursor.lastrowid

		for tag in package["tag"]:
			cursor.execute("INSERT INTO packages_tags (package_id, tag_id) VALUES (%i, %i)" % (package_id, tag_dict[tag]))
			conn.commit()
		for cat in package["category"]:
			cursor.execute("INSERT INTO packages_categories (package_id, category_id) VALUES (%i, %i)" % (package_id, cat_dict[cat]))
			conn.commit()

		for j in os.listdir(package_folder):
			if j != "pkg.yml":
				with open(os.path.join(package_folder, j), 'r') as f:
					load = yaml.load(f)
				install = {}
				install["name"] = package["name"]
				version = ""
				s = len(j.split("."))
				if  s == 2:
					version = j
				else: 
					if s == 3:
						version = j.split(".")[0] + '.' + j.split(".")[1]
					else:
						print("error, bad format")
						print("aborting")
						sys.exit()
				install["version"] = version
				install["installPre"] = load["primary"]["pre"]
				install["installCustom"] = load["primary"]["install"]
				install["installPost"] = load["primary"]["post"]
				cursor.execute("INSERT INTO installs (name, version, preInstall, install, postInstall, package_id) VALUES ('%s','%s','%s','%s','%s',%i)" % (install["name"], install["version"], install["installPre"], install["installCustom"], install["installPost"], package_id))								
				conn.commit()

				install_id = cursor.lastrowid

				for k in load["alternate"]:
					alternate = {}
					alternate["name"] = package["name"]
					alternate["description"] = k["description"]
					alternate["installPre"] = k["pre"]
					alternate["installCustom"] = k["install"]
					alternate["installPost"] = k["post"]
					cursor.execute("INSERT INTO alternates (name, description, preInstall, install, postInstall, package_id) VALUES ('%s','%s','%s','%s','%s',%i)" % (install["name"], install["version"], install["installPre"], install["installCustom"], install["installPost"], package_id))								
					conn.commit()


if __name__ == "__main__":
	config = dummy_config_reader();
	conn = mysql.connector.connect(host=config["host"],user=config["user"],password=config["password"], database=config["database"])
	cursor = conn.cursor()
	
	tag_id = insert_tag(conn,cursor)
	cat_id = insert_category(conn, cursor)

	insert_package_waterfall(conn, cursor, tag_id, cat_id)

	cursor.close()
	conn.close()
import yaml
import shutil
import os
import json
import sys

package_path = "../config/package"
description_name = "pkg.yml"
dest_path = "../temp"
dest_tag = "tag.json"
dest_category = "category.json"
dest_package = "package.json"
dest_primary_install = "primary_install.json"
dest_alternate_install = "alternate_install.json"


# DONE
def clean_file():
	shutil.rmtree(dest_path)
	os.makedirs(dest_path)

# DONE
def tag_generator():
	tag_list = []
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
	json_tag = {}
	json_tag["tag"] = tag_list
	with open(os.path.join(os.path.abspath(dest_path), dest_tag), 'w') as f:
		f.write(json.dumps(json_tag))

# DONE
def category_generator():
	category_list = []
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
	json_cat = {}
	json_cat["category"] = category_list
	with open(os.path.join(os.path.abspath(dest_path), dest_category), 'w') as f:
		f.write(json.dumps(json_cat))	

# DONE 
def main_install_generator():
	install_list = []
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		with open(os.path.join(package_folder, "pkg.yml"), 'r') as f:
			package = yaml.load(f)
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
				install_list.append(install)
	
	with open(os.path.join(os.path.abspath(dest_path), dest_primary_install), 'w') as f:
		f.write(json.dumps(install_list))

# DONE
def alternate_install_generator():
	install_list = []
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		with open(os.path.join(package_folder, "pkg.yml"), 'r') as f:
			package = yaml.load(f)
		for j in os.listdir(package_folder):
			if j != "pkg.yml":
				with open(os.path.join(package_folder, j), 'r') as f:
					load = yaml.load(f)
				for k in load["alternate"]:
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
					install["description"] = k["description"]
					install["installPre"] = k["pre"]
					install["installCustom"] = k["install"]
					install["installPost"] = k["post"]
					install_list.append(install)
	
	with open(os.path.join(os.path.abspath(dest_path), dest_alternate_install), 'w') as f:
		f.write(json.dumps(install_list))

# DONE
def package_generator():
	package_list = []
	for i in os.listdir(package_path):
		package_folder = os.path.join(os.path.abspath(package_path), i)
		for j in os.listdir(package_folder):
			if j == "pkg.yml":
				with open(os.path.join(package_folder, j), 'r') as f:
					load = yaml.load(f)
				package = {}
				package["name"] = load["name"]
				package["descriptionShort"] = load["description"]["short"]
				package["descriptionLong"] = load["description"]["long"]
				package["preSelected"] = load["preselected"]
				package["category"] = list(set([c.lower() for c in load["category"]]))
				package["tag"] = list(set([t.lower() for t in load["tag"]]))
				package_list.append(package)
	with open(os.path.join(os.path.abspath(dest_path), dest_package), 'w') as f:
		f.write(json.dumps(package_list))

if __name__ == "__main__":
	clean_file()
	tag_generator()
	category_generator()
	package_generator()
	main_install_generator()
	alternate_install_generator()


# TODO HAVE TO CHECK FOR NULLABLE FIELD (not required) in yaml file. (if none, just put "NOPE" in the field)
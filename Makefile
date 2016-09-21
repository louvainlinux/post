run:	
	node index.js

db:
	python3 scripts/db_purge.py
	node models/migrate.js
	python3 scripts/db_generator.py

update:
	git pull origin master



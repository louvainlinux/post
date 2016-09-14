first connect to mysql from command line
then SET FOREIGN_KEY_CHECKS = 0
then SHOW TABLES and DROP TABLE <table_name>
then SET FOREIGN_KEY_CHECKS = 1

then run python script to validate yaml files
then run python script to generate json files

then run node migrates.js on models

then populate the db based on json file
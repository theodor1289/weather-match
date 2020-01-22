### Installation instructions:

Make sure everything is up to date:
```
sudo apt update
sudo apt-get update
```

Install 'PostgreSQL' (make sure you already have the apt repository):
```
sudo apt install postgresql postgresql-contrib
```

Install 'pgAdmin4' for a Graphical User Interface:
```
sudo apt-get install pgadmin4
```

By default, the postgres user has no password and can hence only connect if ran by the postgres system user. The following commands will assign it:
```
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

Create 'weathermatch' database:
```
sudo -u postgres psql -c "CREATE DATABASE weathermatch;"
sudo -u postgres psql -c "ALTER DATABASE weathermatch SET TIMEZONE TO 'UTC';"
```

To drop a database (e.g. named 'postgres'):
```
sudo -u postgres psql -c "DROP DATABASE IF EXISTS postgres;"
```

### Start the database:
```
sudo service postgresql start
```

Connect to 'weathermatch' database by launching 'pgAdmin4' and following the instructions:
```
Name: weathermatch
Host name: localhost
Maintenance database: weathermatch
Username: postgres
Password: postgres
```

When you're done, stop the server:
```
sudo service postgresql stop
```

### Common PostgreSQL queries I've used for this database:
```
SELECT COUNT(*) FROM City;

SELECT * FROM City
FETCH FIRST 10 ROWS ONLY

SELECT * FROM 
(SELECT * FROM CITY WHERE TIMESTAMP IS NOT NULL) AS updated_cities
FETCH FIRST 10 ROWS ONLY

SELECT COUNT(*) FROM 
(SELECT * FROM CITY WHERE TIMESTAMP IS NOT NULL) AS updated_cities
FETCH FIRST 10 ROWS ONLY

SELECT * FROM Current_Batch;
```

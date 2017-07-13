# Backend for Chronos

Chronos-frontend application can be found [here](https://github.com/ga92yup/chronos-frontend)

## Prerequisites

Both for the backend and frontend check

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

go to your project root folder via command line

**install node dependencies**

```
npm install
```

**set up your database**

* create a new directory where your database will be stored
* start the database server 
```
mongod --dbpath relative/path/to/database
```
* create all database schemes and import data to begin with 
```
mongorestore dump/
```

**set up environment configuration**

copy one of the config files in the config directory and rename it to `config.js`. DO NOT check in your config.js file into source control. If you make a changes that your team members should be able to see (e.g. introducing a new config variable), change it in `config.dev_local.js`

You can also create more example config files in your `config` directory, e.g. `config.dev_server` for your development server. 

## running

start the web server

```
node server.js
```

## Inspect the database

* Make sure the database is running
* Open a new command line and start mongo shell from the mongodb directory (or add mongodb directory to PATH). 

```
mongo
```

See what is stored in timelines:

```
show dbs
use <chronosdb>
show collections
db.timelines.find()
```

All commands
```
db.help()                    help on db methods
db.mycoll.help()             help on collection methods
sh.help()                    sharding helpers
rs.help()                    replica set helpers
help admin                   administrative help
help connect                 connecting to a db help
help keys                    key shortcuts
help misc                    misc things to know
help mr                      mapreduce

show dbs                     show database names
show collections             show collections in current database
show users                   show users in current database
show profile                 show most recent system.profile entries with time >= 1ms
show logs                    show the accessible logger names
show log [name]              prints out the last segment of log in memory, 'global' is default
use <db_name>                set current database
db.foo.find()                list objects in collection foo
db.foo.find( { a : 1 } )     list objects in foo where a == 1
it                           result of the last line evaluated; use to further iterate
DBQuery.shellBatchSize = x   set default number of items to display on shell
exit                         quit the mongo shell
```

## testing

**Important** Make sure that mocha is installed globally as it is specified in [documentation](https://mochajs.org/#installation). 

Some tests are already implemented using the test framework mocha: Simply run

```
mocha
```

...and hope that all tests will pass.

**Alternative/Additionally:** you could also use postman [postman](https://www.getpostman.com/)
You need to import the test and environment from `test/rest.json.postman_collection` and `test/localhost.postman_environment`

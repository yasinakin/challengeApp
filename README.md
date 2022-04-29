# challengeApp
## Requirements
#virtualbox and vagrant
1. sudo apt install virtualbox
2. sudo apt-get install vagrant

## Run in vagrant-jenkins directory
1. vagrant init 
2. vagrant up 

## Application details
All services started by docker-compose.yml file. In this file application images build in here.
Rabitmq takes data and send redis with queue for set in database. After ser process redis gets data and write to mongo db for percistency.

## Jenkins
Jenkins pulls repo and runs the docker-compose.yml file

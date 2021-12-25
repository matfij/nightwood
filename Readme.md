# Nightwood
Independently developed, open-source browser game written in Angular and NestJS.

Adopt, personalize and train dragons to participate in expeditions and battles to collect mythical items and gain glory ...
The game is slow-paced and non-time intensive, suitable for both individual players and cooperation.

## MVP Features
 - Dialog-based dragon adoption [100%]
 - Dragon feeding & base stats [100%]
 - Items & expeditions [40%]
 - Combat system [5%]
 - Breed-specific skills [5%]
 - Players messaging & live chat [0%]
 - Auction house [10%]

## Requirements
 - Docker, Docker Compose
 - 10 GB of disk space
 - Node.js, npm (optional)
 - Angular CLI (optional)
 - NestJS CLI (optional)

 ## Client generation
 - Requires .Net Core 2.1 SDK
 - Start backend application to generate schema.json: `make start`
 - Run NSwag: `make client.gen.nswag`

## Quic start
1. Allow file sharing inside application folder in Docker settings
```sh 
docker-compose up
```

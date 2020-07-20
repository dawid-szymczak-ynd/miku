# MikuCredit

Visit [Miku Credit](http://mikucredit.com/) to learn more our products.

# Lunch locally

`docker-compose -f ./development/docker-compose.dev.yml build`

`docker-compose -f ./development/docker-compose.dev.yml up -d`

# Lunch on AWS

Fetch miku-credit-infrastructure repository and run `eksctl create cluster -f ./miku-credit.yaml`

# Troubleshooting

- docker needs at least 4 GB memory, I was going with 8 GB
- changes sometimes are not populating inside containers, `sysctl -w kern.maxfiles=120000` helps [link to artcile](https://krypted.com/mac-os-x/maximum-files-in-mac-os-x/)

# Architecture Overview

Miku Credit has three basic services:

- BookKeeper - responsible for calculation
- SubcriptioMuneris - responsible for storing user credit history
- ApiGateway - responsible for auth user and provide InputAdapter Layer

<p align="center"><img src="https://user-images.githubusercontent.com/24222035/87349424-8eb04f00-c556-11ea-9fc9-e3249eeb5a65.png" width="450px"></p>

# Founder

Dynamic young women, fascinates with tech and australian cuisine.

<p align="center"><img src="https://user-images.githubusercontent.com/24222035/87349584-cfa86380-c556-11ea-88e3-7af2211d87f6.png" width="450px"></p>

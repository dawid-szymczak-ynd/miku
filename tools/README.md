# tools

Required tools for maintain monorepo and gitlab CI

## Deploy script

`npm run deploy`

script runs `helm upgrade` to deploy affected apps

## PushImages script

`npm run push-images`

script runs `docker build` to build images and push them to repository, images are tagged by commit hash

## RemoveUat script

`npm run remove-uat`

script runs `helm delete` to delete old uat deployments

## S3Upload script

`npm run s3-upload`

script uses s3-cli to upload s3 objects for affected app which has s3Config.enabled set on true

## SetConfig script

`npm run set-config`

script uses writeFileSync to create new environment files for affected apps, and rewrite angular.json to set deployUrl for current environment

## Gitlab CI

These tools are strongly connected with gitlab-ci so there is snapshot test which helps stay in sync

## Running unit tests

Run `ng test tools` to execute the unit tests via [Jest](https://jestjs.io).

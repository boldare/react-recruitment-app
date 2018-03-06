#!/bin/bash

if [ "$NODE_ENV" = "production" ]
then
    yarn && yarn build:client && yarn global add serve && yarn serve -s -p "$CLIENT_PORT" build
else
    yarn && yarn start:client
fi

while true; do echo a >> /dev/null ; sleep 1; done

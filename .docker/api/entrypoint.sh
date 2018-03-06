#!/bin/bash

if [ "$NODE_ENV" = "production" ]
then
  yarn && DATABASE=mongo yarn start:server
else
  yarn && DATABASE=mongo yarn dev:server
fi

while true; do echo a >> /dev/null ; sleep 1; done

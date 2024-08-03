#!/bin/bash

# PRODUCTION
git reset --hard
git checkout origin master
git pull origin master

docker compose up -d
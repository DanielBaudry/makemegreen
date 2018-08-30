#!/bin/bash
set -x
cd /opt/services/flaskapp/src
pip install -r requirements.txt
sleep 3 # This leaves time for Postgres to create the DB
while true; do
    python app.py
    sleep 2
done

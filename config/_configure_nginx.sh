#!/bin/bash

sudo cp ./example.nginx.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/example.nginx.conf /etc/nginx/sites-enabled/example.nginx.conf
sudo service nginx reload
#!/bin/bash
# VPS Deploy Script — agetolabs
set -e

APP_DIR="/home/agetolabs"

echo ">>> Pulling latest code..."
cd $APP_DIR
git pull origin main

echo ">>> Installing dependencies..."
npm ci --production=false

echo ">>> Building..."
npm run build

echo ">>> Restarting pm2..."
pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js

echo ">>> Done!"
pm2 status

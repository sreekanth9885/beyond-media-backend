#!/bin/bash

set -e

echo "Starting deployment..."

cd /docker/beyond-media-backend

echo "Pulling latest code..."
git pull origin main

echo "Building Docker image..."
docker compose build api

echo "Restarting API container..."
docker compose up -d --no-deps api

echo "Cleaning unused images..."
docker image prune -f

echo "Deployment completed successfully!"

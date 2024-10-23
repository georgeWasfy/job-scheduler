#!/bin/bash
set -e

npm run db:migrate:up & PID=$!
# Wait for migration to finish
wait $PID

npm run db:seed & PID=$!
# Wait for seed to finish
wait $PID

echo "Starting production server..."
npm run start & PID=$!

wait $PID
#!/bin/bash

echo "🚨 DEPLOYING HEALTH ENDPOINT FIX"
echo "================================"

# ไปที่ backend directory ที่ถูกต้อง
cd "/Volumes/Back up data Devjuu/pbwebsitebackend"

echo "📁 Current directory: $(pwd)"

# Commit และ deploy
echo "💾 Committing health endpoint fix..."
git add server.js
git commit -m "Add health check endpoint - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Deploying to Heroku..."
git push heroku main

echo "⏳ Waiting for deployment to complete..."
sleep 10

echo "🔍 Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/health)
echo "Health check response: $HEALTH_RESPONSE"

echo ""
echo "🎉 DEPLOYMENT COMPLETED!"
echo ""
echo "📋 Expected result:"
echo '{"status":"OK","message":"Server is running"}'
echo ""
echo "✅ Next steps:"
echo "1. Test van assets endpoints"
echo "2. Check Admin Dashboard"
echo "3. Try uploading files" 
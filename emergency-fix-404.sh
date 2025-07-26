#!/bin/bash

echo "🚨 EMERGENCY FIX: 404 Error on Van Assets"
echo "=========================================="

# ตรวจสอบ Heroku CLI
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found!"
    echo "Please install: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# ตรวจสอบ login
echo "🔐 Checking Heroku login..."
if ! heroku auth:whoami &> /dev/null; then
    echo "Please login to Heroku:"
    heroku login
fi

echo "📁 Going to backend directory..."
cd backend

# ตรวจสอบ git
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for van assets"
fi

# เพิ่ม Heroku remote
echo "🔗 Adding Heroku remote..."
heroku git:remote -a pbbackend-api-4e56bf125d15

# Commit และ deploy
echo "💾 Committing changes..."
git add .
git commit -m "EMERGENCY FIX: Add van assets routes - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Deploying to Heroku..."
git push heroku main

echo "⏳ Waiting for deployment to complete..."
sleep 10

echo "🔍 Testing deployment..."

# ทดสอบ health check
echo "🏥 Health check:"
HEALTH_RESPONSE=$(curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/health)
echo "$HEALTH_RESPONSE"

# ทดสอบ van assets endpoints
echo ""
echo "📸 Testing van images endpoint:"
IMAGES_RESPONSE=$(curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images)
echo "$IMAGES_RESPONSE"

echo ""
echo "🎥 Testing van videos endpoint:"
VIDEOS_RESPONSE=$(curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/videos)
echo "$VIDEOS_RESPONSE"

echo ""
echo "🎉 EMERGENCY FIX COMPLETED!"
echo ""
echo "📋 Verification:"
echo "1. Health check should return: {\"status\":\"OK\",\"message\":\"Server is running\"}"
echo "2. Van assets endpoints should return JSON arrays (even if empty)"
echo ""
echo "🔧 If still getting 404:"
echo "1. Check logs: heroku logs --tail -a pbbackend-api-4e56bf125d15"
echo "2. Restart app: heroku restart -a pbbackend-api-4e56bf125d15"
echo "3. Check environment variables: heroku config -a pbbackend-api-4e56bf125d15"
echo ""
echo "✅ Next steps:"
echo "1. Test Admin Dashboard at /admin"
echo "2. Go to 'Van Assets' section"
echo "3. Try uploading a file" 
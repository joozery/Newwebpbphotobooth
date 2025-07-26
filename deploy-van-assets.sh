#!/bin/bash

# Van Assets Deployment Script
# ใช้สำหรับ deploy van assets feature ไปยัง Heroku

echo "🚀 Starting Van Assets Deployment..."

# ตรวจสอบว่า Heroku CLI ติดตั้งแล้วหรือไม่
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it first."
    echo "   Visit: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# ตรวจสอบว่า login แล้วหรือไม่
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Please login to Heroku first:"
    heroku login
fi

# ไปที่ backend directory
cd backend

echo "📁 Current directory: $(pwd)"

# ตรวจสอบว่าเป็น git repository หรือไม่
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit for van assets"
fi

# ตรวจสอบ Heroku remote
if ! git remote | grep -q "heroku"; then
    echo "🔗 Adding Heroku remote..."
    heroku git:remote -a pbbackend-api-4e56bf125d15
fi

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Add van assets management system

- Add vanAssets.js route for image and video management
- Add van_images and van_videos database tables
- Add upload, CRUD operations for van assets
- Add category and status management
- Add order management for display order"

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku main

# ตรวจสอบ deployment
echo "✅ Deployment completed!"
echo "🔍 Checking deployment status..."

# ทดสอบ health check
echo "🏥 Testing health check..."
curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/health

echo ""
echo "🎉 Van Assets deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Test the API endpoints:"
echo "   - GET https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images"
echo "   - GET https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/videos"
echo ""
echo "2. Check the Admin Dashboard:"
echo "   - Go to /admin"
echo "   - Click on 'Van Assets'"
echo "   - Test upload functionality"
echo ""
echo "3. If you encounter issues:"
echo "   - Check logs: heroku logs --tail -a pbbackend-api-4e56bf125d15"
echo "   - Verify database tables exist"
echo "   - Check environment variables"
echo ""
echo "📚 For more information, see DEPLOYMENT_VAN_ASSETS.md" 
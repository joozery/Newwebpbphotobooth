#!/bin/bash

echo "🚀 Deploying Van Assets to Heroku..."

# ไปที่ backend directory
cd backend

echo "📁 Current directory: $(pwd)"

# ตรวจสอบว่าเป็น git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# ตรวจสอบ Heroku remote
if ! git remote | grep -q "heroku"; then
    echo "🔗 Adding Heroku remote..."
    heroku git:remote -a pbbackend-api-4e56bf125d15
fi

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Add van assets management system - $(date)"

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku main

echo "✅ Deployment completed!"
echo ""
echo "🔍 Testing endpoints..."
sleep 5

# ทดสอบ endpoints
echo "🏥 Health check:"
curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/health

echo ""
echo "📸 Van images endpoint:"
curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images

echo ""
echo "🎥 Van videos endpoint:"
curl -s https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/videos

echo ""
echo "🎉 Deployment and testing completed!"
echo ""
echo "📋 Next steps:"
echo "1. Check Admin Dashboard at /admin"
echo "2. Go to 'Van Assets' section"
echo "3. Test upload functionality"
echo ""
echo "📚 For troubleshooting, see quick-fix-404.md" 
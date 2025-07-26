#!/bin/bash

# Frontend Deployment Script for Google Reviews Widget Update
# This script deploys the updated frontend with new Google Reviews widget

echo "🚀 Starting Frontend Deployment for Google Reviews Widget Update..."

# Navigate to frontend directory
cd /Volumes/Back\ up\ data\ Devjuu/Newwebpbphotobooth/frontend

echo "📁 Current directory: $(pwd)"

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

echo "🔍 Checking git status..."
git status

echo "📦 Adding all changes to git..."
git add .

echo "💾 Committing changes..."
git commit -m "Update Google Reviews widget to Beaver Codes

- Replace Elfsight widget with Beaver Codes Google Reviews
- Update script source to https://reviews.beaver.codes/widget/web-google-reviews.js
- Use instance ID: DswgK8ewF6yruCmKCjzr
- Maintain async loading for better performance"

echo "🚀 Pushing to remote repository..."
git push

echo "✅ Frontend deployment completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   - Replaced Elfsight Google Reviews widget"
echo "   - Updated to Beaver Codes Google Reviews widget"
echo "   - New script source: reviews.beaver.codes"
echo "   - Instance ID: DswgK8ewF6yruCmKCjzr"
echo ""
echo "🌐 Next steps:"
echo "   1. Test the new Google Reviews widget"
echo "   2. Verify reviews are displaying correctly"
echo "   3. Check widget responsiveness" 
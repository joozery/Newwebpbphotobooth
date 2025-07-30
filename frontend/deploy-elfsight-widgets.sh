#!/bin/bash

# Frontend Deployment Script for Elfsight Widgets Update
# This script deploys the updated frontend with new Elfsight widgets

echo "🚀 Starting Frontend Deployment for Elfsight Widgets Update..."

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
git commit -m "Update to new Elfsight widgets

- Replace custom Google Reviews widget with Elfsight widget
- Update Google Reviews widget ID: c50cab09-4c61-4030-981d-803ce5e4f08a
- Update Facebook Reviews widget ID: 8dd208b0-a98e-4930-af1f-cb03e23c65e0
- Remove custom GoogleReviewsWidget component
- Use Elfsight platform.js script
- Maintain lazy loading for better performance"

echo "🚀 Pushing to remote repository..."
git push

echo "✅ Frontend deployment completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   - Updated Google Reviews widget ID"
echo "   - Updated Facebook Reviews widget ID"
echo "   - Removed custom widget components"
echo "   - Using Elfsight platform.js script"
echo ""
echo "🌐 Next steps:"
echo "   1. Test the new Elfsight widgets"
echo "   2. Verify Google Reviews display correctly"
echo "   3. Verify Facebook Reviews display correctly"
echo "   4. Check responsive design" 
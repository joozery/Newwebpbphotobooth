#!/bin/bash

# Frontend Deployment Script for Google Reviews System
# This script deploys the frontend with custom Google Reviews widget

echo "🚀 Starting Frontend Deployment for Google Reviews System..."

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
git commit -m "Add custom Google Reviews widget system

- Create GoogleReviewsWidget component with custom design
- Add googleReviewsService for API integration
- Update ReviewsAndSocialSection to use new widget
- Remove external widget dependencies
- Add loading states and error handling
- Support real Google Places API data
- Add mock data fallback
- Improve UI with stars, profile photos, and timestamps"

echo "🚀 Pushing to remote repository..."
git push

echo "✅ Frontend deployment completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   - Created custom GoogleReviewsWidget component"
echo "   - Added googleReviewsService for API calls"
echo "   - Updated ReviewsAndSocialSection integration"
echo "   - Removed external widget dependencies"
echo "   - Added comprehensive error handling"
echo "   - Improved UI/UX with modern design"
echo ""
echo "🌐 Next steps:"
echo "   1. Ensure backend Google Reviews API is deployed"
echo "   2. Test the widget with real data"
echo "   3. Configure Google Places API if needed"
echo "   4. Verify responsive design" 
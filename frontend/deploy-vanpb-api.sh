#!/bin/bash

# Frontend Deployment Script for VanpbSection API Integration
# This script deploys the updated frontend with API integration for van assets

echo "🚀 Starting Frontend Deployment for VanpbSection API Integration..."

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
git commit -m "Update VanpbSection to use API for van assets display

- Integrate vanImageService and vanVideoService
- Add loading states and error handling
- Display real van assets from API in popup modal
- Add fallback images and proper error handling
- Show category badges and descriptions
- Replace hardcoded TikTok links with actual video URLs"

echo "🚀 Pushing to remote repository..."
git push

echo "✅ Frontend deployment completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   - VanpbSection now fetches data from /api/van-assets endpoints"
echo "   - Added loading spinner and error states"
echo "   - Integrated real image and video display"
echo "   - Added category badges and descriptions"
echo "   - Improved user experience with proper fallbacks"
echo ""
echo "🌐 Next steps:"
echo "   1. Ensure backend van-assets API is running"
echo "   2. Test the popup modal with real data"
echo "   3. Verify image and video display works correctly" 
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
- Update Google Reviews widget ID: 99ff2706-35dc-4952-a05d-4c54ecbf0d0a
- Update Facebook Reviews widget ID: d75f8f23-9727-4c49-861d-8267d4151269
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
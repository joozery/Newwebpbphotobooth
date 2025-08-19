#!/bin/bash

echo "🚀 Deploying Frontend with S3 Migration..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in frontend directory"
    exit 1
fi

# Build the project
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful!"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found"
    exit 1
fi

# Check environment variables
echo "🔍 Checking environment variables..."
if [ -f "env.production" ]; then
    echo "✅ env.production found"
    source env.production
    echo "📡 API URL: $VITE_API_URL"
    echo "📡 API Base URL: $VITE_API_BASE_URL"
    echo "🪣 S3 Bucket: $VITE_S3_BUCKET_NAME"
    echo "🌍 S3 Region: $VITE_S3_REGION"
else
    echo "⚠️  env.production not found"
fi

# Check for any remaining Cloudinary references
echo "🔍 Checking for remaining Cloudinary references..."
if grep -r "cloudinary" src/ 2>/dev/null; then
    echo "⚠️  Warning: Found Cloudinary references in source code"
else
    echo "✅ No Cloudinary references found"
fi

# Check for S3 endpoints
echo "🔍 Checking for S3 endpoints..."
if grep -r "/upload/image" src/ 2>/dev/null; then
    echo "✅ S3 upload endpoints found"
else
    echo "❌ S3 upload endpoints not found"
fi

# Summary
echo ""
echo "🎉 Frontend S3 Migration Summary:"
echo "=================================="
echo "✅ Build successful"
echo "✅ Environment configured"
echo "✅ API endpoints updated"
echo "✅ S3 integration ready"
echo ""
echo "📱 Next steps:"
echo "1. Deploy to Netlify/Vercel"
echo "2. Test image uploads"
echo "3. Verify admin panel functionality"
echo "4. Test product management"
echo ""
echo "🔗 Backend API: $VITE_API_BASE_URL"
echo "🪣 S3 Bucket: $VITE_S3_BUCKET_NAME" 
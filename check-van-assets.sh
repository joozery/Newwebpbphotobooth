#!/bin/bash

echo "🔍 Checking Van Assets Configuration..."

# ตรวจสอบไฟล์ vanAssets.js
echo "📁 Checking vanAssets.js..."
if [ -f "backend/routes/vanAssets.js" ]; then
    echo "✅ vanAssets.js exists"
else
    echo "❌ vanAssets.js not found!"
    exit 1
fi

# ตรวจสอบว่า route ถูกเพิ่มใน server.js
echo "🔗 Checking server.js routes..."
if grep -q "van-assets" backend/server.js; then
    echo "✅ van-assets route found in server.js"
else
    echo "❌ van-assets route not found in server.js!"
    exit 1
fi

# ตรวจสอบ package.json
echo "📦 Checking package.json..."
if [ -f "backend/package.json" ]; then
    echo "✅ package.json exists"
    if grep -q "setup:van-assets" backend/package.json; then
        echo "✅ setup:van-assets script found"
    else
        echo "❌ setup:van-assets script not found!"
    fi
else
    echo "❌ package.json not found!"
    exit 1
fi

# ตรวจสอบ setup script
echo "⚙️ Checking setup script..."
if [ -f "backend/scripts/setup_van_assets.js" ]; then
    echo "✅ setup_van_assets.js exists"
else
    echo "❌ setup_van_assets.js not found!"
fi

# ตรวจสอบ frontend service
echo "🎨 Checking frontend service..."
if [ -f "frontend/src/services/vanAssetService.js" ]; then
    echo "✅ vanAssetService.js exists"
else
    echo "❌ vanAssetService.js not found!"
fi

# ตรวจสอบ admin component
echo "👨‍💼 Checking admin component..."
if [ -f "frontend/src/components/admin/AdminVanAssets.jsx" ]; then
    echo "✅ AdminVanAssets.jsx exists"
else
    echo "❌ AdminVanAssets.jsx not found!"
fi

# ตรวจสอบ AdminDashboard
echo "🏠 Checking AdminDashboard..."
if grep -q "van-assets" frontend/src/components/AdminDashboard.jsx; then
    echo "✅ van-assets found in AdminDashboard"
else
    echo "❌ van-assets not found in AdminDashboard!"
fi

echo ""
echo "🎯 Summary:"
echo "All files should be present for van assets to work properly."
echo ""
echo "🚀 To deploy:"
echo "1. Run: chmod +x deploy-now.sh"
echo "2. Run: ./deploy-now.sh"
echo ""
echo "📚 For manual deployment:"
echo "cd backend"
echo "heroku git:remote -a pbbackend-api-4e56bf125d15"
echo "git add ."
echo "git commit -m 'Add van assets'"
echo "git push heroku main" 
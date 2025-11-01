# API Configuration Guide

## 📍 Current Setup

### Local Development
- **Port**: `http://localhost:5000`
- **Mode**: Automatically detected (development mode)
- **Config File**: `client/src/config/apiConfig.js`

### Production (GitHub/Deployed)
- **URL**: `https://musicart-9bam.vercel.app`
- **Mode**: Automatically detected (production build)
- **No changes needed!**

---

## 🔄 How It Works (Automatic)

The system **automatically detects** which mode to use:

1. **Development** (`npm start`):
   - Uses: `http://localhost:5000` ✅

2. **Production Build** (`npm run build`):
   - Uses: `https://musicart-9bam.vercel.app` ✅

---

## 🎯 Manual Override (Optional)

If you need to force a specific mode, create `.env` file in `client/` folder:

```env
# Force production mode (even in dev)
REACT_APP_API_MODE=production

# Force local mode (even in build)
REACT_APP_API_MODE=local
```

---

## 📦 For GitHub Push

**Nothing to do!** 🎉

When you:
- Push to GitHub → Code has production URL
- Build the app → Automatically uses production API
- Run locally → Automatically uses localhost API

---

## ✅ Summary

- **Local Testing**: `npm start` → Uses `localhost:5000`
- **Production**: `npm run build` → Uses `musicart-9bam.vercel.app`
- **GitHub Push**: No changes needed, already set for production!


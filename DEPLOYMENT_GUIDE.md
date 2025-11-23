# Frontend Deployment Guide

## Current Status
- ✅ Frontend deployed at: `https://www.printbox3d.com`
- ⚠️ Backend API URL needs to be configured

## Quick Fix for CORS Error

### Step 1: Get Your Railway Backend URL

Go to your Railway dashboard and find your backend deployment URL. It should look like:
```
https://printbox3d-backend-production.up.railway.app
```

### Step 2: Set Environment Variable in Your Hosting Platform

#### For Vercel:
1. Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-backend.railway.app`
   - **Environments**: Check all (Production, Preview, Development)
3. Redeploy from Deployments tab

#### For Netlify:
1. Dashboard → Site → Site settings → Environment variables
2. Add variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-backend.railway.app`
3. Trigger new deploy

#### For Other Platforms:
Add environment variable `REACT_APP_API_URL` with your Railway backend URL.

### Step 3: Update Backend CORS Settings

In your Railway backend dashboard:

1. Go to Variables
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://www.printbox3d.com,https://printbox3d.com,http://localhost:3000
   ```
   (Include both www and non-www versions)

3. Railway will automatically redeploy

### Step 4: Verify

After both deployments complete:
1. Visit `https://www.printbox3d.com`
2. Open browser console (F12)
3. Check that API calls go to your Railway URL (not localhost)
4. No CORS errors should appear

## Environment Variables Reference

### Required for Production:

```env
REACT_APP_API_URL=https://your-railway-backend.railway.app
```

### For Local Development:

Create `.env` file in frontend root:
```env
REACT_APP_API_URL=http://localhost:8000
```

## Backend Configuration Required

Make sure your Railway backend has these variables:

```env
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app,printbox3d-backend.railway.app
DATABASE_URL=your-supabase-connection-string
DIRECT_DATABASE_URL=your-supabase-direct-connection
CORS_ALLOWED_ORIGINS=https://www.printbox3d.com,https://printbox3d.com
```

## Common Issues

### Issue: Still getting localhost:8000 errors
**Solution**: Make sure you redeployed after setting the environment variable. Some platforms cache builds.

### Issue: CORS errors persist
**Solution**: 
1. Check `CORS_ALLOWED_ORIGINS` in Railway includes your exact domain
2. Include both `www.printbox3d.com` and `printbox3d.com`
3. Make sure Railway backend has redeployed

### Issue: Can't find Railway URL
**Solution**: 
1. Go to Railway dashboard
2. Click on your backend service
3. Go to "Settings" tab
4. Look for "Domains" section
5. Copy the `.railway.app` domain

## Testing

After deployment, test these features:
- [ ] Homepage loads products
- [ ] Shop page shows all products
- [ ] Product detail pages work
- [ ] Authentication (login/register)
- [ ] Cart functionality
- [ ] Contact form submission
- [ ] Custom order submission

## Support

If you continue to have issues:
1. Check browser console for exact error messages
2. Verify environment variable is set correctly
3. Check Railway logs for backend errors
4. Ensure both frontend and backend are using latest deployed code

---

**Last Updated**: November 23, 2025

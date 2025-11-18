# PrintBox3D - Deployment Guide

## 🚀 Deployment Options

This guide covers multiple ways to deploy your PrintBox3D website to production.

---

## Option 1: Vercel (Recommended - Free & Easy)

### Why Vercel?
- ✅ Free hosting for personal/commercial projects
- ✅ Automatic HTTPS
- ✅ CDN for fast global delivery
- ✅ Automatic deployments from GitHub
- ✅ Zero configuration for React apps

### Steps:

1. **Push to GitHub**
   ```bash
   cd d:\PrintBox
   git init
   git add .
   git commit -m "Initial commit - PrintBox3D website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/printbox3d.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React
   - Click "Deploy"
   - Done! Your site will be live at `https://your-project.vercel.app`

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., printbox3d.com)
   - Follow DNS configuration instructions

---

## Option 2: Netlify (Free & Popular)

### Why Netlify?
- ✅ Free tier with 100GB bandwidth
- ✅ Automatic HTTPS
- ✅ Form handling built-in
- ✅ Continuous deployment from Git

### Steps:

1. **Build the Project**
   ```bash
   cd d:\PrintBox
   npm run build
   ```

2. **Deploy via Drag & Drop**
   - Go to https://netlify.com
   - Drag the `build/` folder to the upload area
   - Your site is live instantly!

3. **Deploy via GitHub (Better)**
   - Push code to GitHub (see Option 1)
   - Connect GitHub to Netlify
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Deploy automatically on every push

4. **Custom Domain**
   - Domain settings → Add custom domain
   - Update DNS records as instructed

---

## Option 3: GitHub Pages (Free)

### Why GitHub Pages?
- ✅ Completely free
- ✅ Simple for static sites
- ✅ Integrated with GitHub

### Steps:

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these lines:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/printbox3d",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Your site will be live at the homepage URL

---

## Option 4: Traditional Hosting (cPanel, Hostinger, etc.)

### Steps:

1. **Build for Production**
   ```bash
   cd d:\PrintBox
   npm run build
   ```

2. **Upload Files**
   - Upload entire `build/` folder contents to `public_html/`
   - Use FTP client (FileZilla) or hosting file manager

3. **Configure Server**
   - Create `.htaccess` file for React Router:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Test**
   - Visit your domain
   - Test all pages and routing

---

## Pre-Deployment Checklist

### 1. Update Placeholder Content
- [ ] Replace all placeholder images
- [ ] Update contact information (email, phone)
- [ ] Add real social media links
- [ ] Update product data with actual products
- [ ] Review and update all text content

### 2. Optimize for Production
- [ ] Compress all images (use TinyPNG or ImageOptim)
- [ ] Test on mobile devices
- [ ] Test in different browsers
- [ ] Check all forms work correctly
- [ ] Test all navigation links

### 3. SEO Setup
- [ ] Update meta tags in `public/index.html`
   ```html
   <meta name="description" content="Your description">
   <meta name="keywords" content="3D printing, custom prints, India">
   <meta property="og:title" content="PrintBox3D">
   <meta property="og:description" content="Your description">
   <meta property="og:image" content="URL to image">
   ```
- [ ] Add favicon.ico to public folder
- [ ] Create sitemap.xml
- [ ] Add robots.txt

### 4. Analytics Setup
- [ ] Add Google Analytics
   ```html
   <!-- In public/index.html, add before </head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```
- [ ] Set up Facebook Pixel (optional)
- [ ] Set up conversion tracking

### 5. Performance Optimization
- [ ] Enable gzip compression on server
- [ ] Set up CDN for static assets
- [ ] Implement lazy loading for images
- [ ] Minimize CSS/JS (done automatically by build)

### 6. Security
- [ ] Enable HTTPS (free with Let's Encrypt)
- [ ] Set up Content Security Policy
- [ ] Configure CORS if using external API
- [ ] Secure form submissions

---

## Environment Variables

If you need environment-specific variables:

1. **Create `.env` file** (already in .gitignore):
   ```
   REACT_APP_API_URL=https://api.yoursite.com
   REACT_APP_GA_ID=G-XXXXXXXXXX
   ```

2. **Use in code**:
   ```javascript
   const apiUrl = process.env.REACT_APP_API_URL;
   ```

3. **Set in hosting platform**:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

---

## Custom Domain Setup

### 1. Purchase Domain
- Recommended: Namecheap, GoDaddy, Google Domains
- Choose: printbox3d.com or similar

### 2. Configure DNS
Add these records (example for Vercel):

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21             |
| CNAME | www  | cname.vercel-dns.com    |

### 3. Wait for Propagation
- DNS changes take 24-48 hours
- Use https://dnschecker.org to monitor

### 4. Enable HTTPS
- Most platforms enable this automatically
- Force HTTPS in platform settings

---

## Post-Deployment Testing

### Test Checklist:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Shop page filters work
- [ ] Product detail pages display properly
- [ ] Forms submit successfully
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] FAQ accordion works
- [ ] Newsletter signup functions
- [ ] No console errors
- [ ] Page load speed < 3 seconds
- [ ] Works in Chrome, Firefox, Safari, Edge

### Tools:
- **Performance**: Google PageSpeed Insights
- **SEO**: Google Search Console
- **Mobile**: Google Mobile-Friendly Test
- **Accessibility**: WAVE Web Accessibility Tool
- **Broken Links**: Screaming Frog SEO Spider

---

## Monitoring & Maintenance

### 1. Set Up Monitoring
- **Uptime**: UptimeRobot.com (free)
- **Analytics**: Google Analytics
- **Error Tracking**: Sentry.io

### 2. Regular Updates
- Update React dependencies monthly
- Review and refresh content
- Check for broken links
- Monitor site speed

### 3. Backup
- GitHub = automatic code backup
- Export analytics data monthly
- Backup images separately

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check console for errors, ensure build was successful

### Issue: 404 on page refresh
**Solution**: Configure server for SPA routing (see Option 4)

### Issue: Images not loading
**Solution**: Check image paths are relative, not absolute

### Issue: Slow loading
**Solution**: Compress images, enable CDN, check hosting plan

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **React Deployment**: https://create-react-app.dev/docs/deployment/

---

## Cost Breakdown

### Free Tier Limits:
- **Vercel**: Unlimited projects, 100GB bandwidth/month
- **Netlify**: 100GB bandwidth/month, 300 build minutes
- **GitHub Pages**: 100GB soft limit

### Paid Options (if needed):
- Custom domain: $10-15/year
- Business hosting: $5-20/month
- CDN: Free (Cloudflare) or $5+/month

---

**Ready to deploy? Choose your platform and follow the steps above! 🚀**

Good luck with your PrintBox3D website launch!

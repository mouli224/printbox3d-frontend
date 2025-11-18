# PrintBox3D Website - Quick Start Guide

## 🚀 Getting Started

### Step 1: Open Terminal
Navigate to the project directory:
```bash
cd d:\PrintBox
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The website will automatically open in your browser at `http://localhost:3000`

## 📄 Available Pages

Once the server is running, you can navigate to:

- **Homepage**: `http://localhost:3000/`
- **Shop**: `http://localhost:3000/shop`
- **Product Detail**: `http://localhost:3000/product/1`
- **Custom Order**: `http://localhost:3000/custom-order`
- **About**: `http://localhost:3000/about`
- **Contact**: `http://localhost:3000/contact`

## 🎨 Customization Guide

### Changing Brand Colors

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --primary-color: #1a8caa;      /* Main brand color */
  --primary-hover: #156d85;      /* Hover state color */
  --text-dark: #2a2a2a;          /* Primary text color */
  --text-light: #666666;         /* Secondary text color */
  --bg-light: #f8f9fa;           /* Light background */
  --border-color: #e0e0e0;       /* Border color */
}
```

### Adding New Products

1. **Best Sellers Section** (Homepage):
   - Edit: `src/components/Home/BestSellers.js`
   - Modify the `products` array

2. **Shop Page**:
   - Edit: `src/pages/Shop/Shop.js`
   - Modify the `allProducts` array

3. **Product Detail Page**:
   - Edit: `src/pages/ProductDetail/ProductDetail.js`
   - Add new product data to the `productData` object

### Updating Contact Information

Edit `src/pages/Contact/Contact.js` to update:
- Email addresses
- Phone numbers
- Business hours
- Location/address

### Modifying FAQ

Edit `src/pages/Contact/Contact.js` and update the `faqs` array.

### Changing Hero Section Text

Edit `src/components/Home/Hero.js` to change:
- Main heading
- Subtitle
- Call-to-action button text

## 🛠️ Common Tasks

### Adding a New Page

1. Create a new folder in `src/pages/`
2. Create the component file (e.g., `NewPage.js`)
3. Create the CSS file (e.g., `NewPage.css`)
4. Add the route in `src/App.js`:
   ```javascript
   import NewPage from './pages/NewPage/NewPage';
   // ...
   <Route path="/new-page" element={<NewPage />} />
   ```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Fixing Common Issues

**Issue**: Port 3000 is already in use
**Solution**: Either stop the other process or change the port by creating a `.env` file:
```
PORT=3001
```

**Issue**: Module not found errors
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Issue**: Changes not reflecting
**Solution**: 
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Stop the server (Ctrl+C) and restart with `npm start`

## 📱 Testing Responsive Design

Open Chrome DevTools:
1. Press F12
2. Click the device toggle icon (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1920px width

## 🔧 Project Structure Overview

```
src/
├── components/          # Reusable components
│   ├── Home/           # Homepage-specific components
│   └── Layout/         # Header, Footer, Layout
├── pages/              # Page components
│   ├── Home/           # Homepage
│   ├── Shop/           # Shop page
│   ├── ProductDetail/  # Product detail page
│   ├── CustomOrder/    # Custom order page
│   ├── About/          # About page
│   └── Contact/        # Contact page
├── App.js              # Main app with routing
├── App.css             # Global app styles
├── index.js            # Entry point
└── index.css           # Global CSS variables
```

## 🎯 Key Features Implemented

✅ Responsive navigation with hamburger menu  
✅ Hero section with gradient background  
✅ Featured categories grid  
✅ Best sellers/popular prints showcase  
✅ Product filtering by category & material  
✅ Product detail pages with tabs  
✅ Custom order form with file upload  
✅ About page with process steps  
✅ Contact form with FAQ accordion  
✅ Footer with newsletter signup  
✅ Smooth animations and hover effects  
✅ Mobile-first responsive design  

## 💡 Tips

1. **Images**: Replace placeholder images with actual product photos
2. **Content**: Update all text content to match your brand voice
3. **SEO**: Update meta tags in `public/index.html`
4. **Analytics**: Add Google Analytics ID if needed
5. **Performance**: Optimize images before adding them

## 🐛 Debugging

### Check Console for Errors
- Press F12 → Console tab
- Look for any red error messages

### React DevTools
- Install React Developer Tools browser extension
- Inspect component hierarchy and props

### CSS Issues
- Use browser DevTools (F12) → Elements tab
- Inspect and modify CSS in real-time

## 📞 Support

For technical issues or questions:
- Check the README.md file
- Review component files for inline comments
- Refer to React documentation: https://react.dev/

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop the `build` folder
2. Or connect via GitHub

### Traditional Hosting
1. Run `npm run build`
2. Upload `build/` folder contents to your hosting

---

**Happy Coding! 🎉**

# Assets Folder - Image Management Guide

## 📁 Folder Structure

```
public/assets/
├── logo/
│   └── logo.png          <- Your company logo (recommended: 200x80px PNG with transparent background)
└── products/
    ├── product-1.jpg
    ├── product-2.jpg
    └── ...               <- Add all your product images here
```

## 🖼️ Logo Instructions

### Where to Place Your Logo:
1. Save your logo as `logo.png` in the `public/assets/logo/` folder
2. The logo will automatically appear in:
   - Header (left side, next to "PrintBox3D")
   - Footer

### Logo Specifications:
- **Format**: PNG (with transparent background recommended)
- **Dimensions**: 200px width × 80px height (or similar ratio)
- **Max File Size**: Keep under 100KB for fast loading
- **File Name**: Must be named `logo.png`

### If You Don't Have a Logo:
The website will still work perfectly - it will just show the text "PrintBox3D" with the yellow "3D" accent.

---

## 🛍️ Product Images Instructions

### Where to Place Product Images:
Save all product images in the `public/assets/products/` folder

### Naming Convention:
Use descriptive names like:
- `geometric-planter.jpg`
- `phone-stand-pro.jpg`
- `modern-wall-art.jpg`
- `cable-organizer.jpg`

### Image Specifications:
- **Format**: JPG or PNG
- **Dimensions**: 600x600px (square) for consistency
- **Background**: White or transparent for clean look
- **File Size**: Compress to under 200KB each
- **Quality**: High resolution but optimized

---

## 🔄 How to Update Images in Code

### For Homepage Best Sellers:
Edit `src/components/Home/BestSellers.js`:

```javascript
const products = [
  {
    id: 1,
    name: 'Geometric Planter',
    price: '₹899',
    image: '/assets/products/geometric-planter.jpg',  // ← Update this path
    category: 'Home Decor'
  },
  // ... add more products
];
```

### For Shop Page:
Edit `src/pages/Shop/Shop.js`:

```javascript
const allProducts = [
  { 
    id: 1, 
    name: 'Geometric Planter', 
    price: 899, 
    category: 'home-decor', 
    material: 'PLA', 
    image: '/assets/products/geometric-planter.jpg'  // ← Update this path
  },
  // ... add more products
];
```

### For Product Detail Pages:
Edit `src/pages/ProductDetail/ProductDetail.js`:

```javascript
const productData = {
  1: { 
    id: 1, 
    name: 'Geometric Planter', 
    price: 899, 
    // ... other details
    image: '/assets/products/geometric-planter.jpg'  // ← Update this path
  },
  // ... add more products
};
```

---

## 📸 Image Optimization Tips

### Before Uploading:
1. **Resize Images**: Use 600x600px for products
2. **Compress**: Use tools like:
   - TinyPNG.com (online, free)
   - ImageOptim (Mac)
   - RIOT (Windows)
3. **Format**: 
   - JPG for photos (better compression)
   - PNG for images with transparency

### Recommended Tools:
- **Bulk Resize**: Bulk Resize Photos (bulkresizephotos.com)
- **Compression**: TinyPNG or Squoosh.app
- **Editing**: Canva, Photoshop, or GIMP

---

## 🎨 Product Photography Tips

### For Best Results:
1. **Lighting**: Use natural daylight or softbox lights
2. **Background**: Pure white (#FFFFFF) or neutral
3. **Angles**: Show multiple views (front, side, top)
4. **Consistency**: Use same lighting/background for all products
5. **Focus**: Sharp, clear images
6. **Scale**: Include size reference if helpful

### Photo Checklist:
- [ ] Clean, uncluttered background
- [ ] Good lighting (no harsh shadows)
- [ ] Product centered in frame
- [ ] Sharp focus
- [ ] Color accurate
- [ ] Multiple angles for detail pages

---

## 🚀 Quick Start

### Step 1: Add Your Logo
1. Open `public/assets/logo/` folder
2. Drop your logo file
3. Rename it to `logo.png`
4. Refresh the website - logo appears automatically!

### Step 2: Add Product Images
1. Open `public/assets/products/` folder
2. Drop all your product images
3. Name them descriptively
4. Update the image paths in the code (see above)
5. Refresh the website

---

## 🔍 Troubleshooting

### Logo Not Showing?
- Check file name is exactly `logo.png` (case-sensitive)
- Check file is in `public/assets/logo/` folder
- Refresh browser (Ctrl+Shift+R)
- Clear browser cache

### Product Images Not Showing?
- Check image path matches file name
- Check images are in `public/assets/products/` folder
- Check file extensions (.jpg, .png)
- Refresh browser

### Images Too Slow?
- Compress images more
- Reduce dimensions
- Use JPG instead of PNG
- Enable CDN in production

---

## 📋 Example Product Setup

```javascript
// Example: Complete product with your image
{
  id: 1,
  name: 'Custom Phone Stand',
  price: 599,
  category: 'gadgets',
  material: 'PLA',
  color: 'Black',
  dimensions: '10cm x 8cm x 12cm',
  description: 'A sleek phone stand for your desk...',
  image: '/assets/products/phone-stand-black.jpg'  // Your image!
}
```

---

## 💡 Pro Tips

1. **Batch Process**: Edit all images at once using batch tools
2. **Watermark**: Add subtle branding to product photos
3. **Multiple Views**: Have 3-4 images per product for detail page
4. **Lifestyle Shots**: Mix product-only with lifestyle photos
5. **Backup**: Keep original high-res images in a separate folder

---

## 📞 Need Help?

If images aren't working:
1. Check file paths are correct
2. Ensure images are in `public/assets/` folders
3. Restart development server (`Ctrl+C` then `npm start`)
4. Clear browser cache

---

**Your images will make your products shine! 📸✨**

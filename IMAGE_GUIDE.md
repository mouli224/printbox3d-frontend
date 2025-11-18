# Image & Branding Update Guide

## 🎨 Color Scheme Updated!

Your website now uses a **black and white** color scheme with **yellow accent** for the "3D" text:

### New Colors:
- **Primary**: Black (#000000)
- **Accent**: Yellow (#FFD700) - for "3D" text
- **Background**: White (#FFFFFF)
- **Hover States**: Dark gray (#333333)

---

## 🖼️ Logo Setup (NEW!)

### Where to Add Your Logo:

**Location**: `public/assets/logo/`

**Steps:**
1. Save your logo as `logo.png` in the `public/assets/logo/` folder
2. Logo automatically appears in:
   - ✅ Header (left side, before "PrintBox3D" text)
   - ✅ Footer

### Logo Specifications:
- **File name**: Must be `logo.png`
- **Format**: PNG (transparent background recommended)
- **Size**: 200px × 80px (recommended)
- **Colors**: Should work with black/yellow theme

### Example:
```
public/
└── assets/
    └── logo/
        └── logo.png  ← Place your logo here
```

If no logo is added, the text "PrintBox3D" will display by default.

---

## 📦 Product Images Setup (NEW!)

### Where to Add Product Images:

**Location**: `public/assets/products/`

### Steps to Add Images:

1. **Save all product photos** to `public/assets/products/`

2. **Name them descriptively**:
   ```
   geometric-planter.jpg
   phone-stand-pro.jpg
   modern-wall-art.jpg
   cable-organizer.jpg
   desk-organizer.jpg
   decorative-vase.jpg
   ```

3. **Update image paths in code** - Change from placeholder URLs to your images:

---

## 📝 Update Product Images in Code

### File 1: Homepage Best Sellers
**Location**: `src/components/Home/BestSellers.js`

**Find this:**
```javascript
const products = [
  {
    id: 1,
    name: 'Geometric Planter',
    price: '₹899',
    image: 'https://via.placeholder.com/350x350/f8f9fa/1a8caa?text=Geometric+Planter',
    category: 'Home Decor'
  },
```

**Change to:**
```javascript
const products = [
  {
    id: 1,
    name: 'Geometric Planter',
    price: '₹899',
    image: '/assets/products/geometric-planter.jpg',  // ← Your image!
    category: 'Home Decor'
  },
```

Do this for all 6 products in the array.

---

### File 2: Shop Page Products
**Location**: `src/pages/Shop/Shop.js`

**Find this:**
```javascript
const allProducts = [
  { id: 1, name: 'Geometric Planter', price: 899, category: 'home-decor', material: 'PLA', image: 'https://via.placeholder.com/350x350/f8f9fa/1a8caa?text=Geometric+Planter' },
```

**Change to:**
```javascript
const allProducts = [
  { id: 1, name: 'Geometric Planter', price: 899, category: 'home-decor', material: 'PLA', image: '/assets/products/geometric-planter.jpg' },
```

Update all 9 products in the array.

---

### File 3: Product Detail Pages
**Location**: `src/pages/ProductDetail/ProductDetail.js`

**Find this:**
```javascript
const productData = {
  1: { id: 1, name: 'Geometric Planter', price: 899, category: 'Home Decor', material: 'PLA', color: 'White', dimensions: '12cm x 12cm x 10cm', description: '...', image: 'https://via.placeholder.com/600x600/f8f9fa/1a8caa?text=Geometric+Planter' },
```

**Change to:**
```javascript
const productData = {
  1: { id: 1, name: 'Geometric Planter', price: 899, category: 'Home Decor', material: 'PLA', color: 'White', dimensions: '12cm x 12cm x 10cm', description: '...', image: '/assets/products/geometric-planter.jpg' },
```

Update all 3 products.

---

### File 4: Featured Categories (Optional)
**Location**: `src/components/Home/FeaturedCategories.js`

Update category images if you have banner images for categories.

---

### File 5: Custom Order Examples
**Location**: `src/pages/CustomOrder/CustomOrder.js`

Update example project images:
```javascript
const exampleProjects = [
  {
    id: 1,
    title: 'Custom Trophy',
    image: '/assets/products/custom-trophy.jpg'  // ← Your example image
  },
```

---

## 🎯 Quick Checklist

### Step 1: Add Logo
- [ ] Save logo as `logo.png`
- [ ] Place in `public/assets/logo/` folder
- [ ] Refresh browser to see it

### Step 2: Add Product Images
- [ ] Save all product images to `public/assets/products/`
- [ ] Name them descriptively
- [ ] Take note of exact file names

### Step 3: Update Code
- [ ] Edit `src/components/Home/BestSellers.js`
- [ ] Edit `src/pages/Shop/Shop.js`
- [ ] Edit `src/pages/ProductDetail/ProductDetail.js`
- [ ] Edit `src/components/Home/FeaturedCategories.js` (optional)
- [ ] Edit `src/pages/CustomOrder/CustomOrder.js` (optional)

### Step 4: Test
- [ ] Refresh browser (Ctrl+Shift+R)
- [ ] Check all pages
- [ ] Verify images load correctly

---

## 💡 Image Specifications

### Product Images:
- **Format**: JPG or PNG
- **Size**: 600x600px (square)
- **Background**: White or transparent
- **File Size**: Under 200KB each
- **Quality**: High resolution but compressed

### Logo:
- **Format**: PNG with transparency
- **Size**: 200x80px or similar
- **File Size**: Under 100KB
- **Works with**: Black/yellow theme

---

## 🎨 Current Color Scheme

### Where Black is Used:
- All gradients (hero sections, headers)
- Primary buttons and links
- Hover states
- Process icons borders

### Where Yellow is Used:
- "3D" text next to "PrintBox"
- Icon accents
- Highlighting important elements

### What Stayed the Same:
- White backgrounds
- Text colors (dark gray)
- Layout and spacing
- All functionality

---

## 🚀 After Adding Images

1. **Save all changes**
2. **Restart server** if needed:
   ```bash
   Ctrl+C (to stop)
   npm start (to restart)
   ```
3. **Hard refresh browser**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Clear cache** if images don't appear

---

## 📁 Folder Structure

```
PrintBox/
├── public/
│   └── assets/
│       ├── logo/
│       │   ├── logo.png          ← YOUR LOGO HERE
│       │   ├── placeholder.svg
│       │   └── README.md
│       └── products/
│           ├── geometric-planter.jpg  ← YOUR PRODUCT IMAGES HERE
│           ├── phone-stand.jpg
│           ├── wall-art.jpg
│           └── README.md
└── src/
    ├── components/
    │   └── Home/
    │       ├── BestSellers.js     ← UPDATE THIS
    │       └── FeaturedCategories.js
    └── pages/
        ├── Shop/
        │   └── Shop.js            ← UPDATE THIS
        ├── ProductDetail/
        │   └── ProductDetail.js   ← UPDATE THIS
        └── CustomOrder/
            └── CustomOrder.js     ← UPDATE THIS
```

---

## 🔧 Troubleshooting

### Logo Not Showing?
- Check file is named exactly `logo.png`
- Check it's in `public/assets/logo/` folder
- Hard refresh: Ctrl+Shift+R

### Product Images Not Loading?
- Check file paths match file names exactly
- Check images are in `public/assets/products/`
- Check file extensions (.jpg or .png)
- Restart server: stop (Ctrl+C) then `npm start`

### Images Too Large?
- Compress using TinyPNG.com
- Resize to recommended dimensions
- Use JPG for better compression

---

## ✅ Changes Made

1. ✅ **Colors**: Changed from teal/green to black/white
2. ✅ **Yellow Accent**: "3D" text is now yellow (#FFD700)
3. ✅ **Logo Support**: Added logo image slot in header & footer
4. ✅ **Image Folders**: Created organized folders for assets
5. ✅ **Documentation**: Added guides for easy updates

---

**Your website now has a sleek black & white design with yellow accents!** 🎨

Just add your logo and product images to complete the branding! 🚀

# PrintBox3D - 3D Printing Website

A modern, minimalistic e-commerce website for PrintBox3D - showcasing custom 3D printed creations built with React and JavaScript.

## Features

### 🏠 Homepage
- Eye-catching hero section with call-to-action
- Featured product categories
- Best sellers showcase
- About snippet with key features
- Customer testimonials

### 🛍️ Shop
- Product grid with filtering options
- Filter by category and material
- Sort by price and name
- Clean product cards with hover effects
- Individual product detail pages with tabs

### 🎨 Custom Orders
- Custom order request form
- File upload functionality
- Material and color selection
- Examples of past projects
- Clear "How it works" process

### 📖 About
- Company story and mission
- Visual "How it works" section
- Why choose us - 6 key features
- Call-to-action section

### 📞 Contact
- Contact form
- Business information and hours
- FAQ accordion section
- Social media links

## Design Philosophy

- **Clean & Minimalistic**: Uncluttered UI with generous white space
- **Modern**: Contemporary design with subtle animations
- **Product-Focused**: Let the products speak for themselves
- **Responsive**: Mobile-first approach, works on all devices
- **Accessible**: Clear navigation and user-friendly interface

## Color Palette

- **Primary Color**: #1a8caa (Teal)
- **Primary Hover**: #156d85
- **Text Dark**: #2a2a2a
- **Text Light**: #666666
- **Background Light**: #f8f9fa
- **White**: #ffffff

## Tech Stack

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **CSS3** with custom properties
- **Google Fonts** (Poppins)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:
   ```bash
   cd PrintBox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The build folder will contain the production-ready files.

## Project Structure

```
PrintBox/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home/
│   │   │   ├── Hero.js
│   │   │   ├── Hero.css
│   │   │   ├── FeaturedCategories.js
│   │   │   ├── FeaturedCategories.css
│   │   │   ├── BestSellers.js
│   │   │   ├── BestSellers.css
│   │   │   ├── AboutSnippet.js
│   │   │   ├── AboutSnippet.css
│   │   │   ├── Testimonials.js
│   │   │   └── Testimonials.css
│   │   └── Layout/
│   │       ├── Header.js
│   │       ├── Header.css
│   │       ├── Footer.js
│   │       ├── Footer.css
│   │       ├── Layout.js
│   │       └── Layout.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── Shop/
│   │   │   ├── Shop.js
│   │   │   └── Shop.css
│   │   ├── ProductDetail/
│   │   │   ├── ProductDetail.js
│   │   │   └── ProductDetail.css
│   │   ├── CustomOrder/
│   │   │   ├── CustomOrder.js
│   │   │   └── CustomOrder.css
│   │   ├── About/
│   │   │   ├── About.js
│   │   │   └── About.css
│   │   └── Contact/
│   │       ├── Contact.js
│   │       └── Contact.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Key Features Implementation

### Responsive Navigation
- Desktop: Horizontal menu with logo on left
- Mobile: Hamburger menu with slide-in navigation

### Product Filtering
- Real-time filtering by category and material
- Multiple sort options (price, name)
- Maintains state during navigation

### Custom Order Form
- Multi-step form with validation
- File upload for design files
- Material and color selection
- Budget and quantity inputs

### FAQ Accordion
- Smooth expand/collapse animation
- Only one item open at a time
- Hover effects for better UX

## Customization

### Changing Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #1a8caa;
  --primary-hover: #156d85;
  /* ... other variables */
}
```

### Adding Products
Edit the product arrays in:
- `src/components/Home/BestSellers.js`
- `src/pages/Shop/Shop.js`
- `src/pages/ProductDetail/ProductDetail.js`

### Modifying Content
All content is in the respective component files and can be easily modified.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Shopping cart functionality
- User authentication
- Payment gateway integration
- Order tracking
- Product reviews and ratings
- Wishlist feature
- Live chat support
- Blog section

## License

This project is created for PrintBox3D.

## Contact

For questions or support, please contact:
- Email: info@printbox3d.com
- Website: [Your Website URL]

---

**Built with ❤️ for PrintBox3D**

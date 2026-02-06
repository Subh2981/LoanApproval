# FinRisk Analyzer - Loan Approval System

A modern, responsive loan approval prediction system with a banking-themed UI built with Flask, featuring real-time validation and interactive elements.

## Features

- 🎨 Modern banking-themed design with gradient backgrounds
- 📱 Fully responsive layout (mobile, tablet, desktop)
- ✅ Real-time form validation with helpful error messages
- 💡 Smart field indicators (credit score rating, loan-to-income ratio)
- 🔄 Interactive UI elements with smooth animations
- 🎯 Machine learning-powered loan approval predictions

## Project Structure

```
project/
│
├── app.py                          # Flask application
├── templates/
│   └── index.html                  # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css              # Styling
│   └── js/
│       └── script.js              # JavaScript functionality
└── pickle/
    └── Loan.pkl                   # Trained ML model
```

## Setup Instructions

### 1. Create the folder structure:

```bash
mkdir -p templates static/css static/js pickle
```

### 2. Place the files:

- Move `index.html` to the `templates/` folder
- Move `style.css` to the `static/css/` folder
- Move `script.js` to the `static/js/` folder
- Keep `app.py` in the root directory
- Place your `Loan.pkl` model in the `pickle/` folder

### 3. Install dependencies:

```bash
pip install flask pandas scikit-learn
```

### 4. Run the application:

```bash
python app.py
```

### 5. Access the application:

Open your browser and navigate to:
```
http://localhost:5000
```

## Form Fields

The application collects the following information:

### Personal Information
- **Age**: 18-100 years
- **Gender**: Male/Female
- **Annual Income**: Positive number
- **Employment Experience**: 0-50 years
- **Home Ownership**: Rent, Own, Mortgage, or Other
- **Credit Score**: 300-850

### Loan Information
- **Loan Amount**: Positive number
- **Interest Rate**: 0-100%
- **Loan Intent**: Personal, Education, Medical, Venture, Home Improvement, or Debt Consolidation
- **Previous Loan Defaults**: Yes/No

## Features Breakdown

### Real-time Validation
- Instant feedback on field errors
- Helpful error messages
- Visual indicators for field status

### Smart Calculators
- **Loan-to-Income Ratio**: Automatically calculated and categorized (Good/Moderate/High Risk)
- **Credit Score Rating**: Shows rating category (Excellent/Good/Fair/Poor)

### Interactive Elements
- Smooth animations and transitions
- Loading states during form submission
- Auto-scroll to errors or results
- Tooltips for loan intent options

### Responsive Design
Breakpoints:
- **Desktop**: > 768px (full layout)
- **Tablet**: 481px - 768px (adjusted grid)
- **Mobile**: ≤ 480px (single column)

## Customization

### Colors
Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #1e3a8a;      /* Main brand color */
    --secondary-color: #3b82f6;    /* Accent color */
    --success-color: #10b981;      /* Success messages */
    --error-color: #ef4444;        /* Error messages */
}
```

### Validation Rules
Modify validation rules in `script.js`:

```javascript
const validationRules = {
    age: {
        min: 18,
        max: 100,
        message: 'Age must be between 18 and 100'
    },
    // Add more rules...
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.4.0
- **Machine Learning**: scikit-learn, pandas

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please contact support@finrisk.com

---

**FinRisk Analyzer** - Empowering financial decisions with AI-driven insights
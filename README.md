# Ibrahim Saber Portfolio

A modern, multilingual portfolio website built with React, featuring an admin panel, dark mode, and comprehensive project showcase.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Responsive Design**: Mobile-first approach with full responsiveness
- **Multilingual Support**: Available in 10 languages (EN, ES, FR, AR, etc.)
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Admin Panel**: Full CRUD operations for projects, experience, education, skills, and certificates
- **Animations**: Smooth page transitions and micro-interactions using Framer Motion
- **Contact Form**: Functional contact form with email integration
- **Certificate Showcase**: Display professional certificates with filtering
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Performance Optimized**: Lazy loading and code splitting

## 🛠 Technologies Used

### Frontend
- **React 18**: Core framework for building the UI
- **React Router DOM v6**: Client-side routing
- **Framer Motion**: Animation library for smooth transitions
- **React i18next**: Internationalization framework

### Styling
- **CSS3**: Custom styling with CSS variables
- **CSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first approach

### State Management
- **React Context API**: Global state management for auth, theme, and language
- **Custom Hooks**: Reusable logic for projects, skills, and certificates

### Icons & UI
- **React Icons**: Icon library with multiple icon packs
- **Lucide React**: Additional icon set

### Development Tools
- **Create React App**: Project bootstrapping
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/ibrahimsaber1/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create necessary directories:
```bash
mkdir -p public/certificates
mkdir -p src/data/translations
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url
REACT_APP_EMAIL_SERVICE_KEY=your_email_service_key
```

### Certificate Setup
Place your certificate PDFs/images in the `public/certificates/` directory:
```
public/
└── certificates/
    ├── cs50.pdf
    ├── hackerrank-problem-solving.pdf
    └── ... other certificates
```

### Translation Files
Translation files are located in `src/data/translations/`:
- `translationEN.js` - English
- `translationES.js` - Spanish
- `translationFR.js` - French
- `translationAR.js` - Arabic

## 📁 Folder Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header/
│   │   └── Footer/
│   ├── Certificates/
│   ├── LoadingScreen/
│   ├── ProjectCard/
│   └── SkillCard/
├── contexts/
│   ├── AuthContext.js
│   ├── LanguageContext.js
│   └── ThemeContext.js
├── data/
│   ├── certificatesData.js
│   ├── projectsData.js
│   ├── skillsData.js
│   └── translations/
├── hooks/
│   ├── useCertificates.js
│   ├── useProjects.js
│   └── useSkills.js
├── pages/
│   ├── Home/
│   ├── Projects/
│   ├── Experience/
│   ├── Contact/
│   ├── ProjectDetail/
│   └── Admin/
│       ├── AdminDashboard/
│       ├── AdminProjects/
│       ├── AdminExperience/
│       ├── AdminEducation/
│       ├── AdminSkills/
│       ├── AdminCertificates/
│       └── AdminContact/
├── styles/
│   └── global.css
└── App.js
```

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
Optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🔐 Admin Panel

Access the admin panel at `/admin/login` with these credentials:
- **Email**: ibrahimsaber622@gmail.com
- **Password**: admin123

Admin features include:
- Manage Projects (CRUD operations)
- Manage Experience entries
- Manage Education records
- Manage Skills and proficiency levels
- Manage Certificates
- View Contact Messages

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Internationalization

Supported languages:
- English (en)
- Spanish (es)
- French (fr)
- Arabic (ar)
- German (de) - placeholder
- Italian (it) - placeholder
- Portuguese (pt) - placeholder
- Chinese (zh) - placeholder
- Japanese (ja) - placeholder
- Korean (ko) - placeholder

## 🎨 Theming

The app supports dynamic theming with:
- Light Mode
- Dark Mode
- Custom CSS variables for easy customization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --dir=build --prod
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ibrahim Saber**
- Email: ibrahimsaber622@gmail.com
- LinkedIn: [ibrahim1saber](https://www.linkedin.com/in/ibrahim1saber/)
- GitHub: [ibrahimsaber1](https://github.com/ibrahimsaber1)

## 🙏 Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Framer Motion](https://www.framer.com/motion/)
- [React i18next](https://react.i18next.com/)

---

⭐️ If you found this project useful, please consider giving it a star!
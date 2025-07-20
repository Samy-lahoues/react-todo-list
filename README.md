# 📝 React Todo List - Modern Task Management

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue)
![Vite](https://img.shields.io/badge/Vite-4.0-orange)

A modern, feature-rich Todo List application built with **React**, **TypeScript**, and **TailwindCSS**. This project demonstrates best practices in React development including context-based state management, theming, localization, and responsive UI.

![App Screenshot](./screenshot.png) <!-- Add a screenshot here -->

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **📌 Task Management** | Add, complete, edit, and delete tasks with intuitive controls |
| **🎯 Prioritization** | Categorize tasks with High/Medium/Low priority indicators |
| **📅 Due Dates** | Set and visualize task deadlines with date picker |
| **🌗 Dark/Light Mode** | Context-based theme switching with system preference detection |
| **🌐 Multi-language** | English/Arabic support with RTL layout switching |
| **🔍 Smart Filtering** | Filter by All/Active/Completed status |
| **📱 Responsive Design** | Optimized for all device sizes |
| **🔔 Toast Notifications** | Action feedback with subtle notifications |
| **♿ Accessibility** | WCAG compliant with keyboard navigation |

## 🛠 Tech Stack

**Core:**
- React 18 (Functional Components + Hooks)
- TypeScript 5
- TailwindCSS 3 (With custom theming)
- Vite 4 (Build tool)

**Key Libraries:**
- React Router (Navigation)
- React Icons (Beautiful SVG icons)
- Date-fns (Date utilities)
- usehooks-ts (Helpful custom hooks)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ or yarn 1.22+

### Installation
```bash
# Clone the repository
git clone https://github.com/Samy-lahoues/react-todo-list.git

# Navigate to project directory
cd react-todo-list

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev
```

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment

### Netlify Deployment

This app is configured for easy deployment on Netlify with serverless functions for secure API handling.

#### Environment Variables Setup

The app uses a translation API that requires secure environment variables. Set these in your Netlify dashboard:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings > Environment variables**
3. Add the following variables:

```
VITE_TRANSLATION_API_URL=your_translation_api_endpoint
VITE_TRANSLATION_API_KEY=your_translation_api_key
```

#### Deployment Steps

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables as described above
5. Deploy!

The app includes serverless functions that securely handle translation API calls, ensuring your API keys are never exposed to the client.

## 📂 Project Structure

```
src/
├── assets/            # Static assets
├── components/        # Reusable UI components
│   ├── ui/            # Presentational components
│   └── layout/        # Layout components
├── constants/         # App constants & translations
├── context/           # Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Application views
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🌟 Highlights

### Advanced Features
- **Persistent State**: Tasks saved to localStorage
- **Undo/Redo**: Coming soon in v2.0
- **Drag & Drop**: Reorder tasks intuitively
- **Task Search**: Find tasks quickly

### Performance Optimizations
- Code splitting with React.lazy
- Memoized components
- Efficient state updates

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain 100% component test coverage
- Keep commits atomic and well-described
- Document new features in Storybook

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

**Samy Lahoues** - [@Samy-lahoues](https://github.com/Samy-lahoues)  
📧 samylahoues@outlook.com  
💼 [LinkedIn Profile](https://linkedin.com/in/samy-lahoues)

## 🙏 Acknowledgments

- Inspired by TodoMVC
- Icons from React Icons
- Date handling with date-fns
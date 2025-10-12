# Datalabs AI Applications Quiz

**Artificial Intelligence Applications in Organizations and Businesses**

An interactive Artificial Intelligence assessment application with full offline functionality (PWA).

## 📋 Description

**Datalabs AI Applications Quiz** is a comprehensive knowledge assessment system for the webinar "Artificial Intelligence Applications in Organizations and Businesses". It includes 6 different assessments with a total of 60 questions covering topics from basic concepts to advanced ethics and business applications of AI.

The application is designed as a **Progressive Web App (PWA)**, allowing users to install it on their devices and use it **completely offline**, without requiring an internet connection.

## ✨ Features

### 🎯 Assessments
- **6 Assessments** with different difficulty levels
- **60 Multiple Choice Questions**
- **Detailed Explanations** for each question
- **Immediate Feedback** with color-coded indicators for correct/incorrect answers
- **Completion Check** - Warning for unanswered questions
- **Auto-Save Progress** during navigation

### 📊 Scoreboard
- **Automatic Saving** of all attempts to local database
- **Performance Statistics** - Total attempts, average/best/worst scores
- **Advanced Filters**:
  - Filter by assessment
  - Time periods (today, week, month)
  - Score range (min/max percentage)
- **Data Export**:
  - CSV format (UTF-8 with Greek characters)
  - Excel format (XLS)
- **Print** - Optimized print layout

### 💾 Offline-First
- **Progressive Web App (PWA)** - Installs like a native app
- **Service Worker** - Caches all application files
- **IndexedDB** - Local data storage
- **Full Offline Functionality** - All features available without internet
- **Offline Indicator** - Visual connection status indicator

### 🎨 UI/UX
- **Responsive Design** - Adapts to all devices (desktop, tablet, mobile)
- **Modern Interface** - Clean and modern UI with Tailwind CSS v4
- **Dark Theme Support** - Theme color follows system preferences
- **Smooth Animations** - Smooth transitions and animations
- **Mobile-First** - Optimized for mobile with hamburger menu sidebar

## 🛠️ Technology Stack

### Frontend Framework
- **Vue 3** (v3.5.22) - Progressive JavaScript Framework with Composition API
- **Vue Router** (v4) - Official routing for Vue.js

### Build Tool
- **Vite** (v7.1.7) - Next Generation Frontend Tooling
- **@vitejs/plugin-vue** - Vue 3 plugin for Vite

### Styling
- **Tailwind CSS** (v4.1.14) - Utility-first CSS Framework
- **@tailwindcss/vite** - Vite plugin for Tailwind v4

### PWA & Offline
- **vite-plugin-pwa** (v1.0.3) - PWA plugin for Vite
- **Workbox** - Service Worker generation and caching strategies
- **IndexedDB API** - Browser-native data storage

### Development
- **ESLint** - Code linting
- **pnpm** - Fast, disk space efficient package manager

## 📦 Installation

### Prerequisites
- Node.js (v18 or newer)
- pnpm (or npm/yarn)

### Steps

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the folder
cd datalabs-ai-applications-quiz

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview
```

## 🚀 Usage

### Development Mode
```bash
pnpm dev
```
Opens the application at `http://localhost:5173`

**Note:** Service Worker does not work in development mode.

### Production Build
```bash
pnpm build
pnpm preview
```
Creates an optimized build and runs it at `http://localhost:4173`

**Note:** To test PWA functionality, use the production build.

## 📱 PWA - Installation & Offline Functionality

### Install as Application

**Desktop (Chrome/Edge):**
1. Open the application in your browser
2. Look for the install icon (⊕) in the address bar
3. Click to install
4. The app will appear as a standalone app

**Mobile (Android/iOS):**
1. Open the browser menu
2. Select "Add to Home Screen" / "Install App"
3. The app will appear on your home screen

### Testing Offline Functionality

1. Run `pnpm build && pnpm preview`
2. Open the application
3. Open DevTools (F12)
4. Application tab → Service Workers
5. Enable the "Offline" checkbox
6. Refresh the page - **it still works!**

## 📂 Project Structure

```
datalabs-ai-applications-quiz/
├── public/                          # Static assets
│   └── vite.svg                     # App icon
├── src/
│   ├── assets/
│   │   └── data/
│   │       └── voucher_ai_quizzes.json  # Quiz questions & data
│   ├── components/
│   │   ├── AppFooter.vue            # Footer component
│   │   ├── AppOverlay.vue           # Mobile sidebar overlay
│   │   ├── AppSidebar.vue           # Navigation sidebar
│   │   ├── AppTopBar.vue            # Top navigation bar
│   │   ├── AssessmentCard.vue       # Quiz card on dashboard
│   │   ├── OfflineIndicator.vue     # Offline status indicator
│   │   ├── QuestionCard.vue         # Question display component
│   │   ├── QuizResults.vue          # Results page component
│   │   └── UnansweredQuestionsModal.vue  # Warning modal
│   ├── composables/
│   │   ├── useIndexedDB.js          # IndexedDB operations
│   │   └── useSidebar.js            # Sidebar state management
│   ├── router/
│   │   └── index.js                 # Vue Router configuration
│   ├── views/
│   │   ├── Dashboard.vue            # Main dashboard
│   │   ├── Quiz.vue                 # Quiz taking view
│   │   └── Scoreboard.vue           # Score history & statistics
│   ├── App.vue                      # Root component
│   ├── main.js                      # App entry point
│   └── style.css                    # Global styles + Tailwind
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

## 🎯 Assessments

### 1. Introduction to Artificial Intelligence (Easy)
10 questions on basic concepts, applications, and challenges of AI.

### 2. Generative Artificial Intelligence (Medium)
10 questions on GANs, Transformers, and generative AI applications.

### 3. Business AI (Medium)
10 questions on using AI in business decisions and management.

### 4. Society, Economy & AI Policies (Hard)
10 questions on impacts, policies, and AI initiatives.

### 5. Ethics & Deontology in AI (Hard)
10 questions on ethical issues, bias, and rights.

### 6. Ethics & Deontology in AI (Hard)
10 questions on advanced ethics topics in AI.

## 💡 How It Works

### Offline Architecture

```
┌─────────────────────────────────────────┐
│         User Opens App                  │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────▼──────────┐
      │   Service Worker     │
      │  (Cached App Files)  │
      └───────────┬──────────┘
                  │
      ┌───────────▼──────────┐
      │    Vue Application   │
      └───────────┬──────────┘
                  │
      ┌───────────▼──────────┐
      │      IndexedDB       │
      │   (User Quiz Data)   │
      └──────────────────────┘
```

### Data Flow

1. **User takes quiz** → Answers stored in memory
2. **User completes quiz** → Score calculated
3. **Attempt saved** → IndexedDB stores attempt data
4. **User views scoreboard** → IndexedDB retrieves all attempts
5. **Filters applied** → Client-side filtering (instant)
6. **Export triggered** → Generate CSV/Excel from filtered data

### Storage

- **Service Worker Cache**: ~2-5MB (App files, assets, JSON data)
- **IndexedDB**: Unlimited attempts (typical: ~1KB per attempt)
- **Total Offline Capability**: Full app + unlimited quiz history

## 🔄 Offline Capabilities

### What Works Offline?
- ✅ Browse all assessments
- ✅ Take any quiz
- ✅ View results with explanations
- ✅ Check scoreboard with full history
- ✅ Apply filters and search
- ✅ Export data to CSV/Excel
- ✅ Print scoreboard

### How It Works
The application uses a combination of technologies to work completely offline:

1. **Service Worker** caches all application files (HTML, CSS, JavaScript, images)
2. **IndexedDB** stores all quiz attempts locally
3. **No server required** - Everything runs in the browser
4. **Persistent storage** - Data survives browser restarts

## 🔒 Privacy & Security

- ✅ **Fully local storage** - All data in the user's browser
- ✅ **No server communication** - No data sent anywhere
- ✅ **No tracking** - No user tracking
- ✅ **No analytics** - No data collection
- ✅ **User control** - Users control their data

## 🌐 Language Support

**Current:** Greek (UI text and content)  
**Planned:** Multi-language support with vue-i18n

## 🎨 Design Features

### Color-Coded Feedback
- **Green** (≥80%) - Excellent performance
- **Yellow** (60-79%) - Good performance
- **Red** (<60%) - Needs improvement

### Responsive Breakpoints
- **Mobile**: < 768px (Sidebar hidden, hamburger menu)
- **Tablet**: 768px - 1024px (Sidebar hidden, hamburger menu)
- **Desktop**: ≥ 1024px (Sidebar always visible)

## 🚀 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Load**: < 2 seconds
- **Subsequent Loads**: < 1 second (cached)
- **Offline Load**: Instant (fully cached)

## 🚀 Deployment

### GitHub Pages

The application is automatically deployed to GitHub Pages using GitHub Actions.

**Setup:**

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: Select "GitHub Actions"
4. The workflow will automatically deploy on every push to `main`/`master`

**Manual Deployment:**
- Go to Actions tab → Deploy to GitHub Pages → Run workflow

**Live URL:** `https://[username].github.io/datalabs-voucher/`

### CI/CD Pipeline

The GitHub Actions workflow:
- ✅ Runs on every push to main/master
- ✅ Installs dependencies with pnpm
- ✅ Builds the production bundle
- ✅ Deploys to GitHub Pages
- ✅ Includes PWA service worker

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the project owner.

## 📄 License

Private Project - All Rights Reserved

## 🙏 Acknowledgments

Developed with modern web technologies to provide an excellent educational experience in the field of Artificial Intelligence.

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Language:** Greek (UI), English (Documentation)

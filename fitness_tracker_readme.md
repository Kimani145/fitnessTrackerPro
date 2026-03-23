# FitTrack Pro - Fullstack Fitness Tracker

A comprehensive fitness tracking web application built with modern fullstack technologies. Track workouts, monitor progress, connect with friends, and achieve your fitness goals.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/fittrack-pro.git
cd fittrack-pro

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Start development servers
npm run dev:all
```

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Phases](#development-phases)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Deployment Guide](#deployment-guide)
- [Contributing](#contributing)

## ✨ Features

### Phase 1 - Core Features (MVP)
- [x] User registration and authentication
- [x] Basic workout logging
- [x] Exercise library
- [x] Progress tracking
- [x] Personal dashboard

### Phase 2 - Enhanced Tracking
- [ ] Advanced workout builder
- [ ] Timer and rest periods
- [ ] Photo progress tracking
- [ ] Data visualization charts
- [ ] Goal setting and tracking

### Phase 3 - Social Features
- [ ] Friend connections
- [ ] Workout sharing
- [ ] Community challenges
- [ ] Leaderboards
- [ ] Achievement system

### Phase 4 - Advanced Features
- [ ] Nutrition tracking
- [ ] Wearable device integration
- [ ] AI workout recommendations
- [ ] Mobile app (PWA)
- [ ] Offline functionality

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Storage**: Multer + Cloudinary
- **API Testing**: Jest + Supertest
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18 + TypeScript
- **State Management**: Zustand
- **Routing**: React Router v6
- **UI Library**: Tailwind CSS + Headless UI
- **Charts**: Chart.js / Recharts
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

### DevOps & Tools
- **Version Control**: Git + GitHub
- **Package Manager**: npm
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier
- **Pre-commit**: Husky + lint-staged
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend) + Railway (Backend)
- **Monitoring**: Sentry

## 📁 Project Structure

```
fittrack-pro/
├── README.md
├── package.json                 # Root package.json for scripts
├── .gitignore
├── .env.example
│
├── backend/
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── workoutController.js
│   │   │   ├── exerciseController.js
│   │   │   └── progressController.js
│   │   │
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   │
│   │   ├── models/              # Database schemas
│   │   │   ├── User.js
│   │   │   ├── Workout.js
│   │   │   ├── Exercise.js
│   │   │   ├── Progress.js
│   │   │   └── Achievement.js
│   │   │
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── workouts.js
│   │   │   ├── exercises.js
│   │   │   └── progress.js
│   │   │
│   │   ├── services/            # Business logic
│   │   │   ├── authService.js
│   │   │   ├── workoutService.js
│   │   │   ├── analyticsService.js
│   │   │   └── notificationService.js
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── validators.js
│   │   │   ├── helpers.js
│   │   │   ├── constants.js
│   │   │   └── seeders.js
│   │   │
│   │   ├── config/              # Configuration files
│   │   │   ├── database.js
│   │   │   ├── cloudinary.js
│   │   │   └── swagger.js
│   │   │
│   │   └── app.js               # Express app setup
│   │
│   ├── tests/                   # Backend tests
│   │   ├── auth.test.js
│   │   ├── workouts.test.js
│   │   └── helpers.test.js
│   │
│   ├── package.json
│   ├── .env.example
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json        # PWA manifest
│   │   └── sw.js                # Service worker
│   │
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/              # Basic UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Chart.tsx
│   │   │   │
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   │
│   │   │   ├── forms/           # Form components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── WorkoutForm.tsx
│   │   │   │   └── ExerciseForm.tsx
│   │   │   │
│   │   │   └── features/        # Feature-specific components
│   │   │       ├── workout/
│   │   │       ├── progress/
│   │   │       └── social/
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Workouts.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Social.tsx
│   │   │   └── Profile.tsx
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useWorkouts.ts
│   │   │   ├── useProgress.ts
│   │   │   └── useLocalStorage.ts
│   │   │
│   │   ├── store/               # State management
│   │   │   ├── authStore.ts
│   │   │   ├── workoutStore.ts
│   │   │   └── uiStore.ts
│   │   │
│   │   ├── services/            # API services
│   │   │   ├── api.ts           # Axios configuration
│   │   │   ├── authService.ts
│   │   │   ├── workoutService.ts
│   │   │   └── progressService.ts
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── helpers.ts
│   │   │   ├── constants.ts
│   │   │   ├── validators.ts
│   │   │   └── formatters.ts
│   │   │
│   │   ├── types/               # TypeScript types
│   │   │   ├── auth.types.ts
│   │   │   ├── workout.types.ts
│   │   │   └── user.types.ts
│   │   │
│   │   ├── styles/              # Global styles
│   │   │   ├── globals.css
│   │   │   └── components.css
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── tests/                   # Frontend tests
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── docs/                        # Documentation
    ├── api/                     # API documentation
    ├── deployment/              # Deployment guides
    └── development/             # Development guides
```

## 🚧 Development Phases

### Phase 1: Foundation (Week 1-2)
**Goal**: Create a working MVP with basic functionality

**Backend Tasks:**
- [ ] Set up Express.js server with basic middleware
- [ ] Configure MongoDB connection and basic models
- [ ] Implement JWT authentication system
- [ ] Create user registration and login endpoints
- [ ] Set up basic error handling and validation

**Frontend Tasks:**
- [ ] Set up React + TypeScript + Vite project
- [ ] Configure Tailwind CSS and basic styling
- [ ] Create authentication pages (login/register)
- [ ] Set up routing and protected routes
- [ ] Implement basic state management

**Models to Create:**
- User (name, email, password, profile info)
- Exercise (name, category, instructions, muscle groups)
- Workout (user, exercises, date, duration)

### Phase 2: Core Features (Week 3-4)
**Goal**: Build the main workout tracking functionality

**Backend Tasks:**
- [ ] Create comprehensive exercise library with seed data
- [ ] Implement workout CRUD operations
- [ ] Add progress tracking endpoints
- [ ] Set up file upload for profile pictures
- [ ] Create data aggregation for statistics

**Frontend Tasks:**
- [ ] Build workout creation and editing interface
- [ ] Create exercise selection with search and filters
- [ ] Implement workout timer and rest periods
- [ ] Add progress visualization with charts
- [ ] Create personal dashboard

**New Models:**
- WorkoutSet (exercise, reps, weight, duration)
- Progress (user, date, metrics, photos)

### Phase 3: Enhanced Experience (Week 5-6)
**Goal**: Add advanced features and improve UX

**Backend Tasks:**
- [ ] Implement goal setting and achievement system
- [ ] Add advanced analytics and insights
- [ ] Create notification system
- [ ] Set up image optimization and storage
- [ ] Add data export functionality

**Frontend Tasks:**
- [ ] Build comprehensive progress tracking pages
- [ ] Add photo comparison features
- [ ] Implement goal setting and progress indicators
- [ ] Create workout templates and favorites
- [ ] Add offline functionality (PWA)

### Phase 4: Social Features (Week 7-8)
**Goal**: Build community and social engagement

**Backend Tasks:**
- [ ] Implement friend system and connections
- [ ] Create workout sharing functionality
- [ ] Add community challenges and leaderboards
- [ ] Implement commenting and workout reactions
- [ ] Set up real-time notifications

**Frontend Tasks:**
- [ ] Build social feed and activity timeline
- [ ] Create friend management pages
- [ ] Implement challenge participation
- [ ] Add workout sharing and discovery
- [ ] Build messaging system

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    height: Number,
    currentWeight: Number,
    profilePicture: String,
    fitnessLevel: String,
    goals: [String]
  },
  preferences: {
    units: String, // metric/imperial
    privacy: String, // public/friends/private
    notifications: Object
  },
  stats: {
    totalWorkouts: Number,
    totalTimeExercised: Number,
    currentStreak: Number,
    longestStreak: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Exercise Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  category: String, // strength, cardio, flexibility
  primaryMuscles: [String],
  secondaryMuscles: [String],
  equipment: String,
  difficulty: String, // beginner, intermediate, advanced
  instructions: [String],
  tips: [String],
  images: [String],
  videoUrl: String,
  isCustom: Boolean,
  createdBy: ObjectId, // if custom exercise
  createdAt: Date
}
```

### Workout Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (required),
  name: String,
  date: Date (required),
  startTime: Date,
  endTime: Date,
  duration: Number, // in minutes
  exercises: [{
    exercise: ObjectId,
    sets: [{
      reps: Number,
      weight: Number,
      duration: Number, // for time-based exercises
      distance: Number, // for cardio
      restTime: Number,
      notes: String
    }],
    order: Number
  }],
  notes: String,
  rating: Number, // 1-5
  calories: Number,
  isTemplate: Boolean,
  templateName: String,
  tags: [String],
  visibility: String, // public, friends, private
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Components Structure

### Core Components (`src/components/ui/`)
- **Button.tsx** - Reusable button with variants
- **Input.tsx** - Form input with validation states
- **Modal.tsx** - Overlay modal component
- **Card.tsx** - Container component for content sections
- **Badge.tsx** - Small status/category indicators
- **Progress.tsx** - Progress bars and indicators
- **Chart.tsx** - Wrapper for chart libraries

### Layout Components (`src/components/layout/`)
- **Header.tsx** - Navigation and user menu
- **Sidebar.tsx** - Main navigation sidebar
- **MobileNav.tsx** - Mobile navigation drawer
- **PageLayout.tsx** - Common page wrapper
- **AuthLayout.tsx** - Layout for auth pages

### Feature Components (`src/components/features/`)

**Workout Components:**
- **WorkoutCard.tsx** - Display workout summary
- **ExerciseSelector.tsx** - Exercise selection interface
- **SetTracker.tsx** - Track individual sets
- **WorkoutTimer.tsx** - Timer for workouts and rest
- **WorkoutStats.tsx** - Display workout statistics

**Progress Components:**
- **ProgressChart.tsx** - Various progress visualizations
- **WeightTracker.tsx** - Weight tracking component
- **PhotoComparison.tsx** - Before/after photo comparison
- **GoalProgress.tsx** - Goal tracking indicators

**Social Components:**
- **ActivityFeed.tsx** - Social activity timeline
- **FriendsList.tsx** - Friends management
- **WorkoutShare.tsx** - Share workout interface
- **ChallengeCard.tsx** - Challenge participation

## 🌐 API Documentation

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### User Endpoints
```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/upload-avatar
GET    /api/users/stats
DELETE /api/users/account
```

### Workout Endpoints
```
GET    /api/workouts              # Get user workouts
POST   /api/workouts              # Create new workout
GET    /api/workouts/:id          # Get specific workout
PUT    /api/workouts/:id          # Update workout
DELETE /api/workouts/:id          # Delete workout
GET    /api/workouts/templates    # Get workout templates
POST   /api/workouts/:id/share    # Share workout
```

### Exercise Endpoints
```
GET    /api/exercises             # Get all exercises
GET    /api/exercises/:id         # Get specific exercise
POST   /api/exercises             # Create custom exercise
GET    /api/exercises/search      # Search exercises
GET    /api/exercises/categories  # Get categories
```

### Progress Endpoints
```
GET    /api/progress              # Get progress data
POST   /api/progress/weight       # Log weight entry
POST   /api/progress/photos       # Upload progress photos
GET    /api/progress/analytics    # Get analytics data
GET    /api/progress/goals        # Get goal progress
POST   /api/progress/goals        # Set new goal
```

## 🚀 Deployment Guide

### Environment Variables

**Backend (.env)**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fittrack
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000
```

**Frontend (.env)**
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123def456
```

### Development Commands

**Root Package.json Scripts:**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "test": "cd backend && npm test && cd ../frontend && npm test",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install"
  }
}
```

### Production Deployment

**Backend (Railway/Heroku):**
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables
4. Deploy automatically on push

**Frontend (Vercel/Netlify):**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables

## 📝 Development Guidelines

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow conventional commit messages
- Write descriptive variable and function names
- Comment complex business logic

### Testing Strategy
- Unit tests for utility functions and services
- Integration tests for API endpoints
- Component tests for React components
- E2E tests for critical user flows

### Git Workflow
- Feature branches for new functionality
- Pull requests for code review
- Automated testing on PRs
- Semantic versioning for releases

### Performance Considerations
- Implement pagination for large data sets
- Use lazy loading for components and images
- Optimize database queries with proper indexing
- Implement caching strategies
- Compress and optimize images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🎯 Next Steps

1.  Set up development environment and basic authentication
2.  Build core workout tracking functionality
3.  Add progress tracking and data visualization
4. Implement social features and deployment

Happy coding! 🏋️‍♂️💪

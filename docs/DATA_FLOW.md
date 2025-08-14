# FitTrack Pro - Data Flow & Architecture

## 🏗️ Application Architecture

### Entry Point Flow
```
index.html → src/main.tsx → src/App.tsx → Components
```

## 📁 File Structure & Interactions

```
src/
├── main.tsx              # Entry point - renders App component
├── App.tsx               # Root component - handles routing logic
├── components/
│   ├── FitnessApp.tsx    # Main app wrapper - manages sidebar/content
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Button component with variants
│   │   ├── Card.tsx      # Container component
│   │   ├── Badge.tsx     # Status indicators
│   │   ├── Input.tsx     # Form inputs
│   │   └── Modal.tsx     # Overlay modals
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Top navigation bar
│   │   └── Sidebar.tsx   # Side navigation menu
│   └── features/         # Feature-specific components
│       ├── Dashboard.tsx # Dashboard view
│       ├── Workouts.tsx  # Workouts view
│       └── Progress.tsx  # Progress tracking view
└── pages/
    └── Home.tsx          # Landing page
```

## 🔄 Data Flow Diagram

### 1. Application Bootstrap
```
Browser loads index.html
    ↓
Loads /src/main.tsx
    ↓
Creates React root and renders <App />
    ↓
App.tsx determines which view to show
```

### 2. State Management Flow
```
App.tsx (Root State)
├── currentView: 'home' | 'app'
├── isLoggedIn: boolean
└── Functions: handleLogin(), handleLogout()
    ↓
Passes state/functions to child components
    ↓
Child components receive props and call parent functions
```

### 3. Navigation Flow
```
User clicks "Get Started" on Home.tsx
    ↓
Calls handleLogin() in App.tsx
    ↓
App.tsx updates state: isLoggedIn = true, currentView = 'app'
    ↓
App.tsx renders <FitnessApp /> instead of <Home />
```

### 4. Sidebar Navigation Flow
```
FitnessApp.tsx manages:
├── sidebarOpen: boolean
├── activeTab: string
└── Functions: setSidebarOpen(), setActiveTab()
    ↓
Passes to Sidebar.tsx as props
    ↓
Sidebar.tsx calls onTabChange(tabId) when menu item clicked
    ↓
FitnessApp.tsx updates activeTab state
    ↓
FitnessApp.tsx renders appropriate component based on activeTab
```

## 🔧 Component Interaction Details

### App.tsx (Root Component)
**Purpose**: Main routing logic and authentication state
**State**:
- `currentView`: Controls whether to show Home or FitnessApp
- `isLoggedIn`: Authentication status

**Functions**:
- `handleLogin()`: Sets logged in state and switches to app view
- `handleLogout()`: Clears session and returns to home

### FitnessApp.tsx (Main App Container)
**Purpose**: Layout management and tab navigation
**State**:
- `sidebarOpen`: Controls mobile sidebar visibility
- `activeTab`: Current selected tab/page

**Functions**:
- `setSidebarOpen()`: Toggle sidebar on mobile
- `setActiveTab()`: Switch between different app sections

### Component Props Flow
```
App.tsx
├── Home.tsx (no props needed)
└── FitnessApp.tsx
    ├── onLogout: () => void
    └── Internal state passed to children:
        ├── Header.tsx
        │   ├── onMenuClick: () => void
        │   └── onLogout: () => void
        └── Sidebar.tsx
            ├── isOpen: boolean
            ├── activeTab: string
            └── onTabChange: (tab: string) => void
```

## 🐛 Common Button Issues & Solutions

### Issue 1: Buttons Not Responding
**Possible Causes**:
1. Missing onClick handlers
2. Event propagation issues
3. CSS pointer-events disabled
4. JavaScript errors preventing execution

### Issue 2: Navigation Not Working
**Check**:
1. Are props being passed correctly?
2. Is the state updating in parent components?
3. Are there console errors?

### Issue 3: State Not Updating
**Verify**:
1. State setter functions are called correctly
2. Component re-renders are happening
3. Props are passed down properly

## 🔍 Debugging Steps

### 1. Check Console
Open browser DevTools (F12) and look for:
- JavaScript errors
- Failed network requests
- React warnings

### 2. Verify Props
Add console.logs to verify data flow:
```typescript
// In Sidebar.tsx
console.log('Sidebar props:', { isOpen, activeTab, onTabChange });

// In Button.tsx
const handleClick = () => {
  console.log('Button clicked!');
  onClick?.();
};
```

### 3. Check State Updates
```typescript
// In FitnessApp.tsx
const setActiveTab = (tab: string) => {
  console.log('Setting active tab to:', tab);
  setActiveTab(tab);
};
```

## 📊 State Flow Example

When user clicks "Workouts" in sidebar:

1. **Sidebar.tsx** receives click event
2. Calls `onTabChange('workouts')`
3. **FitnessApp.tsx** receives the call
4. Updates `activeTab` state to 'workouts'
5. **FitnessApp.tsx** re-renders
6. `renderContent()` function returns `<Workouts />` component
7. User sees Workouts page

## 🎯 Key Points

1. **Single Source of Truth**: App.tsx manages global state
2. **Props Down, Events Up**: Data flows down, events bubble up
3. **Component Isolation**: Each component has specific responsibilities
4. **State Lifting**: Shared state is lifted to common parent
5. **Event Handling**: Click events trigger state changes in parent components

This architecture ensures predictable data flow and makes debugging easier by following React best practices.
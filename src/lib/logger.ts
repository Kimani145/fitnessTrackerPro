/**
 * Development Logger Utility
 * Provides comprehensive console logging for debugging and monitoring app progress
 */

export const Logger = {
  // ============ Application Lifecycle =============
  appInitialized: () => {
    console.log(
      '%c🚀 FitTrackPro App Initialized',
      'color: #00d084; font-weight: bold; font-size: 12px;'
    );
  },

  appMounted: () => {
    console.log(
      '%c✅ App Component Mounted',
      'color: #00d084; font-weight: bold; font-size: 11px;'
    );
  },

  // ============ Authentication =============
  authStateInitialized: () => {
    console.log(
      '%c🔐 Auth State Observer Initialized',
      'color: #0066ff; font-weight: bold;'
    );
  },

  authStateChanged: (user: any) => {
    if (user) {
      console.log(
        `%c👤 User Authenticated: ${user.email}`,
        'color: #00d084; font-weight: bold;'
      );
    } else {
      console.log(
        '%c🚪 User Logged Out',
        'color: #ff6b6b; font-weight: bold;'
      );
    }
  },

  authError: (error: any) => {
    console.error(
      '%c❌ Authentication Error:',
      'color: #ff6b6b; font-weight: bold;',
      error
    );
  },

  userProfileLoaded: (profile: any) => {
    console.log(
      `%c📋 User Profile Loaded: ${profile.name} (${profile.uid})`,
      'color: #0066ff;'
    );
  },

  // ============ Routing =============
  routeChanged: (path: string) => {
    console.log(
      `%c📍 Route Changed: ${path}`,
      'color: #665dff; font-weight: bold;'
    );
  },

  navigationInitiated: (from: string, to: string) => {
    console.log(
      `%c🔀 Navigating from ${from} to ${to}`,
      'color: #665dff;'
    );
  },

  // ============ Theme =============
  themeChanged: (theme: string) => {
    console.log(
      `%c🎨 Theme Changed to: ${theme}`,
      `color: ${theme === 'dark' ? '#222' : '#ffb84d'}; font-weight: bold; background-color: ${theme === 'dark' ? '#fff' : '#222'}; padding: 2px 6px; border-radius: 3px;`
    );
  },

  themeInitialized: (theme: string) => {
    console.log(
      `%c🎨 Theme Initialized: ${theme}`,
      `color: ${theme === 'dark' ? '#222' : '#ffb84d'}; font-weight: bold;`
    );
  },

  browserThemePreference: (prefersDark: boolean) => {
    console.log(
      `%c💻 Browser Preference: ${prefersDark ? 'Dark' : 'Light'}`,
      'color: #665dff;'
    );
  },

  // ============ Data Operations =============
  dataFetch: (resource: string) => {
    console.log(
      `%c📤 Fetching: ${resource}`,
      'color: #ffa502; font-weight: bold;'
    );
  },

  dataFetchSuccess: (resource: string, data: any) => {
    console.log(
      `%c✅ Fetched Successfully: ${resource}`,
      'color: #00d084;',
      data
    );
  },

  dataFetchError: (resource: string, error: any) => {
    console.error(
      `%c❌ Fetch Failed: ${resource}`,
      'color: #ff6b6b; font-weight: bold;',
      error
    );
  },

  dataUpdated: (resource: string, updates: any) => {
    console.log(
      `%c✏️ Updated: ${resource}`,
      'color: #0066ff;',
      updates
    );
  },

  dataDeleted: (resource: string, id: string) => {
    console.log(
      `%c🗑️ Deleted: ${resource} (${id})`,
      'color: #ff6b6b;'
    );
  },

  // ============ Firebase =============
  firebaseInitialized: () => {
    console.log(
      '%c🔥 Firebase Initialized Successfully',
      'color: #ff9500; font-weight: bold;'
    );
  },

  firebaseNotConfigured: () => {
    console.warn(
      '%c⚠️ Firebase Not Configured - Check .env variables',
      'color: #ff6b6b; font-weight: bold;'
    );
  },

  firebaseError: (error: any) => {
    console.error(
      '%c🔥 Firebase Error:',
      'color: #ff6b6b; font-weight: bold;',
      error
    );
  },

  // ============ Performance =============
  performanceMetric: (label: string, duration: number) => {
    const color = duration > 1000 ? '#ff6b6b' : duration > 500 ? '#ff9500' : '#00d084';
    console.log(
      `%c⏱️ ${label}: ${duration}ms`,
      `color: ${color}; font-weight: bold;`
    );
  },

  // ============ Errors & Warnings =============
  error: (title: string, error: any) => {
    console.error(
      `%c❌ ${title}`,
      'color: #ff6b6b; font-weight: bold;',
      error
    );
  },

  warning: (title: string, details?: any) => {
    console.warn(
      `%c⚠️ ${title}`,
      'color: #ff9500; font-weight: bold;',
      details || ''
    );
  },

  info: (title: string, details?: any) => {
    console.log(
      `%cℹ️ ${title}`,
      'color: #0066ff;',
      details || ''
    );
  },

  // ============ Development Tracking =============
  componentMounted: (name: string) => {
    console.log(
      `%c📦 ${name} Mounted`,
      'color: #665dff;'
    );
  },

  componentUnmounted: (name: string) => {
    console.log(
      `%c📦 ${name} Unmounted`,
      'color: #665dff;'
    );
  },

  stateUpdate: (component: string, state: any) => {
    console.log(
      `%c🔄 ${component} State Update:`,
      'color: #0066ff;',
      state
    );
  },

  debug: (message: string, data?: any) => {
    console.log(
      `%c🐛 ${message}`,
      'color: #665dff; font-style: italic;',
      data || ''
    );
  },

  // ============ Network =============
  networkRequest: (method: string, url: string) => {
    console.log(
      `%c🌐 ${method} ${url}`,
      'color: #0066ff;'
    );
  },

  networkSuccess: (method: string, statusCode: number) => {
    console.log(
      `%c✅ ${method} ${statusCode}`,
      'color: #00d084;'
    );
  },

  networkError: (method: string, statusCode: number, error: any) => {
    console.error(
      `%c❌ ${method} ${statusCode}`,
      'color: #ff6b6b; font-weight: bold;',
      error
    );
  },
};

// Export individual log functions for convenience
export const log = {
  app: Logger.appInitialized,
  auth: Logger.authStateChanged,
  route: Logger.routeChanged,
  theme: Logger.themeChanged,
  error: Logger.error,
  warn: Logger.warning,
  info: Logger.info,
  debug: Logger.debug,
};

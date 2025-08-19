import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { useState, useEffect } from 'react';

  interface SettingsProps {
  theme: string;
  setTheme: (theme: string) => void;
}


  const Settings: React.FC<SettingsProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [units, setUnits] = useState('metric');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check for saved dark mode preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const handleProfileUpdate = () => {
    // In a real application, you would make an API call to update the user's profile
    // For example:
    // api.updateProfile({ name, email, password })
    //   .then(() => console.log('Profile updated successfully'))
    //   .catch(error => console.error('Failed to update profile:', error));
    console.log('Profile updated:', { name, email, password });
  };

  const handlePreferencesUpdate = () => {
    // In a real application, you would make an API call to update the user's preferences
    // For example:
    // api.updatePreferences({ units })
    //   .then(() => console.log('Preferences updated successfully'))
    //   .catch(error => console.error('Failed to update preferences:', error));
    console.log('Preferences updated:', { units });
  };

  const handleNotificationsUpdate = () => {
    // In a real application, you would make an API call to update the user's notification settings
    // For example:
    // api.updateNotifications({ emailNotifications, pushNotifications })
    //   .then(() => console.log('Notifications updated successfully'))
    //   .catch(error => console.error('Failed to update notifications:', error));
    console.log('Notifications updated:', { emailNotifications, pushNotifications });
  };

  const handleProfilePictureChange = () => {
    // This would typically open a file input to allow the user to select a new profile picture
    console.log('Profile picture change clicked');
  };

  const handleClearCache = () => {
    localStorage.clear();
    alert('Cache cleared!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <Input label="Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <Button className="ml-5" onClick={handleProfilePictureChange}>Change</Button>
              </div>
            </div>
            <Button onClick={handleProfileUpdate}>Save Profile</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <Switch label="Dark Mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Units</label>
              <Select
                options={[
                  { value: 'metric', label: 'Metric (kg, km)' },
                  { value: 'imperial', label: 'Imperial (lbs, miles)' },
                ]}
                value={units}
                onChange={(value) => setUnits(value as string)} label={''}              />
            </div>
            <Button onClick={handlePreferencesUpdate}>Save Preferences</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <Switch label="Workout Reminders" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <Switch label="Workout Reminders" checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
            <Button onClick={handleNotificationsUpdate}>Save Notifications</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <Button onClick={handleClearCache}>Clear Local Cache</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;


//   const handleProfilePictureChange = () => {
//     // Add logic to handle profile picture change
//     // This could open a file picker or redirect to a profile picture upload page
//     console.log('Profile picture change clicked');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Settings</h1>
//       <div className="space-y-8">
//         <Card>
//           <h2 className="text-xl font-semibold mb-4">Profile</h2>
//           <div className="space-y-4">
//             <Input label="Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
//             <Input label="Email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <Input label="Password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
//               <div className="mt-1 flex items-center">
//                 <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
//                   <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </span>
//                 <Button className="ml-5" onClick={handleProfilePictureChange}>Change</Button>
//               </div>
//             </div>
//             <Button onClick={handleProfileUpdate}>Save Profile</Button>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="text-xl font-semibold mb-4">Preferences</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Theme</label>
//               <Switch label="Dark Mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
//             </div>
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Units</label>
//               <Select
//                 options={[
//                   { value: 'metric', label: 'Metric (kg, km)' },
//                   { value: 'imperial', label: 'Imperial (lbs, miles)' },
//                 ]}
//                 value={units}
//                 onChange={(value) => setUnits(value as string)} label={''}              />
//             </div>
//             <Button onClick={handlePreferencesUpdate}>Save Preferences</Button>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="text-xl font-semibold mb-4">Notifications</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Email Notifications</label>
//               <Switch label="Workout Reminders" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
//             </div>
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-gray-700">Push Notifications</label>
//               <Switch label="Workout Reminders" checked={pushNotifications} onCheckedChange={setPushNotifications} />
//             </div>
//             <Button onClick={handleNotificationsUpdate}>Save Notifications</Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Settings;
import React from 'react';

type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isFriend: boolean;
  lastActivity: string;
};

const mockUsers: User[] = [
  { id: 1, name: 'Aisha Mburu', avatarUrl: 'https://i.pravatar.cc/150?u=1', isFriend: true, lastActivity: 'Completed 5km run' },
  { id: 2, name: 'Daniel Otieno', avatarUrl: 'https://i.pravatar.cc/150?u=2', isFriend: false, lastActivity: 'Joined a HIIT class' },
  { id: 3, name: 'Grace Njeri', avatarUrl: 'https://i.pravatar.cc/150?u=3', isFriend: true, lastActivity: 'Posted a new workout' },
  { id: 4, name: 'Samuel K.', avatarUrl: 'https://i.pravatar.cc/150?u=4', isFriend: false, lastActivity: 'Reached weekly goal' },
  { id: 5, name: 'Lydia W.', avatarUrl: 'https://i.pravatar.cc/150?u=5', isFriend: false, lastActivity: 'Started a new challenge' },
];

const Social: React.FC = () => {
  const handleViewProfile = (user: User) => {
    console.log('View profile:', user.id, user.name);
  };

  const handleAddFriend = (user: User) => {
    console.log('Add friend request (mock):', user.id, user.name);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Community Feed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.lastActivity}</p>
                  </div>
                </div>
              </div>
              <div>
                {user.isFriend ? (
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    View Profile
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user)}
                    className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 mb-3">Placeholder for recent activity stream</p>
          <ul className="space-y-3">
            {mockUsers.slice(0, 5).map((u) => (
              <li key={u.id} className="flex items-start space-x-3">
                <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm"><span className="font-medium">{u.name}</span> — <span className="text-gray-600">{u.lastActivity}</span></p>
                  <p className="text-xs text-gray-400">Just now</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Social;

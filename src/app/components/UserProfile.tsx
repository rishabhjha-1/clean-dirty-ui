// components/UserProfile.js
export default function UserProfile({ user }:{user:any}) {
    return (
      <div className="flex items-center space-x-4 p-4 dark:text-white">
        <img src={user?.profile_picture} alt={user?.name} className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold text-primary">{user?.name}</h2>
          <p className="text-secondary">{user?.email}</p>
        </div>
      </div>
    );
  }
  
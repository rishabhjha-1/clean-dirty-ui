import { User } from "../page";

// components/UserProfile.js
export default function UserProfile({ user }:{user:User}) {
    return (
      <div className="flex items-center space-x-4 p-4 ">
        <img src={user?.profile_picture} alt={user?.name} className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold  dark:text-white">{user?.name}</h2>
          <p className=" dark:text-white">{user?.email}</p>
        </div>
      </div>
    );
  }
  
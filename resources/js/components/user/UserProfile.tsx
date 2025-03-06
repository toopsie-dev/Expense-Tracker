import React from "react";
import { useUserContext } from "../../context/UserContext";

const UserProfile: React.FC = () => {
    // Use the context hook to get user data
    const { user } = useUserContext();

    return (
        <div className="flex flex-col items-center mb-8 mt-4">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold mb-2">
                {user.avatarInitials}
            </div>
            <div className="text-center">
                <div className="font-semibold">{user.name}</div>
                {user.email && (
                    <div className="text-sm text-gray-400">{user.email}</div>
                )}
                <div className="mt-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-xs rounded-full inline-block">
                    {user.role}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

import React from "react";
import Image from "next/image";
import { mockUsers } from "@/store/data/mockData";

const UserAvatars: React.FC = () => {
  const displayedUsers = mockUsers.slice(0, 4);
  const remainingCount = mockUsers.length - 3;

  const displayedNames = displayedUsers
    .slice(0, 3)
    .map((user) => user.name)
    .join(", ");

  return (
    <section
      className="flex items-center my-4 sm:my-6 max-sm:flex-col max-sm:items-start"
      role="region"
      aria-label="User avatars"
    >
      <div className="flex" role="list">
        {displayedUsers.map((user, index) => (
          <Image
            key={index}
            src={`/images/user-${index + 1}.svg`}
            alt={`${user.name} avatar`}
            width={40}
            height={40}
            className={`rounded-full border-2 border-white ${
              index > 0 ? "-ml-2" : ""
            }`}
            aria-label={`${user.name} avatar`}
            role="img"
          />
        ))}
      </div>
      <div className="ml-3" role="text">
        <span className="text-sm text-primary-grey">
          {displayedNames}
          {remainingCount > 0 && <span> +{remainingCount} others</span>}
        </span>
      </div>
    </section>
  );
};

export default UserAvatars;

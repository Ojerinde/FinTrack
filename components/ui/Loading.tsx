import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-accent"></div>
    </div>
  );
};

export default Loading;

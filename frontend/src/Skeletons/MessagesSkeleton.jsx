const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            </div>

            <div className="ml-2">
              <div className="mb-1">
                <div className="h-4 w-16 bg-gray-300 animate-pulse" />
              </div>

              <div className="bg-transparent p-0">
                <div className="h-16 w-[200px] bg-gray-300 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;
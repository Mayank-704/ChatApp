import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "../Skeletons/MessagesSkeleton.jsx";
import { formatMessageTime } from "../lib/utils.js";

function ChatContainer() {
  const { messages, selectedUser, isMessageLoading, getMessage, subscribeToMessage, unsubscribeFromMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessage(selectedUser._id);

    subscribeToMessage();

    return ()=> unsubscribeFromMessage();
  }, [selectedUser, getMessage, subscribeToMessage, unsubscribeFromMessage]);

useEffect(()=>{
if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behaviour: "smooth"});
}
},[messages])

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-end  ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
              ref={messageEndRef}
            >
              {message.senderId!==authUser._id && <div className="flex-shrink-0 w-10 h-10 rounded-full border overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>}
              <div className="ml-2">
                <div className="text-xs opacity-50 mb-1">
                  <time>{formatMessageTime(message.createdAt)}</time>
                </div>
                <div className="bg-gray-200 p-2 rounded-lg">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
              {message.senderId===authUser._id && <div className="flex-shrink-0 w-10 h-10 rounded-full border overflow-hidden ml-2">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>}
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    </>
  );
}

export default ChatContainer;
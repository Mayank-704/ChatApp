import { create } from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast"
import {useAuthStore} from "./useAuthStore.js"

export const useChatStore = create ((set,get)=>({
users: [],
messages: [],
selectedUser: null,
isUsersLoading: false,
isMessageLoading: false,

getUsers: async ()=>{
    set({isUsersLoading: true});
    try {
        const res = await axiosInstance.get("messages/users")
        set({users: res.data})
    } catch (error) {
        console.log("Error while getting users",error);
        toast.error(error.response.data.message);
    }finally{
        set({isUsersLoading: false})
    }
},
getMessage: async (userId)=>{
set({isMessageLoading: true});
try {
    const res = await axiosInstance.get(`messages/${userId}`)
    set({messages: res.data});
    toast.success("Message Loaded Successfuly")
} catch (error) {
    console.log("Error while loading message",error);
    toast.error("Failed to load messages");
}finally{
    set({isMessageLoading: false})
}
},

sendMessage: async (messageData)=>{
    try {
        const {selectedUser, messages} = get();
       const res =  await axiosInstance.post(`messages/user/${selectedUser._id}`,messageData);
       set({messages: [...messages,res.data]});

    } catch (error) {
     console.log("Error while sending message", error);
     toast.error("Error while sendig message");
    }
},

subscribeToMessage: ()=>{
const {selectedUser} = get();
if(!selectedUser) return;
//TODO: Optimize it later
const socket = useAuthStore.getState().socket;
socket.on("newMessage",(newMessage)=>{
  const  isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
    if(!isMessageSentFromSelectedUser) return;
    set({
        messages: [...get().messages,newMessage]
    })
})

},

unsubscribeFromMessage: ()=>{
   const socket = useAuthStore.getState().socket;
   socket.off("newMessage");
},

setSelectedUser: async (selectedUser)=>{
    set({selectedUser});
}

}))
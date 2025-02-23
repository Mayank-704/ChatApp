import { create } from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast"

export const useChatStore = create ((set)=>({
users: [],
messages: [],
selecteduser: null,
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
    const res = await axiosInstance.get(`message/${userId}`)
    set({messages: res.data});
    toast.success("Message Loaded Successfuly")
} catch (error) {
    console.log("Error while loading message",error);
    toast.error("Failed to load messages");
}finally{
    set({isMessageLoading: false})
}
},

setSelectedUser: async (selecteduser)=>{
    set({selecteduser});
}

}))
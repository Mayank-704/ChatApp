import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
 onlineUsers: [],
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    set({isCheckingAuth: true})
    try {
      // const res = await axiosInstance.get("/auth/check");
      const storedUser = localStorage.getItem("authUser")
      set({ authUser: JSON.parse(storedUser) });
    } catch (error) {
      console.log("Error in check-auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      localStorage.setItem("authUser",JSON.stringify(res.data));
      toast.success("Account created successfully");
    } catch (error) {
      // toast.error(error.response.data.message)
      console.log("Error while signing up", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser")
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login",formData)
        set({authUser: res.data })
        localStorage.setItem("authUser",JSON.stringify(res.data))
     toast.success("Logged in Successfully")
     get().connectSocket();
    } catch (error) {
         console.log(error);
        //  toast.error(error.response.data.message)
    }finally{
        set({isLoggingIn: false})
    }
  },

  updateProfile: async (data)=>{
    set({isUpdatingProfile: true});
    try {
      const res = await axiosInstance.put("/auth/update-profile",data);
      set({authUser: res.data});
      localStorage.setItem("authUser",JSON.stringify(res.data))
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log("Error while updating Profile",error);
      toast.error("problem while updating profile")
    }finally{
       set({isUpdatingProfile: false})
    }
  },

  connectSocket: ()=>{
    const {authUser} = get();
    if (!authUser || get().socket?.connected) return;
     const socket = io("http://localhost:5001",{
      query:{
        userId: authUser._id
      }
     });
    
     socket.connect();
     set({socket: socket});
     socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers: userIds});
     })
     console.log("user conneceted", socket.id)
     
  },

  disconnectSocket: ()=>{
   if(get().socket?.connected) {
    get().socket.disconnect()};
    console.log("User Disconnected")
  }

}));

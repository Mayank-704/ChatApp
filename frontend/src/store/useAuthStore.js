import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
 onlineUsers: [],
  isCheckingAuth: true,

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
  }

}));

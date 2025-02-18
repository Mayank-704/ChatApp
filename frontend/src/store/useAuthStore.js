import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggedin: false,
    isUpdatingProfile:false,

    isCheckingAuth: true,

    checkAuth: async ()=>{
       try {
        const res = await axiosInstance.get("/auth/check-auth")
        set({authUser:res.data})
       } catch (error) {
        console.log("Error in check-auth:",error)
        set({authUser:null});
       }finally{
        set({isCheckingAuth: false});
       }
    },
    signup: async (formData)=>{
        set({isSigningUp: true})
    try {
        const res = await axiosInstance.post("/auth/signup",formData)
    set(
        {authUser: res.data
    })
    toast.success("Account created successfully")
    } catch (error) {
        // toast.error(error.response.data.message)
        console.log("Error while signing up",error)
    }finally {
       set({isSigningUp:false})
    }

    }

}));
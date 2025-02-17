import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedup: false,
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
    }
}));
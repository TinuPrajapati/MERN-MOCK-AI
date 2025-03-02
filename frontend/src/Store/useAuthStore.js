import { create } from "zustand";
import Instance from "../api/Instance"; 
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
    authUser: null, // Persist user session
    isLoading: false,
    isError: false,

    // Register User
    register: async (data,navigate) => {
        set({ isLoading: true });

        try {
            const res = await Instance.post("/auth/register", data);
            set({ authUser: res.data.user });
            navigate("/")
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Login User
    login: async (data,navigate) => {
        set({ isLoading: true, isError: false, errorMessage: "" });

        try {
            const res = await Instance.post("/auth/login", data);
            set({ authUser: res.data.user });
            toast.success(res.data.message)
            navigate("/dashboard")
            // localStorage.setItem("authUser", JSON.stringify(res.data.user));
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Logout User
    logout: async (navigate) => {
        set({ isLoading: true });

        try {
            const res= await Instance.post("/auth/logout");
            set({ authUser: null });
            // localStorage.removeItem("authUser");
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Check if user is authenticated
    checkAuthUser: async () => {
        set({ isLoading: true });

        try {
            const res = await Instance.get("/auth/check-user");
            set({ authUser: res.data.user });
        } catch (error) {
            set({ authUser: null });
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useAuthStore;

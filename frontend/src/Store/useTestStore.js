import { create } from "zustand";
import Instance from "../api/Instance"; 
import toast from "react-hot-toast";

const useTestStore = create((set, get) => ({
    test: [], // Persist user session
    singleTest: {},
    isLoading: false,
    isError: false,

    // Register User
    generate: async (data) => {
        set({ isLoading: true });

        try {
            const res = await Instance.post("/test/create", data);
            toast.success(res.data.message)
            get().show();
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Login User
    show: async () => {
        set({ isLoading: true, isError: false, errorMessage: "" });

        try {
            const res = await Instance.get("/test/all");
            set({ test: res.data.tests });
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    getById: async (id) => {
        set({ isLoading: true });
        try {
            const res = await Instance.get(`/test/${id}`);
            // console.log(res.data)
            // set({ test: res.data.test });
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });  
        }
    }

}));

export default useTestStore;

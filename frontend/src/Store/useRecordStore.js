import { create } from "zustand";
import Instance from "../api/Instance"; 
import toast from "react-hot-toast";
import { getRecordById } from "../../../backend/controller/recordController";

const useRecordStore = create((set, get) => ({
    record: [], // Persist user session
    singleTest: {},
    isLoading: false,
    isError: false,

    // Register User
    createRecrd: async (data) => {
        set({ isLoading: true });

        try {
            const res = await Instance.post("/record/create", data);
            toast.success(res.data.message)
            get().allRecord();
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    // Login User
    allRecord: async () => {
        set({ isLoading: true, isError: false, errorMessage: "" });

        try {
            const res = await Instance.get("/record/all");
            set({ record: res.data.records });
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });
        }
    },

    getRecordById: async (id) => {
        set({ isLoading: true });
        try {
            const res = await Instance.get(`/record/${id}`);
            console.log(res.data)
            // set({ test: res.data.test });
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false });  
        }
    }

}));

export default useRecordStore;

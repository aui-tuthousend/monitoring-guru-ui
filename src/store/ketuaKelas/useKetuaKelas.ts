import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { KetuaKelasStore } from "./types";

export const useKetuaKelasStore = create<KetuaKelasStore>((set, get) => ({
    list: [],
    unsignedList: [],
    default: { name: "", nisn: "", password: "" },
    model: { name: "", nisn: "", password: "" },
    loading: false,

    tableAttributes: [
        {accessorKey: "nisn",header: "NISN"},
        {accessorKey: "name",header: "Name"},
        
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterKetuaKelas: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ketua-kelas'), {
                method: 'POST',
                body: payload,
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.error('Error registering ketua kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetUnsignedKetuaKelas: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ketua-kelas/unsigned'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ unsignedList: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of ketua kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllKetuaKelas: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ketua-kelas'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of ketua kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

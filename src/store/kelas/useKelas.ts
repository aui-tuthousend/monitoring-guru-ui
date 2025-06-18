import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { KelasStore } from "./types";

export const useKelasStore = create<KelasStore>((set, get) => ({
    list: [],
    default: {
        name: "",
        ketua_kelas_id: "",
        jurusan_id: "",
        is_active: false,
    },
    model: {
        name: "",
        ketua_kelas_id: "",
        jurusan_id: "",
        is_active: false,
    },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "name",
            header: "Nama Kelas",
        },
        {
            accessorKey: "ketua_kelas.name",
            header: "Ketua Kelas",
        },
        {
            accessorKey: "jurusan.name",
            header: "Jurusan",
        },
        {
            accessorKey: "is_active",
            header: "Aktif?",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterKelas: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/kelas'), {
                method: payload.id ? 'PUT' : 'POST',
                body: payload,
            });

            console.log(response.data);
      
            return response
        } catch (error) {
            console.error('Error registering kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllKelas: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/kelas'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

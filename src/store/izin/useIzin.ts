import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { IzinStore } from "./types";

export const useIzinStore = create<IzinStore>((set, get) => ({
    loading: false,
    list: [],
    model: { id: "", judul: "", pesan: "", tanggal_izin: "", jam_izin: "", read: false, approval: false, type: "info" },
    default: { id: "", judul: "", pesan: "", tanggal_izin: "", jam_izin: "", read: false, approval: false, type: "info" },
    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },
    GetAllIzin: async (token) => {
        try {
            set({ loading: true });
            const response = await fetchServer(token, urlBuilder('/izin'), {
                method: 'GET',
            });

            const data = await response.data;
            // set({ list: data.data });

            return data.data;
        } catch (error) {
            console.error('Error getting list of users:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

}));

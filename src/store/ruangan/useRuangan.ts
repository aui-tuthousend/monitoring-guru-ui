import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { Ruangan, RuanganStore } from "./types";

export const useRuanganStore = create<RuanganStore>((set, get) => ({
    list: [],
    default: { name: "" },
    model: { name: "" },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "name",
            header: "Nama Ruangan",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterRuangan: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ruangan'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error registering ruangan:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllRuangan: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ruangan'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of ruangan:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

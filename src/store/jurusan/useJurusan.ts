import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { JurusanStore } from "./types";

export const useJurusanStore = create<JurusanStore>((set, get) => ({
    list: [],
    default: { name: "" },
    model: { name: "" },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "name",
            header: "Nama Jurusan",
        }
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterJurusan: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/jurusan'), {
                method: payload.id ? 'PUT' : 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error registering jurusan:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllJurusan: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/jurusan'), {
                method: 'GET',
            });

            const data = await response.data;
            set({list: data?.data! || []})

            return data?.data! || [];
        } catch (error) {
            console.error('Error getting list of jurusan:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

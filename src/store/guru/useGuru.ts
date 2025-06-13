import { create } from 'zustand';
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GuruStore } from "./types";

export const useGuruStore = create<GuruStore>((set, get) => ({
    list: [],
    default: { jabatan: "", nama: "", nip: "" },
    model: { jabatan: "", nama: "", nip: "" },
    loading: false,

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },
    RegisterGuru: async (payload) => {
        set({loading: true});
        try {
            const response = await fetchServer(urlBuilder('/guru'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data)

            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            return error;
        } finally {
            set({loading: false});
        }
    },
    GetListGuru: async () => {
        try {
            set({loading: true});
            const response = await fetchServer(urlBuilder('/guru'), {
                method: 'GET',
            });

            const data = await response.data.json();
            console.log(data)

            set({list: data})
            return data;
        } catch (error) {
            console.error('Error getting list of users:', error);
            return error;
        } finally {
            set({loading: false});
        }
    },
}));

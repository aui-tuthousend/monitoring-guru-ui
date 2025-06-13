import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { JadwalajarStore } from "./types";

export const useJadwalajarStore = create<JadwalajarStore>((set, get) => ({
    list: [],
    default: { guru: "", hari: "", jam_mulai: "", jam_selesai: "", kelas: "", mapel: "" },
    model: { guru: "", hari: "", jam_mulai: "", jam_selesai: "", kelas: "", mapel: "" },
    loading: false,
    
    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterJadwalajar: async (payload) => {
        set({loading: true});
        try {
            const response = await fetchServer(urlBuilder('/jadwalajar'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data)

            return data;
        } catch (error) {
            console.error('Error registering jadwalajar:', error);
            return error;
        } finally {
            set({loading: false});
        }
    },

    GetListJadwalajarGuru: async (params) => {
        try {
            set({loading: true});
            const response = await fetchServer(urlBuilder('/jadwalajar/guru', params), {
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

    GetListJadwalajarKelas: async (params) => {
        try {
            set({loading: true});
            const response = await fetchServer(urlBuilder('/jadwalajar/kelas', params), {
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

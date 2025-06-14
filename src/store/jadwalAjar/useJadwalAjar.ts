import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GetJadwalajarParams, Jadwalajar, JadwalajarStore } from "./types";

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

    RegisterJadwalajar: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/jadwalajar'), {
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
            set({ loading: false });
        }
    },

    GetListJadwalajarGuru: async (token, params: GetJadwalajarParams) => {
        try {
            set({ loading: true });

            const response = await fetchServer(token, urlBuilder('/jadwalajar/guru/'+params.uuid+'/'+params.hari), {
                method: 'GET',
            });

            const raw = await response.data;
            const data = raw.data;

            const list: Jadwalajar[] = data.map((item: any) => ({
                id: item.id,
                guru: item.guru.name, // Flattened to name
                mapel: item.mapel.name,
                kelas: item.kelas.name,
                hari: item.hari.charAt(0).toUpperCase() + item.hari.slice(1),
                jam_mulai: item.jam_mulai,
                jam_selesai: item.jam_selesai,
            }));

            set({ list });
            return data
        } catch (error) {
            console.error('Error getting jadwal guru:', error);
            set({ list: [] }); // fallback to empty list
        } finally {
            set({ loading: false });
        }
    },
    GetListJadwalajarKelas: async (token, params) => {
        try {
            set({ loading: true });
            const response = await fetchServer(token, urlBuilder('/jadwalajar/kelas', params), {
                method: 'GET',
            });

            const data = await response.data.json();
            console.log(data)
            set({ list: data })

            return data;
        } catch (error) {
            console.error('Error getting list of users:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },



}));

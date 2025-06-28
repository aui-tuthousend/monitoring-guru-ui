import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GetJadwalajarParams, JadwalajarStore } from "./types";

export const useJadwalajarStore = create<JadwalajarStore>((set, get) => ({
    list: [],
    default: { guru_id: "", hari: "", jam_mulai: "", jam_selesai: "", kelas_id: "", mapel_id: "", ruangan_id: "" },
    model: { guru_id: "", hari: "", jam_mulai: "", jam_selesai: "", kelas_id: "", mapel_id: "", ruangan_id: "" },
    loading: false,
    internalNav: "",

    setInternalNav(internalNav) {
        set({ internalNav });
    },
    tableAttributes: [
        {
            accessorKey: "guru.name",
            header: "Guru",
        },
        {
            accessorKey: "mapel.name",
            header: "Mapel",
        },
        {
            accessorKey: "kelas.name",
            header: "Kelas",
        },
        {
            accessorKey: "ruangan.name",
            header: "Ruangan",
        },
        {
            accessorKey: "hari",
            header: "Hari",
        },
        {
            accessorKey: "jam_mulai",
            header: "Jam Mulai",
        },
        {
            accessorKey: "jam_selesai",
            header: "Jam Selesai",
        },
    ],

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
                method: payload.id ? 'PUT' : 'POST',
                body: payload
            });

            const data = await response.data;
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error registering jadwalajar:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
    GetAllJadwalajar: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/jadwalajar'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of jadwalajar:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
    GetListJadwalajarGuru: async (token, params: GetJadwalajarParams) => {
        try {
            set({ loading: true });

            const response = await fetchServer(token, urlBuilder('/jadwalajar/guru', params), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data.data;
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

import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GetAbsenKeluarParams, AbsenKeluar, AbsenKeluarStore } from "./types";

export const useAbsenKeluarStore = create<AbsenKeluarStore>((set, get) => ({
    list: [],
    default: { absen_masuk_id: "", jam_keluar: "", status: "" },
    model: { absen_masuk_id: "", jam_keluar: "", status: "" },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "absen_masuk_id",
            header: "Absen Masuk ID",
        },
        {
            accessorKey: "jam_keluar",
            header: "Jam Keluar",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterAbsenKeluar: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/absen-keluar'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data)

            return data;
        } catch (error) {
            console.error('Error registering absen keluar:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllAbsenKeluar: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/absen-keluar'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data })

            return data;
        } catch (error) {
            console.error('Error getting list of absen keluar:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetListAbsenKeluarByMasuk: async (token, params: GetAbsenKeluarParams) => {
        try {
            set({ loading: true });

            const response = await fetchServer(token, urlBuilder('/absen-keluar/masuk/' + params.uuid), {
                method: 'GET',
            });

            const raw = await response.data;
            const data = raw.data;

            const list: AbsenKeluar[] = data.map((item: any) => ({
                id: item.id,
                absen_masuk_id: item.absen_masuk_id,
                jam_keluar: item.jam_keluar,
                status: item.status,
            }));

            set({ list });
            return data;
        } catch (error) {
            console.error('Error getting absen keluar by masuk:', error);
            set({ list: [] });
        } finally {
            set({ loading: false });
        }
    },

    GetListAbsenKeluarByTanggal: async (token, params) => {
        try {
            set({ loading: true });
            const response = await fetchServer(token, urlBuilder('/absen-keluar/tanggal', params), {
                method: 'GET',
            });

            const data = await response.data.json();
            console.log(data)
            set({ list: data })

            return data;
        } catch (error) {
            console.error('Error getting list of absen keluar by tanggal:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

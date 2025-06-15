import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GetAbsenMasukParams, AbsenMasuk, AbsenMasukStore } from "./types";

export const useAbsenMasukStore = create<AbsenMasukStore>((set, get) => ({
    list: [],
    default: {
        guru_id: "",
        jadwal_ajar_id: "",
        kelas_id: "",
        ruangan_id: "",
        tanggal: "",
        jam_masuk: "",
    },
    model: {
        guru_id: "",
        jadwal_ajar_id: "",
        kelas_id: "",
        ruangan_id: "",
        tanggal: "",
        jam_masuk: "",
    },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "guru_id",
            header: "Guru ID",
        },
        {
            accessorKey: "jadwal_ajar_id",
            header: "Jadwal Ajar ID",
        },
        {
            accessorKey: "kelas_id",
            header: "Kelas ID",
        },
        {
            accessorKey: "ruangan_id",
            header: "Ruangan ID",
        },
        {
            accessorKey: "tanggal",
            header: "Tanggal",
        },
        {
            accessorKey: "jam_masuk",
            header: "Jam Masuk",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterAbsenMasuk: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/absen-masuk'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error registering absen masuk:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllAbsenMasuk: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/absen-masuk'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of absen masuk:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetListAbsenMasukByGuru: async (token, params: GetAbsenMasukParams) => {
        try {
            set({ loading: true });

            const response = await fetchServer(token, urlBuilder(`/absen-masuk/guru/${params.uuid}`), {
                method: 'GET',
            });

            const raw = await response.data;
            const data = raw.data;

            const list: AbsenMasuk[] = data.map((item: any) => ({
                id: item.id,
                guru_id: item.guru_id,
                jadwal_ajar_id: item.jadwal_ajar_id,
                kelas_id: item.kelas_id,
                ruangan_id: item.ruangan_id,
                tanggal: item.tanggal,
                jam_masuk: item.jam_masuk,
            }));

            set({ list });
            return data;
        } catch (error) {
            console.error('Error getting absen masuk by guru:', error);
            set({ list: [] });
        } finally {
            set({ loading: false });
        }
    },

    GetListAbsenMasukByTanggal: async (token, params: GetAbsenMasukParams) => {
        try {
            set({ loading: true });
            const response = await fetchServer(token, urlBuilder('/absen-masuk/tanggal', params), {
                method: 'GET',
            });

            const data = await response.data.json();
            console.log(data);
            set({ list: data });

            return data;
        } catch (error) {
            console.error('Error getting list of absen masuk by tanggal:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

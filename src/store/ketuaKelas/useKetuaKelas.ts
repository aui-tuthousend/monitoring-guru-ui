import { create } from "zustand";
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { KetuaKelas, KetuaKelasStore } from "./types";

export const useKetuaKelasStore = create<KetuaKelasStore>((set, get) => ({
    list: [],
    default: { nama: "", nis: "", password: "" },
    model: { nama: "", nis: "", password: "" },
    loading: false,

    tableAttributes: [
        {
            accessorKey: "nama",
            header: "Nama",
        },
        {
            accessorKey: "nis",
            header: "NISN",
        },
        {
            accessorKey: "password",
            header: "Password",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },

    RegisterKetuaKelas: async (token, payload) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ketuakelas'), {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.data.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error('Error registering ketua kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },

    GetAllKetuaKelas: async (token) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/ketuakelas'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ list: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of ketua kelas:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    },
}));

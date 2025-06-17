import { create } from 'zustand';
import { fetchServer } from '@/lib/fetchServer';
import { urlBuilder } from "@/lib/utils";
import type { GuruStore } from "./types";

export const useGuruStore = create<GuruStore>((set, get) => ({
    list: [],
    default: { jabatan: "", name: "", nip: "" },
    model: { jabatan: "", name: "", nip: "" },
    loading: false,
    tableAttributes: [
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "name",
            header: "Nama Guru",
        },
        {
            accessorKey: "jabatan",
            header: "Jabatan",
        },
    ],

    setModel(model) {
        const currentModel = get().model;
        const newModel = model || get().default;
        if (JSON.stringify(currentModel) !== JSON.stringify(newModel)) {
            set({ model: newModel });
        }
    },
    RegisterGuru: async (token, payload) => {
        set({ loading: true });
        try {
          const response = await fetchServer(token, urlBuilder('/guru'), {
            method: 'POST',
            body: payload,
          });
      
        //   console.log(response.data);
      
          return response.data;
        } catch (error) {
          console.error('Error registering user:', error);
          return error;
        } finally {
          set({ loading: false });
        }
    },
    GetListGuru: async (token) => {
        try {
            set({loading: true});
            const response = await fetchServer(token, urlBuilder('/guru'), {
                method: 'GET',
            });

            const data = await response.data;
            // console.log(data)

            set({list: data.data})
            return data;
        } catch (error) {
            console.error('Error getting list of users:', error);
            return error;
        } finally {
            set({loading: false});
        }
    },
}));

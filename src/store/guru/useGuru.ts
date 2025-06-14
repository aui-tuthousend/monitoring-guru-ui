import { create } from 'zustand';
import { fetchServer } from "@/lib/fetchServer";
import { urlBuilder } from "@/lib/utils";
import type { GuruStore } from "./types";

export const useGuruStore = create<GuruStore>((set, get) => ({
    list: [
        {
            id: "1",
            jabatan: "Guru",
            name: "Steve Kerr",
            nip: "07626",
        },
        {
            id: "2",
            jabatan: "Kepala Lab",
            name: "W. Chan Kim",
            nip: "07627",
        },
    ],
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
            header: "Name",
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

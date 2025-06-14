import type { DataTableAttributes } from "@/components/data-table/columns";

interface Guru {
    id?: string;
    jabatan: string;
    name: string;
    nip: string;
    password?: string;
}

export interface GuruStore {
    list: Guru[];
    default: Guru;
    model: Guru;
    loading: boolean;
    tableAttributes: DataTableAttributes[];
    setModel: (model?: Guru) => void;
    RegisterGuru: (token: string, payload: Guru) => Promise<void>;
    GetListGuru: (token: string) => Promise<void>;
}
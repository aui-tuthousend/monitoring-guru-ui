import type { DataTableAttributes } from "@/components/data-table/columns";

interface Guru {
    id?: string;
    jabatan: string;
    name: string;
    nip: string;
    password?: string;
}

export interface GuruStore {
    list: any[];
    default: Guru;
    model: Guru;
    loading: boolean;
    tableAttributes: DataTableAttributes[];
    setModel: (model?: Guru) => void;
    RegisterGuru: (token: string, payload: Guru) => Promise<any>;
    GetListGuru: (token: string) => Promise<any>;
    // GetProfileGuru: (token: string) => Promise<any>;
}
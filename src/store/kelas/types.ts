import type { DataTableAttributes } from "@/components/data-table/columns";

export interface Kelas {
    id?: string;
    name: string;
    ketua_kelas: string;
    jurusan: string;
    // is_active: boolean;
}

export interface KelasStore {
    list: any[];
    tableAttributes: DataTableAttributes[];
    default: Kelas;
    model: Kelas;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterKelas: (token: string, payload: Kelas) => Promise<void>;
    GetAllKelas: (token: string) => Promise<void>;
}

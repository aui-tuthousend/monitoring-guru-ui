import type { DataTableAttributes } from "@/components/data-table/columns";

export interface KetuaKelas {
    id?: string;
    nama: string;
    nis: string;
    password: string;
}

export interface KetuaKelasStore {
    list: KetuaKelas[];
    tableAttributes: DataTableAttributes[];
    default: KetuaKelas;
    model: KetuaKelas;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterKetuaKelas: (token: string, payload: KetuaKelas) => Promise<void>;
    GetAllKetuaKelas: (token: string) => Promise<void>;
}

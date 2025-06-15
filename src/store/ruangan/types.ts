import type { DataTableAttributes } from "@/components/data-table/columns";

export interface Ruangan {
    id?: string;
    name: string;
}

export interface RuanganStore {
    list: Ruangan[];
    tableAttributes: DataTableAttributes[];
    default: Ruangan;
    model: Ruangan;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterRuangan: (token: string, payload: Ruangan) => Promise<void>;
    GetAllRuangan: (token: string) => Promise<void>;
}

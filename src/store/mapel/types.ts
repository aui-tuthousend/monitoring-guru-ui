import type { DataTableAttributes } from "@/components/data-table/columns";

export interface Mapel {
    id?: string;
    jurusan_id: string;
    name: string;
}

export interface MapelStore {
    list: Mapel[];
    tableAttributes: DataTableAttributes[];
    default: Mapel;
    model: Mapel;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterMapel: (token: string, payload: Mapel) => Promise<void>;
    GetAllMapel: (token: string) => Promise<void>;
}

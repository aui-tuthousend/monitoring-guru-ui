import type { DataTableAttributes } from "@/components/data-table/columns";

export interface Jurusan {
    id?: string,
    name: string
    kode_jurusan: string
}

export interface JurusanStore {
    list: Jurusan[];
    tableAttributes: DataTableAttributes[];
    default: Jurusan;
    model: Jurusan;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterJurusan: (token: string, payload: Jurusan) => Promise<any>;
    GetAllJurusan: (token: string) => Promise<any>;
}

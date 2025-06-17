import type { DataTableAttributes } from "@/components/data-table/columns";

export interface KetuaKelas {
    id?: string;
    name: string;
    nisn: string;
    password: string;
    kelas_id?: string;
}

export interface KetuaKelasStore {
    list: any[];
    unsignedList: any[];
    tableAttributes: DataTableAttributes[];
    default: KetuaKelas;
    model: KetuaKelas;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterKetuaKelas: (token: string, payload: KetuaKelas) => Promise<void>;
    GetAllKetuaKelas: (token: string) => Promise<void>;
    GetUnsignedKetuaKelas: (token: string) => Promise<void>;
}

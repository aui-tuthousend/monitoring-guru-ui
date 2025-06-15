import type { DataTableAttributes } from "@/components/data-table/columns";
import type { KetuaKelas } from "../ketuaKelas/types";
import type { Jurusan } from "../jurusan/types";

export interface Kelas {
    id?: string;
    name: string;
    ketua_id: string;
    jurusan_id?: string;
    is_active: boolean;
    ketua?: KetuaKelas;
    jurusan?: Jurusan;
}

export interface KelasStore {
    list: Kelas[];
    tableAttributes: DataTableAttributes[];
    default: Kelas;
    model: Kelas;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterKelas: (token: string, payload: Kelas) => Promise<void>;
    GetAllKelas: (token: string) => Promise<void>;
}

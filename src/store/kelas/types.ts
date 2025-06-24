import type { DataTableAttributes } from "@/components/data-table/columns";


interface Class {
    id: string;
    name: string;
    grade: string;
    jurusan: string;
};

export interface StatusKelas {
    id: string;
    kelas: Class;
    is_active: boolean;
    mapel: string;
    pengajar: string;
    ruangan: string;
};


export interface Kelas {
    id?: string;
    name: string;
    ketua_kelas_id: string;
    jurusan_id: string;
    // is_active: boolean;
}

export interface KelasStore {
    list: any[];
    classStatus: StatusKelas[];
    tableAttributes: DataTableAttributes[];
    default: Kelas;
    model: Kelas;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterKelas: (token: string, payload: Kelas) => Promise<any>;
    GetAllKelas: (token: string) => Promise<void>;
    GetAllClassStatus: (token: string) => Promise<any>;
}

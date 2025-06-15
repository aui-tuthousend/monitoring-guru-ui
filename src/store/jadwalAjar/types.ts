import type { DataTableAttributes } from "@/components/data-table/columns";

export interface Jadwalajar {
    id?: string,
    guru: string,
    hari: string,
    jam_mulai: string,
    jam_selesai: string,
    kelas: string,
    mapel: string
}

export interface GetJadwalajarParams {
    uuid: string,
    hari?: string
}

export interface JadwalajarStore {
    list: Jadwalajar[];
    tableAttributes: DataTableAttributes[];
    default: Jadwalajar;
    model: Jadwalajar;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterJadwalajar: (token: string, payload: Jadwalajar) => Promise<void>;
    GetAllJadwalajar: (token: string) => Promise<void>;
    GetListJadwalajarGuru: (token: string, params: GetJadwalajarParams) => Promise<void>;
    GetListJadwalajarKelas: (token: string, params: GetJadwalajarParams) => Promise<void>;
}
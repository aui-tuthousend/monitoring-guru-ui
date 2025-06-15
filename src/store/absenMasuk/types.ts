import type { DataTableAttributes } from "@/components/data-table/columns";

export interface AbsenMasuk {
    id?: string,
    guru_id: string,
    jadwal_ajar_id?: string,
    kelas_id?: string,
    ruangan_id?: string,
    tanggal: string,
    jam_masuk: string,
}

export interface GetAbsenMasukParams {
    uuid: string,
    tanggal?: string
}

export interface AbsenMasukStore {
    list: AbsenMasuk[];
    tableAttributes: DataTableAttributes[];
    default: AbsenMasuk;
    model: AbsenMasuk;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterAbsenMasuk: (token: string, payload: AbsenMasuk) => Promise<void>;
    GetAllAbsenMasuk: (token: string) => Promise<void>;
    GetListAbsenMasukByGuru: (token: string, params: GetAbsenMasukParams) => Promise<void>;
    GetListAbsenMasukByTanggal: (token: string, params: GetAbsenMasukParams) => Promise<void>;
}

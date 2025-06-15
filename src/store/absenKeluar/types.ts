import type { DataTableAttributes } from "@/components/data-table/columns";

export interface AbsenKeluar {
    id?: string,
    absen_masuk_id: string,
    jam_keluar: string,
    status: string,
}

export interface GetAbsenKeluarParams {
    uuid: string,
    hari?: string
}

export interface AbsenKeluarStore {
    list: AbsenKeluar[];
    tableAttributes: DataTableAttributes[];
    default: AbsenKeluar;
    model: AbsenKeluar;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterAbsenKeluar: (token: string, payload: AbsenKeluar) => Promise<void>;
    GetAllAbsenKeluar: (token: string) => Promise<void>;
    GetListAbsenKeluarByMasuk: (token: string, params: GetAbsenKeluarParams) => Promise<void>;
    GetListAbsenKeluarByTanggal: (token: string, params: GetAbsenKeluarParams) => Promise<void>;
}

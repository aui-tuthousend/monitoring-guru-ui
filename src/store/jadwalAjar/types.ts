interface Jadwalajar {
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
    default: Jadwalajar;
    model: Jadwalajar;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterJadwalajar: (payload: Jadwalajar) => Promise<void>;
    GetListJadwalajarGuru: (params: GetJadwalajarParams) => Promise<void>;
    GetListJadwalajarKelas: (params: GetJadwalajarParams) => Promise<void>;
}
export interface Izin {
    id?: string
    jadwalajar_id?: string
    judul: string
    pesan: string
    guru: string
    mapel: string
    jam_mulai: string
    jam_selesai: string
    tanggal_izin: string
    jam_izin: string
    read: boolean
    approval: boolean
}

interface IzinForm {
    judul: string
    pesan: string
}

export interface IzinStore {
    loading: boolean;
    list: Izin[];
    model: IzinForm;
    default: IzinForm;
    setModel: (model?: any) => void;
    // SubmitIzin: (token: string, payload: Izin) => Promise<void>;
    GetAllIzin: (token: string) => Promise<Izin[]>;
    GetAllIzinKelas: (token: string, kelas_id: string) => Promise<Izin[]>;
    GetAllIzinGuru: (token: string, nip: string) => Promise<Izin[]>;
}

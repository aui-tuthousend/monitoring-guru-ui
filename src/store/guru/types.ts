interface Guru {
    id?: string;
    jabatan: string;
    nama: string;
    nip: string;
}

export interface GuruStore {
    list: any[];
    default: Guru;
    model: Guru;
    loading: boolean;
    setModel: (model?: any) => void;
    RegisterGuru: (payload: Guru) => Promise<void>;
    GetListGuru: () => Promise<void>;
}
export interface AbsenMasuk {
  id?: string
  guru_id: string
  jadwal_ajar_id?: string
  kelas_id?: string
  ruangan_id?: string
  tanggal: string
  jam_masuk: string
}

export interface GetAbsenParams {
  uuid: string
  tanggal?: string
}

export interface AbsenMasukStore {
  list: AbsenMasuk[]
  default: AbsenMasuk
  model: AbsenMasuk
  loading: boolean

  setModel: (model?: Partial<AbsenMasuk>) => void
  resetModel: () => void

  RegisterAbsenMasuk: (payload: AbsenMasuk) => Promise<AbsenMasuk>
  GetListAbsenByGuru: (params: GetAbsenParams) => Promise<AbsenMasuk[]>
  GetListAbsenByKelas: (params: GetAbsenParams) => Promise<AbsenMasuk[]>
  GetListAbsenByRuangan: (params: GetAbsenParams) => Promise<AbsenMasuk[]>
  DeleteAbsenMasuk: (id: string) => Promise<void>
}

export interface AbsenKeluar {
  id?: string
  absen_masuk_id: string
  jam_keluar: string
  status?: string
}

export interface GetAbsenKeluarParams {
  absen_masuk_id: string
}

export interface AbsenKeluarStore {
  list: AbsenKeluar[]
  default: AbsenKeluar
  model: AbsenKeluar
  loading: boolean

  setModel: (model?: Partial<AbsenKeluar>) => void
  resetModel: () => void

  RegisterAbsenKeluar: (payload: AbsenKeluar) => Promise<AbsenKeluar>
  GetListAbsenKeluarByMasuk: (params: GetAbsenKeluarParams) => Promise<AbsenKeluar[]>
  DeleteAbsenKeluar: (id: string) => Promise<void>
}

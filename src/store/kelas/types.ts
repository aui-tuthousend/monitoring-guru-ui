export interface Kelas {
  id?: string
  ketua_id: string
  jurusan_id?: string
  name: string
  is_active: boolean
}

export interface GetKelasByParams {
  uuid: string
  hari?: string
}

export interface KelasStore {
  list: Kelas[]
  default: Kelas
  model: Kelas
  loading: boolean

  setModel: (model?: Partial<Kelas>) => void
  resetModel: () => void

  RegisterKelas: (payload: Kelas) => Promise<Kelas>
  GetListKelas: () => Promise<Kelas[]>
  UpdateKelas: (payload: Kelas) => Promise<Kelas>
  GetKelasByJurusan: (jurusanId: string) => Promise<Kelas[]>
  GetKelasByKetua: (ketuaId: string) => Promise<Kelas[]>
  GetKelasById: (id: string) => Promise<Kelas>
  DeleteKelas: (id: string) => Promise<void>
}

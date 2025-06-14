export interface Jurusan {
  id?: string
  name: string
}

export interface JurusanStore {
  list: Jurusan[]
  default: Jurusan
  model: Jurusan
  loading: boolean

  setModel: (model?: Partial<Jurusan>) => void
  resetModel: () => void

  GetListJurusan: () => Promise<Jurusan[]>
  RegisterJurusan: (payload: Jurusan) => Promise<Jurusan>
  UpdateJurusan: (payload: Jurusan) => Promise<Jurusan>
  GetJurusanById: (id: string) => Promise<Jurusan>
  DeleteJurusan: (id: string) => Promise<void>
}

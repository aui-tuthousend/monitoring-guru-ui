export interface Mapel {
  id?: string
  jurusan_id: string
  name: string
}

export interface MapelStore {
  list: Mapel[]
  default: Mapel
  model: Mapel
  loading: boolean

  setModel: (model?: Partial<Mapel>) => void
  resetModel: () => void

  GetListMapel: () => Promise<Mapel[]>
  RegisterMapel: (payload: Mapel) => Promise<Mapel>
  UpdateMapel: (payload: Mapel) => Promise<Mapel>
  GetMapelById: (id: string) => Promise<Mapel>
  DeleteMapel: (id: string) => Promise<void>
}

export interface Ruangan {
  id?: string
  name: string
}

export interface RuanganStore {
  list: Ruangan[]
  default: Ruangan
  model: Ruangan
  loading: boolean

  setModel: (model?: Partial<Ruangan>) => void
  resetModel: () => void

  GetListRuangan: () => Promise<Ruangan[]>
  RegisterRuangan: (payload: Ruangan) => Promise<Ruangan>
  UpdateRuangan: (payload: Ruangan) => Promise<Ruangan>
  GetRuanganById: (id: string) => Promise<Ruangan>
  DeleteRuangan: (id: string) => Promise<void>
}

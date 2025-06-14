export interface KetuaKelas {
  id?: string
  nama: string
  nisn: string
  password?: string
}

export interface KetuaKelasStore {
  list: KetuaKelas[]
  default: KetuaKelas
  model: KetuaKelas
  loading: boolean

  setModel: (model?: Partial<KetuaKelas>) => void
  resetModel: () => void

  RegisterKetuaKelas: (payload: KetuaKelas) => Promise<any>
  GetListKetuaKelas: () => Promise<any>
  GetProfileKetuaKelas: () => Promise<any>
  UpdateKetuaKelas: (payload: KetuaKelas) => Promise<any>
  DeleteKetuaKelas: (id: string) => Promise<any>
}
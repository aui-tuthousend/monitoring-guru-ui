export interface LoginRequest {
  nip: string
  password: string
}

export interface UserData {
  id: string
  nip: string
  name: string
  jabatan: string
}

export interface AuthStore {
  token: string | null
  userData: UserData | null
  loading: boolean
  setLoading: (loading: boolean) => void
  login: (payload: LoginRequest) => Promise<UserData>
  logout: () => void
}
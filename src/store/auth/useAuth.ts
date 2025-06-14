// src/store/auth/useAuthStore.ts

import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import { Cookies } from 'react-cookie'
import type { AuthStore, LoginRequest, UserData } from './types'

const cookies = new Cookies()

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  userData: null,
  loading: false,

  setLoading: (loading) => set({ loading }),

  login: async (payload) => {
    set({ loading: true })
    try {
      // panggil API login
      const data = await fetchServer('/auth/login-guru', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const { token, user_data } = data
      if (!token || !user_data) {
        throw new Error('Login gagal: respons tidak lengkap')
      }

      // simpan ke cookie
      cookies.set('authToken', token, { path: '/' })
      cookies.set('userData', JSON.stringify(user_data), { path: '/' })

      // update store
      set({
        token,
        userData: user_data as UserData,
      })

      return user_data as UserData
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    cookies.remove('authToken', { path: '/' })
    cookies.remove('userData', { path: '/' })
    set({
      token: null,
      userData: null,
    })
  },
}))

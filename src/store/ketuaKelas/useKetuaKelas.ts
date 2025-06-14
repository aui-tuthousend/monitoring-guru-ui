import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { KetuaKelasStore, KetuaKelas } from './types'

export const useKetuaKelasStore = create<KetuaKelasStore>((set, get) => ({
  list: [],
  default: { nama: '', nisn: '', password: '' },
  model: { nama: '', nisn: '', password: '' },
  loading: false,

  setModel(model) {
    const newModel = { ...get().default, ...model }
    if (JSON.stringify(get().model) !== JSON.stringify(newModel)) {
      set({ model: newModel })
    }
  },

  resetModel() {
    set({ model: get().default })
  },

  RegisterKetuaKelas: async (payload) => {
    set({ loading: true })
    try {
      const response = await fetchServer(urlBuilder('/ketua-kelas'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER KETUA KELAS]', response)
      return response
    } catch (err) {
      console.error('[ERROR REGISTER KETUA KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListKetuaKelas: async () => {
    set({ loading: true })
    try {
      const response = await fetchServer(urlBuilder('/ketua-kelas'), {
        method: 'GET',
      })
      console.log('[GET LIST KETUA KELAS]', response)
      set({ list: response })
      return response
    } catch (err) {
      console.error('[ERROR GET LIST KETUA KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetProfileKetuaKelas: async () => {
    set({ loading: true })
    try {
      const response = await fetchServer(urlBuilder('/ketua-kelas/profile'), {
        method: 'GET',
      })
      console.log('[GET PROFILE KETUA KELAS]', response)
      set({ model: response })
      return response
    } catch (err) {
      console.error('[ERROR GET PROFILE KETUA KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  UpdateKetuaKelas: async (payload) => {
    set({ loading: true })
    try {
      const response = await fetchServer(urlBuilder('/ketua-kelas'), {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log('[UPDATE KETUA KELAS]', response)
      return response
    } catch (err) {
      console.error('[ERROR UPDATE KETUA KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteKetuaKelas: async (id) => {
    set({ loading: true })
    try {
      const response = await fetchServer(urlBuilder(`/ketua-kelas/${id}`), {
        method: 'DELETE',
      })
      console.log('[DELETE KETUA KELAS]', response)
      return response
    } catch (err) {
      console.error('[ERROR DELETE KETUA KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

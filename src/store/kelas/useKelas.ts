import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { KelasStore, Kelas } from './types'

export const useKelasStore = create<KelasStore>((set, get) => ({
  list: [],
  default: { ketua_id: '', jurusan_id: undefined, name: '', is_active: false },
  model: { ketua_id: '', jurusan_id: undefined, name: '', is_active: false },
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

  RegisterKelas: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/kelas'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER KELAS]', data)
      return data as Kelas
    } catch (err) {
      console.error('[REGISTER KELAS ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListKelas: async () => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/kelas'), {
        method: 'GET',
      })
      console.log('[GET LIST KELAS]', data)
      set({ list: data as Kelas[] })
      return data as Kelas[]
    } catch (err) {
      console.error('[GET LIST KELAS ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  UpdateKelas: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/kelas'), {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log('[UPDATE KELAS]', data)
      return data as Kelas
    } catch (err) {
      console.error('[UPDATE KELAS ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetKelasByJurusan: async (jurusanId) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder(`/kelas/jurusan/${jurusanId}`), {
        method: 'GET',
      })
      console.log('[GET KELAS BY JURUSAN]', data)
      set({ list: data as Kelas[] })
      return data as Kelas[]
    } catch (err) {
      console.error('[GET KELAS BY JURUSAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetKelasByKetua: async (ketuaId) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/kelas/ketua', { id: ketuaId }), {
        method: 'GET',
      })
      console.log('[GET KELAS BY KETUA]', data)
      set({ list: data as Kelas[] })
      return data as Kelas[]
    } catch (err) {
      console.error('[GET KELAS BY KETUA ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetKelasById: async (id) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder(`/kelas/${id}`), {
        method: 'GET',
      })
      console.log('[GET KELAS BY ID]', data)
      set({ model: data as Kelas })
      return data as Kelas
    } catch (err) {
      console.error('[GET KELAS BY ID ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteKelas: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/kelas/${id}`), {
        method: 'DELETE',
      })
      console.log('[DELETE KELAS]', id)
    } catch (err) {
      console.error('[DELETE KELAS ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

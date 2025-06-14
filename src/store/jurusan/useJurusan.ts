import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { JurusanStore, Jurusan } from './types'

export const useJurusanStore = create<JurusanStore>((set, get) => ({
  list: [],
  default: { name: '' },
  model: { name: '' },
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

  GetListJurusan: async () => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/jurusan'), {
        method: 'GET',
      })
      // asumsikan data adalah array Jurusan
      set({ list: data })
      return data
    } catch (err) {
      console.error('[GET LIST JURUSAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  RegisterJurusan: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/jurusan'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER JURUSAN]', data)
      return data as Jurusan
    } catch (err) {
      console.error('[REGISTER JURUSAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  UpdateJurusan: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/jurusan'), {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log('[UPDATE JURUSAN]', data)
      return data as Jurusan
    } catch (err) {
      console.error('[UPDATE JURUSAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetJurusanById: async (id) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder(`/jurusan/${id}`), {
        method: 'GET',
      })
      console.log('[GET JURUSAN BY ID]', data)
      return data as Jurusan
    } catch (err) {
      console.error('[GET JURUSAN BY ID ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteJurusan: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/jurusan/${id}`), {
        method: 'DELETE',
      })
      console.log('[DELETE JURUSAN]', id)
    } catch (err) {
      console.error('[DELETE JURUSAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

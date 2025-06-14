import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { MapelStore, Mapel } from './types'

export const useMapelStore = create<MapelStore>((set, get) => ({
  list: [],
  default: { jurusan_id: '', name: '' },
  model: { jurusan_id: '', name: '' },
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

  GetListMapel: async () => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/mapel'), {
        method: 'GET',
      })
      console.log('[GET LIST MAPEL]', data)
      set({ list: data as Mapel[] })
      return data as Mapel[]
    } catch (err) {
      console.error('[GET LIST MAPEL ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  RegisterMapel: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/mapel'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER MAPEL]', data)
      return data as Mapel
    } catch (err) {
      console.error('[REGISTER MAPEL ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  UpdateMapel: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/mapel'), {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log('[UPDATE MAPEL]', data)
      return data as Mapel
    } catch (err) {
      console.error('[UPDATE MAPEL ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetMapelById: async (id) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder(`/mapel/${id}`), {
        method: 'GET',
      })
      console.log('[GET MAPEL BY ID]', data)
      set({ model: data as Mapel })
      return data as Mapel
    } catch (err) {
      console.error('[GET MAPEL BY ID ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteMapel: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/mapel/${id}`), {
        method: 'DELETE',
      })
      console.log('[DELETE MAPEL]', id)
    } catch (err) {
      console.error('[DELETE MAPEL ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

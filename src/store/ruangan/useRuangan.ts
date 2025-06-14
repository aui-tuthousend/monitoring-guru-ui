import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { RuanganStore, Ruangan } from './types'

export const useRuanganStore = create<RuanganStore>((set, get) => ({
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

  GetListRuangan: async () => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/ruangan'), {
        method: 'GET',
      })
      console.log('[GET LIST RUANGAN]', data)
      set({ list: data as Ruangan[] })
      return data as Ruangan[]
    } catch (err) {
      console.error('[GET LIST RUANGAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  RegisterRuangan: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/ruangan'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER RUANGAN]', data)
      return data as Ruangan
    } catch (err) {
      console.error('[REGISTER RUANGAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  UpdateRuangan: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/ruangan'), {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log('[UPDATE RUANGAN]', data)
      return data as Ruangan
    } catch (err) {
      console.error('[UPDATE RUANGAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetRuanganById: async (id) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder(`/ruangan/${id}`), {
        method: 'GET',
      })
      console.log('[GET RUANGAN BY ID]', data)
      set({ model: data as Ruangan })
      return data as Ruangan
    } catch (err) {
      console.error('[GET RUANGAN BY ID ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteRuangan: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/ruangan/${id}`), {
        method: 'DELETE',
      })
      console.log('[DELETE RUANGAN]', id)
    } catch (err) {
      console.error('[DELETE RUANGAN ERROR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

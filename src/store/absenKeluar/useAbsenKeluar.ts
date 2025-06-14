import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { AbsenKeluarStore, AbsenKeluar, GetAbsenKeluarParams } from './types'

export const useAbsenKeluarStore = create<AbsenKeluarStore>((set, get) => ({
  list: [],
  default: { absen_masuk_id: '', jam_keluar: '', status: '' },
  model: { absen_masuk_id: '', jam_keluar: '', status: '' },
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

  RegisterAbsenKeluar: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/absen-keluar'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER ABSEN KELUAR]', data)
      return data as AbsenKeluar
    } catch (err) {
      console.error('[ERROR REGISTER ABSEN KELUAR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListAbsenKeluarByMasuk: async ({ absen_masuk_id }) => {
    set({ loading: true })
    try {
      const url = urlBuilder(`/absen-keluar/masuk/${absen_masuk_id}`)
      const data = await fetchServer(url, { method: 'GET' })
      console.log('[GET ABSEN KELUAR BY MASUK]', data)
      set({ list: data as AbsenKeluar[] })
      return data as AbsenKeluar[]
    } catch (err) {
      console.error('[ERROR GET ABSEN KELUAR BY MASUK]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteAbsenKeluar: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/absen-keluar/${id}`), { method: 'DELETE' })
      console.log('[DELETE ABSEN KELUAR]', id)
    } catch (err) {
      console.error('[ERROR DELETE ABSEN KELUAR]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

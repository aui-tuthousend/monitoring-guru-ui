import { create } from 'zustand'
import { fetchServer } from '@/lib/fetchServer'
import { urlBuilder } from '@/lib/utils'
import type { AbsenMasukStore, AbsenMasuk, GetAbsenParams } from './types'

export const useAbsenMasukStore = create<AbsenMasukStore>((set, get) => ({
  list: [],
  default: {
    guru_id: '',
    jadwal_ajar_id: undefined,
    kelas_id: undefined,
    ruangan_id: undefined,
    tanggal: '',
    jam_masuk: '',
  },
  model: {
    guru_id: '',
    jadwal_ajar_id: undefined,
    kelas_id: undefined,
    ruangan_id: undefined,
    tanggal: '',
    jam_masuk: '',
  },
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

  RegisterAbsenMasuk: async (payload) => {
    set({ loading: true })
    try {
      const data = await fetchServer(urlBuilder('/absen-masuk'), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('[REGISTER ABSEN MASUK]', data)
      return data as AbsenMasuk
    } catch (err) {
      console.error('[ERROR REGISTER ABSEN MASUK]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListAbsenByGuru: async ({ uuid, tanggal }) => {
    set({ loading: true })
    try {
      const url = urlBuilder(`/absen-masuk/guru/${uuid}`, tanggal ? { tanggal } : undefined)
      const data = await fetchServer(url, { method: 'GET' })
      console.log('[GET ABSEN MASUK BY GURU]', data)
      set({ list: data as AbsenMasuk[] })
      return data as AbsenMasuk[]
    } catch (err) {
      console.error('[ERROR GET ABSEN BY GURU]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListAbsenByKelas: async ({ uuid, tanggal }) => {
    set({ loading: true })
    try {
      const url = urlBuilder(`/absen-masuk/kelas/${uuid}`, tanggal ? { tanggal } : undefined)
      const data = await fetchServer(url, { method: 'GET' })
      console.log('[GET ABSEN MASUK BY KELAS]', data)
      set({ list: data as AbsenMasuk[] })
      return data as AbsenMasuk[]
    } catch (err) {
      console.error('[ERROR GET ABSEN BY KELAS]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  GetListAbsenByRuangan: async ({ uuid, tanggal }) => {
    set({ loading: true })
    try {
      const url = urlBuilder(`/absen-masuk/ruangan/${uuid}`, tanggal ? { tanggal } : undefined)
      const data = await fetchServer(url, { method: 'GET' })
      console.log('[GET ABSEN MASUK BY RUANGAN]', data)
      set({ list: data as AbsenMasuk[] })
      return data as AbsenMasuk[]
    } catch (err) {
      console.error('[ERROR GET ABSEN BY RUANGAN]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  DeleteAbsenMasuk: async (id) => {
    set({ loading: true })
    try {
      await fetchServer(urlBuilder(`/absen-masuk/${id}`), { method: 'DELETE' })
      console.log('[DELETE ABSEN MASUK]', id)
    } catch (err) {
      console.error('[ERROR DELETE ABSEN MASUK]', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))

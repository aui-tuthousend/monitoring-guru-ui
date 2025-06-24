// useImportStore.ts
import { create } from 'zustand'
import { urlBuilder } from '@/lib/utils'
import type { ImportStore } from './types'

export const useImportStore = create<ImportStore>((set, get) => ({
  data: { file: null, endpoint: '' },
  loading: false,

  setData: (data) => set({ data }),

  upload: async () => {
    const { file, endpoint } = get().data
    if (!file || !endpoint) {
      console.warn('File or endpoint is missing.')
      return null
    }

    set({ loading: true })

    try {
      const formData = new FormData()
      formData.append('files', file)

      const response = await fetch(urlBuilder(`/import/${endpoint}`), {
        method: 'POST',
        body: formData,
      })

      return response.json()
    } catch (error) {
      console.error('Upload failed:', error)
      return null
    } finally {
      set({ loading: false })
    }
  },
}))

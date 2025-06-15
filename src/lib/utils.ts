import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface FetchParams {
  [key: string]: any
}


export const urlBuilder = (path: string, params?: FetchParams): string => {
  const urlPath = params
    ? `/${Object.values(params).map(encodeURIComponent).join("/")}`
    : ""

  return `${API_BASE_URL}${path}${urlPath}`
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
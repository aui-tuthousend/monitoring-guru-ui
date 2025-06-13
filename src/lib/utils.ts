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
  const url = new URL(`${API_BASE_URL}${path}`);

  if (params) {
    for (const key of Object.keys(params)) {
      url.searchParams.append(key, params[key]);
    }
  }

  // console.log(url.toString())
  return url.toString();
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
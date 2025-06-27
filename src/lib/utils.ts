import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import crypto from "crypto";
import SHA256 from "crypto-js/sha256"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

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

export function timeStringToDate(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

export function HashString(str: string): string {
  return SHA256(str + SECRET_KEY).toString()
}
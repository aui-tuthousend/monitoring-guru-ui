import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TimeInputProps {
  value?: string // Format "HH:MM" atau empty string
  onChange?: (value: string) => void
  className?: string
}

export default function TimeInput({ value = "", onChange, className = "" }: TimeInputProps) {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")

  // Parse value dari luar ke internal state
  useEffect(() => {
    if (value && value.includes(":")) {
      const [h, m] = value.split(":")
      setHours(h || "")
      setMinutes(m || "")
    } else if (value === "" || !value) {
      // Reset ketika value kosong dari luar
      setHours("")
      setMinutes("")
    }
  }, [value])

  // Update parent ketika internal state berubah
  const updateParent = (newHours: string, newMinutes: string) => {
    if (onChange) {
      const h = newHours.padStart(2, "0")
      const m = newMinutes.padStart(2, "0")
      onChange(`${h}:${m}`)
    }
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "")
    if (inputValue.length <= 2) {
      setHours(inputValue)
      // Update parent saat typing (optional, bisa dihilangkan jika hanya mau update saat blur)
      if (inputValue.length === 2 || inputValue === "") {
        updateParent(inputValue, minutes)
      }
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "")
    if (inputValue.length <= 2) {
      setMinutes(inputValue)
      // Update parent saat typing (optional, bisa dihilangkan jika hanya mau update saat blur)
      if (inputValue.length === 2 || inputValue === "") {
        updateParent(hours, inputValue)
      }
    }
  }

  const handleHoursBlur = () => {
    let finalHours = hours
    if (hours === "") {
      finalHours = "00"
    } else {
      const numHours = Math.min(23, Math.max(0, Number.parseInt(hours) || 0))
      finalHours = numHours.toString().padStart(2, "0")
    }
    setHours(finalHours)
    updateParent(finalHours, minutes)
  }

  const handleMinutesBlur = () => {
    let finalMinutes = minutes
    if (minutes === "") {
      finalMinutes = "00"
    } else {
      const numMinutes = Math.min(59, Math.max(0, Number.parseInt(minutes) || 0))
      finalMinutes = numMinutes.toString().padStart(2, "0")
    }
    setMinutes(finalMinutes)
    updateParent(hours, finalMinutes)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            onBlur={handleHoursBlur}
            placeholder="00"
            maxLength={2}
            className="text-center text-sm font-mono"
          />
        </div>
        <div className="text-lg font-bold">:</div>
        <div className="flex-1">
          <Input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            onBlur={handleMinutesBlur}
            placeholder="00"
            maxLength={2}
            className="text-center text-sm font-mono"
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import {
  Dialog,
} from "@/components/ui/dialog"

interface CustomDialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
}

export function CustomDialog({
  open,
  onClose,
  children,
}: CustomDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
    >
        {children}
    </Dialog>
  )
}

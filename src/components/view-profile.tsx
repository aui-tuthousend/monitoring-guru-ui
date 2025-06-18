"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type ViewProfileProps = {
  profile: {
    name: string
    nip: string
    jabatan: string
    avatarUrl?: string
  }
}

export function ViewProfile({ profile }: ViewProfileProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          Lihat Profil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Profil Pengguna</DialogTitle>
          <DialogDescription>Informasi detail akun Anda</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4 mt-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback>
              {profile.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.nip}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Nama</span>
            <span>{profile.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">NIP</span>
            <span>{profile.nip}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Jabatan</span>
            <span className="capitalize">{profile.jabatan}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

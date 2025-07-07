import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X } from "lucide-react"

import type { Izin } from "@/store/izin/types"

export default function NotifUser({data}: {data: Izin[]}) {
    
  const isRead = (izin: any) => {
    if (izin?.read) {
      return izin.approval ? (
        <Badge variant="default">
          <Check className="w-4 h-4 text-white" />
        </Badge>
      ) : (
        <Badge variant="destructive">
          <X className="w-4 h-4 text-white" />
        </Badge>
      );
    } else {
      return (
        <Badge>
          <p>.</p>
        </Badge>
      );
    }
  };
  
      
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="w-4 h-4" />
          {data?.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {data?.length > 99 ? "99+" : data?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="shadow-none border-0">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  Notifikasi Izin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {data?.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                data?.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50/50" : ""
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      {isRead(notification)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p
                                className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"
                                }`}
                                >
                                {notification.judul}
                              </p>
                              <Badge variant="outline">{notification.jam_izin}</Badge>
                              {/* <p
                                className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"
                                }`}
                                >
                                {notification.jam_izin}
                              </p> */}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.pesan}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.mapel} | {notification.jam_mulai} - {notification.jam_selesai}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/auth/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {

    const { logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setOpen(false)
        navigate({ to: '/login-guru' })
        toast.success('Logout berhasil')
    }
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="destructive" size="sm">
                    Log out
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="space-y-2">
                    <h4 className="font-medium text-lg">Konfirmasi Logout</h4>
                    <p className="text-sm text-muted-foreground">
                        Apakah kamu yakin ingin keluar?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                            Ya, Logout
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

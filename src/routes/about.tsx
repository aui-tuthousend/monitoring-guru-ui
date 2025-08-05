import { createFileRoute, Link} from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  const images = [
    "/dokumentasi1.webp",
    "/dokumentasi2.webp",
    "/dokumentasi3.webp",
    "/dokumentasi4.webp",
    "/dokumentasi5.webp",
  ]

  const containerRef = useRef<HTMLDivElement>(null) 
  const scroll = (offset: number) => {
    containerRef.current?.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Button
      asChild
      className="absolute top-4 left-4 z-30 items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      variant="default">
        <Link to="/">
        ← Kembali
        </Link>
      </Button>

      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
        <div className="md:w-1/2 space-y-4 text-center md:text-left max-h-[80vh] overflow-y-auto pr-2">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-tight">
            Monitoring Guru
          </h1>
          <p className="leading-relaxed">
            Website Monitoring Guru ini dikembangkan oleh mahasiswa KKN Prodi Teknik Informatika Institut Teknologi Adhi Tama Surabaya pada tahun 2025 sebagai bagian dari pengabdian kepada masyarakat di SMKN2 Surabaya. Website ini bertujuan untuk membantu sekolah dalam memonitor kehadiran guru secara digital dan real-time, sehingga mempermudah pengelolaan kehadiran dan ketertiban jadwal mengajar di sekolah.
          </p>
          <p className="leading-relaxed">
            Melalui sistem ini, guru akan melakukan scan QR Code secara berkala untuk memastikan keberadaan di kelas saat jam mengajar, sehingga proses monitoring dapat berjalan transparan dan akurat. Website ini dibangun menggunakan teknologi modern agar mudah digunakan oleh pihak sekolah maupun guru.
          </p>
          <p className="leading-relaxed">
            Kami berharap sistem monitoring ini dapat membantu SMKN2 Surabaya dalam meningkatkan kedisiplinan dan efisiensi monitoring guru, serta memberikan dampak positif bagi proses belajar mengajar di sekolah.
          </p>
          <p className="italic leading-relaxed">
            “Tertib Maksimal. Ribet Minimal.”
          </p>
        </div>

        <div className="md:w-1/2 w-full overflow-hidden relative flex flex-col gap-4">
          {/* {canScrollLeft && (
            <div className="absolute left-0 top-0 h-full w-12 -ml-4 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-10" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 h-full w-12 -mr-4 bg-gradient-to-l from-black/30 to-transparent pointer-events-none z-10" />
          )} */}

          <button
            onClick={() => scroll(-300)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/70"          >
            ←
          </button>
          <button
            onClick={() => scroll(300)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/70"          >
            →
          </button>

          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {images.map((src, index) => (
              <Card
                key={index}
                className="flex-shrink-0 snap-center overflow-hidden w-[80vw] md:w-[40vw] max-w-lg aspect-video p-0"
              >
                <CardContent className="relative w-full h-full p-0">
                  <img
                    src={src}
                    alt={`Dokumentasi KKN ${index + 1}`}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="col-span-2 flex items-center justify-center p-4">
            <p className="text-center text-sm text-muted-foreground">
              Dokumentasi kegiatan KKN mahasiswa bersama dosen pembimbing dan guru SMKN2 Surabaya.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

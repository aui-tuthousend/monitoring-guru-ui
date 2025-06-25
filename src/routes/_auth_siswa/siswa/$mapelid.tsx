import { createFileRoute } from '@tanstack/react-router'
import QRCode from "react-qr-code";
export const Route = createFileRoute('/_auth_siswa/siswa/$mapelid')({
  component: RouteComponent,

})

function RouteComponent() {

  const { mapelid } = Route.useParams()
  return (
    <div>
      Hello from {mapelid}
      <div style={{ height: "auto", margin: "0 auto", maxWidth: "20%", width: "20%" }}>
        <QRCode
          size={500}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={mapelid}
          viewBox={`0 0 500 500`}
        />
      </div>
    </div>
  )
}

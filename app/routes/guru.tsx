import GuruHomePage from "~/guru/home"
import type { Route } from "./+types/guru"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Home Guru" },
        { name: "Login User", content: "Please Login" },
    ]

}
export default function Guru() {
    return (
        <GuruHomePage></GuruHomePage>
    )
}
import GuruHomePage from "~/guru/layout"
import type { Route } from "../+types/guruHome"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Home Guru" },
        { name: "Login User", content: "Please Login" },
    ]

}
export default function GuruLayout() {
    return (
        <GuruHomePage></GuruHomePage>
    )
}
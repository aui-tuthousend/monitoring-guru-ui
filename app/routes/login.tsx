import LoginPage from "~/login/login";
import type { Route } from "./+types/login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "Login User", content: "Please Login" },
    ]

}
export default function Login() {
    return (
        <LoginPage></LoginPage>
    )
}
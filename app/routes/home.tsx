import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import NewWelcome from "~/welcome/newWelcome";
import { NavMenu } from "~/welcome/CustomNav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
    <NavMenu />
    <NewWelcome />;
    </>
  )
  // return <Button className="to-blue-400">Test</Button>;
}

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about","routes/about.tsx"),
    route("login","routes/login.tsx"),
    route("guru","routes/guru.tsx"),
] satisfies RouteConfig;

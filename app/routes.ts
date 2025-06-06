import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    layout("routes/admin/layout.tsx", [
        ...prefix("admin",[
            index("routes/admin/dashboard.tsx"),
        ]),
    ]),
    layout("routes/guru/layout.tsx", [
        ...prefix("guru", [
            index("routes/guru/home.tsx"),
            route("scan", "routes/guru/scan.tsx"),
        ])
    ]),
] satisfies RouteConfig;

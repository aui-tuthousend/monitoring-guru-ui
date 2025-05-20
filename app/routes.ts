import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    layout("routes/guruLayout.tsx", [
        ...prefix("guru", [
            route("home", "routes/guruHome.tsx"),
            route("scan", "routes/guruScan.tsx"),
        ])
    ]),
] satisfies RouteConfig;

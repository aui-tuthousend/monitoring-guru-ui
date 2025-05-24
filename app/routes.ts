import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    route("ukk","routes/ukk/ukkIndex.tsx"),
    layout("routes/guru/guruLayout.tsx", [
        ...prefix("guru", [
            index("routes/guru/guruHome.tsx"),
            route("scan", "routes/guru/guruScan.tsx"),
        ])
    ]),
] satisfies RouteConfig;

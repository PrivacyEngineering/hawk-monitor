import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";

import {
  HomeIcon,
  DocumentIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: <DocumentIcon />,
    component: Tables,
    layout: "/admin",
  },
];
export default dashRoutes;

import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";

const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/admin-dashboard",
  },
  {
    title: "Daftar Layanan",
    icon: <Inventory2Icon />,
    link: "/admin-daftar-layanan",
  },
  {
    title: "Daftar Pengguna",
    icon: <PeopleAltIcon />,
    link: "/admin-daftar-pengguna",
  },
  {
    title: "Statistik",
    icon: <BarChartIcon />,
    link: "/admin-statistik",
  },
];

export default SidebarData;

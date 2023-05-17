import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CampaignIcon from '@mui/icons-material/Campaign';

const SidebarData = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    link: '/admin-dashboard',
  },
  {
    title: 'Daftar Layanan',
    icon: <Inventory2Icon />,
    link: '/admin-daftar-layanan',
  },
  {
    title: 'Daftar Aduan',
    icon: <CampaignIcon />,
    link: '/admin-daftar-aduan',
  },
  {
    title: 'Daftar Pengguna',
    icon: <PeopleAltIcon />,
    link: '/admin-daftar-pengguna',
  },
  {
    title: 'Antrean Jemput',
    icon: <LocalShippingIcon />,
    link: '/admin-antrean-jemput',
  },
  {
    title: 'Statistik',
    icon: <BarChartIcon />,
    link: '/admin-statistik',
  },
];

export default SidebarData;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Campaign from '@/views/Campaign.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import About from '@/views/About.vue';
import CampaignCategory from '@/views/CampaignCategory.vue';
import Profile from '@/views/Profile.vue';
import Admin from '@/views/Admin.vue';
import AdminManageCategory from '@/views/AdminManageCategory.vue';
import AdminManageCampaign from '@/views/AdminManageCampaign.vue';
import AdminViewDonation from '@/views/AdminViewDonation.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/campaign/:campaignId',
    name: 'Campaign',
    component: Campaign,
    props: true
  },
  {
    path: '/campaigns',
    name: 'CampaignCategory',
    component: CampaignCategory,
    props: true
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { isAdmin: true }
  },
  {
    path: '/admin/manage-category',
    name: 'AdminManageCategory',
    component: AdminManageCategory,
    meta: { isAdmin: true }
  },
  {
    path: '/admin/manage-campaign',
    name: 'AdminManageCampaign',
    component: AdminManageCampaign,
    meta: { isAdmin: true }
  },
  {
    path: '/admin/view-donations',
    name: 'AdminViewDonation',
    component: AdminViewDonation,
    meta: { isAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.meta.isAdmin && !isAdmin()) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

function isAdmin() {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    const role = localStorage.getItem('role');
    return role === 'admin';
  } catch (error) {
    return false;
  }
}

export default router;

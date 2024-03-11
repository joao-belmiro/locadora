
// src/router/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login  
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Layout.vue'),
    children: [
      {
        path: '/location',
        name: 'location-list',
        component: () => import('../views/Location.vue')
      },
      {
        path: '/new-location',
        name: 'new-location',
        component: () => import('../views/FormLocation.vue')
      }, 
      {
        path: '/edit-location/:id',
        name: 'edit-location',
        component: () => import('../views/FormLocation.vue')
      }, 
      {
        path: '/clients',
        name: 'clients-list',
        component: () => import('../views/Client.vue')
      },
      {
        path: '/new-client',
        name: 'new-client',
        component: () => import('../views/FormClient.vue')
      },
      {
        path: '/edit-client/:id',
        name: 'edit-client',
        component: () => import('../views/FormClient.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
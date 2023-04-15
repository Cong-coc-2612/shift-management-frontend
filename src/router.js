import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: "/shifts",
      alias: "/shifts",
      name: "shifts",
      component: () => import("./views/ShiftList.vue")
    },
    {
      path: "/shifts/:id",
      name: "shift-details",
      component: () => import("./views/Shift.vue")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./views/AddShift.vue")
    },
    {
      path: "/employees",
      alias: "/employees",
      name: "employees",
      component: () => import("./views/EmployeeList.vue")
    },
    {
      path: "/shift",
      name: "shift",
      component: () => import("./views/ShiftForEmployee.vue")
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("./views/OrderList.vue")
    },   
    {
      path: "/add-order",
      name: "add-order",
      component: () => import("./views/AddOrder.vue")
    },
    {
      path: "/orders/:id",
      name: "order-details",
      component: () => import("./views/Order.vue")
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

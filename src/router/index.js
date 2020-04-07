import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/regist",
    component: () => import("@/views/login/regist"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    alwaysShow: true,
    name: "user",
    meta: {
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "profile",
        meta: {
          title: "个人信息",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/401",
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/role",
    alwaysShow: true, // will always show the root menu
    name: "perssion",
    meta: {
      title: "权限管理",
      icon: "lock",
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "role",
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "grant",
        component: () => import("@/views/permission/grant"),
        name: "grant",
        meta: {
          title: "权限授予",
        },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/list",
    alwaysShow: true, // will always show the root menu
    name: "商品管理",
    meta: {
      title: "商品管理",
      icon: "goods",
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/goods/list"),
        name: "商品列表",
        meta: {
          title: "商品列表",
        },
      },
      {
        path: "addgood",
        component: () => import("@/views/goods/addgood"),
        name: "添加商品",
        meta: {
          title: "添加商品",
        },
      },
    ],
  },
  {
    path: "/orders",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/orders/index"),
        name: "orders",
        meta: {
          title: "订单管理",
          icon: "tab",
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

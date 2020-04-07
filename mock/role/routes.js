// Just a mock data

export const asyncRoutes = [
  {
    path: "/permission",
    redirect: "/permission/role",
    alwaysShow: true, // will always show the root menu
    name: "权限管理",
    meta: {
      title: "权限管理",
      icon: "lock"
    },
    children: [
      {
        path: "role",
        name: "角色管理",
        meta: {
          title: "角色管理"
        }
      },

      {
        path: "grant",
        name: "grant",
        meta: {
          title: "权限授予"
        }
      }
    ]
  },
  {
    path: "/goods",
    redirect: "/goods/list",
    alwaysShow: true, // will always show the root menu
    name: "商品管理",
    meta: {
      title: "商品管理",
      icon: "goods"
    },
    children: [
      {
        path: "list",
        name: "商品列表",
        meta: {
          title: "商品列表"
        }
      },
      {
        path: "addgood",
        name: "添加商品",
        meta: {
          title: "添加商品"
        }
      }
    ]
  },
  {
    path: "/orders",
    children: [
      {
        path: "index",
        name: "orders",
        meta: {
          title: "订单管理",
          icon: "tab"
        }
      }
    ]
  },

  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

import Mock from "mockjs";
import { deepClone } from "../../src/utils/index.js";
import { asyncRoutes } from "./routes.js";

const routes = deepClone(asyncRoutes);

const rolesList = [
  {
    key: "5e85756ce83c700c478ba718",
    name: "超级管理员",
    description: "超级管理员，管理所有页面",
    routes: [
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
    ]
  },
  {
    key: "1",
    name: "editor",
    description: "Normal Editor. Can see all pages except permission page",
    routes: [] // just a mock
  },
  {
    key: "2",
    name: "visitor",
    description:
      "Just a visitor. Can only see the home page and the document page",
    routes: [
      {
        path: "",
        redirect: "dashboard",
        children: [
          {
            path: "dashboard",
            name: "Dashboard",
            meta: { title: "dashboard", icon: "dashboard" }
          }
        ]
      }
    ]
  }
];

export default [
  {
    url: "/getRoleRoutes",
    type: "post",
    response: config => {
      const { roles } = config.body;
      const role = rolesList.find(item => {
        return roles === item.key;
      });
      // mock error
      if (!role) {
        return {
          code: 20000,
          data: []
        };
      }
      return {
        code: 20000,
        data: role.routes
      };
    }
  },

  // mock get all routes form server
  {
    url: "/routes",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: routes
      };
    }
  },

  // mock get all roles form server
  {
    url: "/roles",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: rolesList
      };
    }
  },

  // add role
  {
    url: "/role",
    type: "post",
    response: {
      code: 20000,
      data: {
        key: Mock.mock("@integer(300, 5000)")
      }
    }
  },

  // update role
  {
    url: "/role/[A-Za-z0-9]",
    type: "put",
    response: {
      code: 20000,
      data: {
        status: "success"
      }
    }
  },

  // delete role
  {
    url: "/role/[A-Za-z0-9]",
    type: "delete",
    response: {
      code: 20000,
      data: {
        status: "success"
      }
    }
  }
];

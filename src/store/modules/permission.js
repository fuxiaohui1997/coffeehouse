import { asyncRoutes, constantRoutes } from "@/router";
import { getRoleRoutes } from "@/api/role";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(accessRoutes, routes) {
  const res = [];
  routes.forEach(route => {
    const target = accessRoutes.find(item => {
      return item.path === route.path;
    });
    if (target) {
      const tmp = { ...route };
      const targetTmp = { ...target };
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(targetTmp.children, tmp.children);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoleRoutes({ roles: roles }).then(response => {
        const { data } = response;
        const accessedRoutes = filterAsyncRoutes(data, asyncRoutes);
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

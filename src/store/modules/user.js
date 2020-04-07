import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "http://193.112.249.63:4001/public/images/2020040411432447613.png",
  introduction: "",
  roles: "",
  roleName: "",
  address: "",
  age: "",
  gender: "",
  email: "",
  tel: "",
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar) {
      state.avatar = avatar;
    }
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_ROLENAME: (state, roleName) => {
    state.roleName = roleName;
  },
  SET_ADDRESS: (state, address) => {
    state.address = address;
  },
  SET_AGE: (state, age) => {
    state.age = age;
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_TEL: (state, tel) => {
    state.tel = tel;
  },
  UPDATE_USER: (state, user) => {
    for (const i in user) {
      if (state.hasOwnProperty(i)) {
        state[i] = user[i];
      }
    }
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const {
            roles,
            name,
            avatar,
            introduction,
            roleName,
            address,
            age,
            gender,
            email,
            tel,
          } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: 没有权限");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          commit("SET_ROLENAME", roleName);
          commit("SET_ADDRESS", address);
          commit("SET_AGE", age);
          commit("SET_GENDER", gender.toString());
          commit("SET_EMAIL", email);
          commit("SET_TEL", tel);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", "");
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", "");
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async (resolve) => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);

      const { roles } = await dispatch("getInfo");

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch("permission/generateRoutes", roles, {
        root: true,
      });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

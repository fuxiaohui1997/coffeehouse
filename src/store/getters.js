const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleName: state => state.user.roleName,
  address: state => state.user.address,
  age: state => state.user.age,
  gender: state => state.user.gender,
  email: state => state.user.email,
  tel: state => state.user.tel,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  goodsMsg: state => state.goods.goodsMsg
};
export default getters;

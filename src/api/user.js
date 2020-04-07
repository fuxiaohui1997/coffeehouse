import myrequest from "@/utils/request";
export function login(data) {
  return myrequest({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function regist(data) {
  return myrequest({
    url: "/user/regist",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return myrequest({
    url: "/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return myrequest({
    url: "/user/logout",
    method: "post",
  });
}

export function fetchList(query) {
  return myrequest({
    url: "/user/list",
    method: "get",
    params: query,
  });
}

export function userRole(data) {
  return myrequest({
    url: "/user/userRole",
    method: "post",
    data,
  });
}

export function userUpdate(data) {
  return myrequest({
    url: "/user/userUpdate",
    method: "post",
    data,
  });
}

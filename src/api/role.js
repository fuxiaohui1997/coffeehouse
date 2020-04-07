import myrequest from "@/utils/request";
export function getRoutes() {
  return myrequest({
    url: "/role/routes",
    method: "get",
  });
}

export function getRoleRoutes(data) {
  return myrequest({
    url: "/role/getRoleRoutes",
    method: "post",
    data,
  });
}

export function getRoles() {
  return myrequest({
    url: "/role/roles",
    method: "get",
  });
}

export function addRole(data) {
  return myrequest({
    url: "/role/add",
    method: "post",
    data,
  });
}

export function updateRole(data) {
  return myrequest({
    url: `/role/update`,
    method: "post",
    data,
  });
}

export function deleteRole(id) {
  return myrequest({
    url: `/role/delete`,
    method: "get",
    params: { id },
  });
}

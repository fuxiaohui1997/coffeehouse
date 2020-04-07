import myrequest from "@/utils/request";
export function addGoods(data) {
  return myrequest({
    url: "/goods/add",
    method: "post",
    data,
  });
}

export function updateGoods(data) {
  return myrequest({
    url: "/goods/update",
    method: "post",
    data,
  });
}
export function deleteGoods(data) {
  return myrequest({
    url: "/goods/delete",
    method: "post",
    data,
  });
}

export function fetchList(query) {
  return myrequest({
    url: "/goods/list",
    method: "get",
    params: query,
  });
}

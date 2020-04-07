import request from "@/utils/request";
export function fetchList(query) {
  return request({
    url: "/orders/list",
    method: "get",
    params: query
  });
}
export function updateOrder(data) {
  return request({
    url: "/orders/update",
    method: "post",
    data
  });
}

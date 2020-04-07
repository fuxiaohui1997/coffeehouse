const goodsList = [
  {
    id: "sssssssss",
    name: "name",
    price: "price",
    num: "1",
    category: ["1", "2", "3"],
    make: "66666",
    origin: "的点点滴滴",
    history: "的点点滴滴",
    imgList: ["ddddd", "dddddd"],
    description: "fffffffff"
  },
  {
    id: "sssssssss1",
    name: "name",
    price: "price",
    num: "1",
    category: ["1", "2", "3"],
    make: "66666",
    origin: "的点点滴滴",
    history: "的点点滴滴",
    imgList: ["ddddd", "dddddd"],
    description: "fffffffff"
  },
  {
    id: "sssssssss",
    name: "name",
    price: "price",
    num: "1",
    category: ["1", "2", "3"],
    make: "66666",
    origin: "的点点滴滴",
    history: "的点点滴滴",
    imgList: ["ddddd", "dddddd"],
    description: "fffffffff"
  },
  {
    id: "sssssssss1",
    name: "name",
    price: "price",
    num: "1",
    category: ["1", "2", "3"],
    make: "66666",
    origin: "的点点滴滴",
    history: "的点点滴滴",
    imgList: ["ddddd", "dddddd"],
    description: "fffffffff"
  }
];
export default [
  {
    url: "/goods/list",
    type: "get",
    response: config => {
      return {
        code: 20000,
        data: {
          total: 4,
          items: goodsList
        }
      };
    }
  },
  {
    url: "/goods/add",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/goods/update",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/goods/delete",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];

import Mock from "mockjs";

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      name: "@name",
      tel: "123456789",
      timestamp: +Mock.Random.date("T"),
      address: "@region",
      importance: "@integer(1, 10)",
      "status|1": ["1", "2", "3"],
      price: "@integer(1, 1000)",
      goodsList: [
        {
          id: "@increment",
          name: "商品1号",
          num: "@integer(1, 10)",
          price: "@integer(1, 10)",
          describe: "@cparagraph(1)"
        },
        {
          id: "@increment",
          name: "商品2号",
          num: "@integer(1, 10)",
          price: "@integer(1, 10)",
          describe: "@cparagraph(1)"
        }
      ]
    })
  );
}

export default [
  {
    url: "/orders/list",
    type: "get",
    response: config => {
      const { status, page = 1, limit = 20, sort } = config.query;

      let mockList = List.filter(item => {
        if (status && item.status !== status && status !== "0") return false;
        return true;
      });

      if (sort === "-id") {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      };
    }
  },
  {
    url: "/orders/update",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];

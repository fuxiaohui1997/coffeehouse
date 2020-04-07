import Mock from "mockjs";
const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    _id: "@increment",
    roles: "0",
    roleName: "admin",
    introduction: "@region",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "@name",
    address: "@region",
    age: "@integer(1, 100)",
    gender: "@integer(0, 1)",
    email: "@email",
    tel: "666666666666"
  },
  "editor-token": {
    _id: "@increment",
    roles: "1",
    roleName: "admin",
    introduction: "@region",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "@name",
    address: "@region",
    age: "@integer(1, 100)",
    gender: "@integer(0, 1)",
    email: "@email",
    tel: "666666666666"
  }
};

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      _id: "@increment",
      roleName: "admin",
      roles: "1",
      introduction: "@region",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: "@name",
      address: "@region",
      age: "@integer(1, 100)",
      gender: "@integer(0, 1)",
      email: "@email",
      tel: "666666666666"
    })
  );
}

export default [
  // user login
  {
    url: "/user/login",
    type: "post",
    response: config => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect."
        };
      }

      return {
        code: 20000,
        data: token
      };
    }
  },

  {
    url: "/user/regist",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  // get user info
  {
    url: "/user/info.*",
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details."
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/user/userRole",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/user/userUpdate",
    type: "post",
    response: config => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/user/list",
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
  }
];

<template>
  <div style="padding: 30px;">
    <el-row>
      <el-col :span="10">
        <div style="margin: 10px 0;">
          <el-input
            v-model="listQuery.search.value"
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-select
              slot="prepend"
              v-model="listQuery.search.key"
              placeholder="请选择"
              style="width: 120px;"
            >
              <el-option label="用户名字" value="name" />
              <el-option label="手机号码" value="tel" />
              <el-option label="邮箱" value="email" />
            </el-select>
            <el-button
              slot="append"
              :loading="loading"
              icon="el-icon-search"
              @click="getList()"
            />
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="usersList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        label="用户名字"
        width="240"
        element-loading-text="加载中！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="用户邮箱">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="用户手机">
        <template slot-scope="{ row }">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" align="center" label="用户地址">
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="权限名称">
        <template slot-scope="{ row }">
          <span>{{ roleName(row.roles) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.disable ? true : false"
            type="primary"
            size="mini"
            @click="grant(scope.row)"
          >
            权限变更
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="dialogVisible" title="权限变更">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="用户名字">
          {{ user.name }}
        </el-form-item>
        <el-form-item label="角色名字">
          <el-select
            v-model="user.roles"
            placeholder="请选择"
            @change="changeDisabled"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :disabled="disabled" @click="confirmUser">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, userRole } from "@/api/user";
import { getRoles } from "@/api/role";
export default {
  data() {
    return {
      disabled: true,
      dialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        sort: "+id",
        search: {
          key: "",
          value: "",
        },
      },
      loading: false,
      user: {},
      usersList: [],
      options: [],
      value: "",
    };
  },
  created() {
    this.getList();
    this.getRoles();
  },
  methods: {
    changeDisabled() {
      this.disabled = false;
    },
    roleName(roles) {
      var name = "查不到该用户的角色";
      this.options.forEach((item) => {
        if (roles === item.value) {
          name = item.label;
        }
      });
      return name;
    },
    confirmUser() {
      var self = this;
      this.$confirm("确认修改", "确认操作", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (self.options) {
            self.options.forEach((item) => {
              if (item.value === self.user.roles) {
                self.user.roleName = item.label;
              }
            });
          }
          userRole({
            id: self.user._id,
            roleId: self.user.roles,
            roleName: self.user.roleName,
          }).then((response) => {
            const index = self.usersList.findIndex((i) => {
              return i._id === self.user._id;
            });
            self.usersList.splice(index, 1, self.user);
            self.$message({
              type: "success",
              message: "修改成功",
            });
            self.disabled = true;
            self.dialogVisible = false;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getRoles() {
      var self = this;
      const res = await getRoles();
      res.data.forEach((item) => {
        self.options.push({
          label: item.name,
          value: item._id,
        });
      });
    },
    handleCurrentChange() {
      this.getList();
    },
    getList() {
      this.loading = true;
      fetchList(this.listQuery).then((response) => {
        this.usersList = response.data.items;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    grant(user) {
      this.dialogVisible = true;
      this.user = JSON.parse(JSON.stringify(user));
    },
  },
};
</script>

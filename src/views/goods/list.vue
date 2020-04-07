<template>
  <div style="padding: 30px;">
    <el-row>
      <el-col :span="10">
        <!-- 商品查询 -->
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
              style="width: 100px;"
            >
              <el-option label="商品名" value="name" />
              <el-option label="价格" value="price" />
              <el-option label="种类" value="category" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getList" />
          </el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <el-button style="margin: 10px;" type="primary" @click="goAddGood">
          添加商品
        </el-button>
      </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table
      :data="goodsList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        label="商品编号"
        width="220"
        element-loading-text="加载中！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="190px" align="center" label="商品名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="商品价格">
        <template slot-scope="{ row }">
          <span>￥{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="商品数量">
        <template slot-scope="{ row }">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="400px" align="center" label="商品种类">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.category"
            :key="item"
            style="margin: 4px 8px;"
          >
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="160px" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editGoods(scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteGoods(scope.row._id, scope.$index)"
          >
            删除
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
  </div>
</template>
<script>
// 商品模块接口
import { deleteGoods, fetchList } from "@/api/goods";
export default {
  data() {
    return {
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
      goodsList: [],
    };
  },
  created() {
    // 初始化商品列表
    this.getList();
  },
  methods: {
    // 查询商品
    handleCurrentChange() {
      this.getList();
    },
    // 获取商品列表
    getList() {
      this.loading = true;
      this.$emit("create"); // for test
      fetchList(this.listQuery).then((response) => {
        this.goodsList = response.data.items;
        this.total = response.data.total;
      });
    },
    // 添加商品跳转
    goAddGood() {
      this.$router.push(`addgood?active=add`);
    },
    // 修改商品
    editGoods(data) {
      this.$store.commit("goods/CHANGE_SETTING", { goods: data });
      this.$router.push(`addgood?active=edit`);
    },
    // 删除商品
    deleteGoods(id, index) {
      console.log(index);
      var self = this;
      this.$confirm("确认删除", "确认操作", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          deleteGoods({ id: id }).then((response) => {
            self.goodsList.splice(index, 1);
            self.$message({
              type: "success",
              message: "删除商品成功",
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

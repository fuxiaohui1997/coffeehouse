<template>
  <div>
    <!-- 订单列表 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        v-loading="loading"
        align="center"
        label="订单编号"
        width="200"
        element-loading-text="加载中！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{
            scope.row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" align="center" label="顾客信息">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>手机: {{ scope.row.tel }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.name }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="催单次数">
        <template slot-scope="scope">
          {{ scope.row.importance }}
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="总价">
        <template slot-scope="scope">
          ￥{{ scope.row.price | number }}
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status | textFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCheck(scope.row)">
            查看详情
          </el-button>
          <el-button
            v-if="scope.row.status === 1"
            type="success"
            size="mini"
            @click="handleDeliver(scope)"
          >
            已发货
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

    <!-- 商品信息对话框，查看商品详情时显示 -->
    <el-dialog :visible.sync="dialogVisible" title="商品列表">
      <div style="text-align: right;">
        <el-table
          :data="order.goodsList"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column align="center" label="商品编号" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品名" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品描述" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.describe }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品价格" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.price | number }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订购数量">
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="warning" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 订单模块接口
import { fetchList, updateOrder } from "@/api/orders";
// 深拷贝
import { deepClone } from "@/utils";
export default {
  // 根据商品状态过滤成中文
  filters: {
    statusFilter(status) {
      const statusMap = {
        3: "success",
        2: "default",
        1: "warning"
      };
      return statusMap[status];
    },
    textFilter(status) {
      const textMap = {
        3: "已完成",
        2: "已发货",
        1: "待发货"
      };
      return textMap[status];
    },
    // 两位浮点数显示价格
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    }
  },
  props: {
    type: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      order: {},
      dialogVisible: false,
      total: 100,
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        status: this.type,
        sort: "+id"
      },
      loading: false
    };
  },
  created() {
    // 初始化订单列表
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      this.$emit("create"); // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
      });
    },
    // 查询
    handleCurrentChange() {
      this.getList();
    },
    // 查看订单商品
    handleCheck(order) {
      this.order = order;
      this.dialogVisible = true;
    },
    // 发货时修改状态
    handleDeliver({ $index, row }) {
      this.$confirm("确认已发货", "确认操作", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var order = deepClone(row);
          updateOrder({ id: order._id }).then(response => {
            order.status = 2;
            const tab = this.$route.query.tab;
            if (tab === "1") {
              this.list.splice($index, 1);
              if (this.list.length < 1) {
                this.getList();
              }
              return;
            }
            this.list.splice($index, 1, order);
            this.$message({
              type: "success",
              message: "发货成功"
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

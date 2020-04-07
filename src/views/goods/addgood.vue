<template>
  <div class="tab-container">
    <el-tabs tab-position="left" type="border-card" style="height: 600px;">
      <!-- 商品信息表单 -->
      <el-tab-pane label="基本参数">
        <basic-parameters :child-data="goodsMsg" @child-event="goodMsg" />
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <pictures :child-data="goodsMsg" @child-event="goodMsg" />
      </el-tab-pane>
      <el-tab-pane label="商品描述">
        <description :child-data="goodsMsg" @child-event="goodMsg" />
      </el-tab-pane>
      <el-tab-pane label="商品详情">
        <good-details :child-data="goodsMsg" @child-event="goodMsg" />
      </el-tab-pane>
    </el-tabs>
    <el-button
      style="float: right; margin: 10px;"
      type="primary"
      @click="addGood"
    >
      {{ type === "add" ? "添加商品" : "保存" }}
    </el-button>
  </div>
</template>
<script>
// 引入组件和接口
import { mapGetters } from "vuex";
import basicParameters from "./components/basicparameters";
import pictures from "./components/pictures";
import description from "./components/description";
import goodDetails from "./components/details";
import { addGoods, updateGoods } from "@/api/goods";
export default {
  components: {
    // 基本参数
    basicParameters,
    // 商品图片
    pictures,
    // 描述
    description,
    // 详情
    goodDetails,
  },
  data() {
    return {
      type: "add",
      goods: {},
    };
  },
  computed: {
    ...mapGetters(["goodsMsg"]),
  },
  created() {
    const type = this.$route.query.active;
    if (type) {
      this.type = type;
    }
  },
  methods: {
    // 子组件传参
    goodMsg(data) {
      for (const i in data) {
        this.goods[i] = data[i];
      }
    },
    // 商品提交
    addGood() {
      this.$confirm("确认提交", "确认操作", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var goods = JSON.parse(JSON.stringify(this.goods));
          if (this.type === "add") {
            // 如果为添加
            addGoods(goods).then((response) => {
              this.$message({
                type: "success",
                message: "添加商品成功",
              });
              this.$store.commit("goods/CHANGE_SETTING", { goods: {}});
              this.$router.push({
                path: this.redirect || "/goods/addgood",
                query: this.otherQuery,
              });
            });
          } else {
            // 如果为修改
            goods.id = this.goodsMsg._id;
            updateGoods(goods).then((response) => {
              this.$message({
                type: "success",
                message: "添加商品成功",
              });
              this.$store.commit("goods/CHANGE_SETTING", { goods: {}});
              this.$router.push({
                path: this.redirect || "/goods/addgood",
                query: this.otherQuery,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.tab-container {
  margin: 30px;
}
</style>

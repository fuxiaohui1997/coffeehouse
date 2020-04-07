<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <!-- 渲染订单 -->
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName == item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 订单组件
import tabPane from "./components/TabPane";
export default {
  name: "Orders",
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "全部订单", key: "0" },
        { label: "待发货", key: "1" },
        { label: "待收货", key: "2" },
        { label: "已完成", key: "3" }
      ],
      activeName: "0"
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {}
};
</script>

<style scoped>
.tab-container {
  margin: 20px;
}
</style>

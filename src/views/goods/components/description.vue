<template>
  <div>
    <el-row class="item">
      <el-col
        :span="3"
        style="height: 36px;overflow: hidden;line-height: 36px;text-align: center;"
      >
        商品描述
      </el-col>
      <el-col :span="21">
        <el-input
          v-model="good.description"
          type="textarea"
          rows="20"
          placeholder="请输入商品描述"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    childData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      good: {
        description: ""
      }
    };
  },
  watch: {
    good: {
      // 监听变化，传值给父组件
      handler: function() {
        this.$emit("child-event", this.good);
      },
      deep: true
    }
  },
  created() {
    // 如果为修改时从vuex获取信息
    const type = this.$route.query.active;
    if (type === "edit") {
      for (const i in this.good) {
        if (this.childData[i]) {
          this.good[i] = this.childData[i];
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 10px;
}
</style>

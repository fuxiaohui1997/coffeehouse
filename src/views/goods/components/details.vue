<template>
  <div>
    <el-row class="item">
      <el-col
        :span="3"
        style="height: 36px;overflow: hidden;line-height: 36px;text-align: center;"
      >
        制作过程
      </el-col>
      <el-col :span="21">
        <el-input
          v-model="good.make"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="请输入制作过程"
        />
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col
        :span="3"
        style="height: 36px;overflow: hidden;line-height: 36px;text-align: center;"
      >
        出产来源
      </el-col>
      <el-col :span="21">
        <el-input
          v-model="good.origin"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="请输入出产来源"
        />
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col
        :span="3"
        style="height: 36px;overflow: hidden;line-height: 36px;text-align: center;"
      >
        历史发展
      </el-col>
      <el-col :span="21">
        <el-input
          v-model="good.history"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="请输入历史发展"
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
        make: "",
        origin: "",
        history: ""
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

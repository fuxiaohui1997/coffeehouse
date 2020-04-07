<template>
  <div>
    <el-row class="item">
      <el-col
        :span="3"
        style="
          height: 36px;
          overflow: hidden;
          line-height: 36px;
          text-align: center;
        "
      >
        商品名称
      </el-col>
      <el-col :span="21">
        <el-input v-model="good.name" placeholder="请输入商品名称" />
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col
        :span="3"
        style="
          height: 36px;
          overflow: hidden;
          line-height: 36px;
          text-align: center;
        "
      >
        商品价格
      </el-col>
      <el-col :span="21">
        <el-input v-model="good.price" placeholder="请输入商品价格" />
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col
        :span="3"
        style="
          height: 36px;
          overflow: hidden;
          line-height: 36px;
          text-align: center;
        "
      >
        商品数量
      </el-col>
      <el-col :span="21">
        <el-input
          v-model="good.num"
          type="number"
          placeholder="请输入商品数量"
        />
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col
        :span="3"
        style="
          height: 36px;
          overflow: hidden;
          line-height: 36px;
          text-align: center;
        "
      >
        商品种类
      </el-col>
      <el-col :span="21">
        <el-select
          v-model="good.category"
          multiple
          filterable
          allow-create
          placeholder="请选择种类"
          style="width: 100%;"
        >
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
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
      },
    },
  },
  data() {
    return {
      options: [
        {
          label: "促销种类",
          options: [
            {
              value: "推荐",
              label: "推荐",
            },
            {
              value: "品牌",
              label: "品牌",
            },
            {
              value: "折扣",
              label: "折扣",
            },
            {
              value: "实惠",
              label: "实惠",
            },
            {
              value: "销量",
              label: "销量",
            },
          ],
        },
        {
          label: "品牌种类",
          options: [
            {
              value: "纯咖啡",
              label: "纯咖啡",
            },
            {
              value: "白咖啡",
              label: "白咖啡",
            },
            {
              value: "意大利咖啡",
              label: "意大利咖啡",
            },
            {
              value: "蓝山咖啡",
              label: "蓝山咖啡",
            },
            {
              value: "曼特宁咖啡",
              label: "曼特宁咖啡",
            },
            {
              value: "哥伦比亚咖啡",
              label: "哥伦比亚咖啡",
            },
            {
              value: "越南咖啡",
              label: "越南咖啡",
            },
            {
              value: "猫屎咖啡",
              label: "猫屎咖啡",
            },
            {
              value: "摩卡咖啡",
              label: "摩卡咖啡",
            },
          ],
        },
      ],
      good: {
        name: "",
        price: "",
        num: "",
        category: [],
      },
    };
  },
  watch: {
    good: {
      // 监听变化，传值给父组件
      handler: function() {
        this.$emit("child-event", this.good);
      },
      deep: true,
    },
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
  },
};
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 10px;
}
</style>

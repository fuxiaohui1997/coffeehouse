<template>
  <el-card style="margin-bottom: 20px;">
    <div slot="header" class="clearfix">
      <span>我的</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'160px'"
          :width="'160px'"
          :hoverable="false"
        >
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.introduction }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>个人</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            性别:{{ user.gender === "1" ? "女" : "男" }}
          </div>
          <div class="text-muted">年龄:{{ user.age }}</div>
          <div class="text-muted">地址:{{ user.address }}</div>
          <div class="text-muted">邮箱:{{ user.email }}</div>
          <div class="text-muted">手机:{{ user.tel }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
  margin-bottom: 7px;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 16px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 16px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>

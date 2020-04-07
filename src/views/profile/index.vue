<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <!-- 用户信息卡片 -->
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- 照片墙 -->
              <el-tab-pane label="照片墙" name="picturewall">
                <div style="height: 600px; overflow: auto;">
                  <div class="demo-image__lazy">
                    <el-image
                      v-for="url in urls"
                      :key="url"
                      :src="url"
                      style="width: 100%;"
                      lazy
                    />
                  </div>
                </div>
              </el-tab-pane>
              <!-- 更新信息页 -->
              <el-tab-pane label="更新个人信息" name="info">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Account from "./components/Account";

export default {
  name: "Profile",
  components: { UserCard, Account },
  data() {
    return {
      activeTab: "picturewall",
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
  computed: {
    user() {
      return {
        id: this.token,
        name: this.name,
        role: this.roleName,
        email: this.email,
        avatar: this.avatar,
        introduction: this.introduction,
        address: this.address,
        age: this.age,
        gender: this.gender,
        tel: this.tel,
      };
    },
    ...mapGetters([
      "token",
      "name",
      "avatar",
      "roleName",
      "introduction",
      "address",
      "age",
      "gender",
      "email",
      "tel",
    ]),
  },
};
</script>

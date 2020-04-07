<template>
  <el-form>
    <el-row>
      <el-col :xs="24" :sm="14" :md="8" :lg="6" :xl="4">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-change="uploadImg"
        >
          <img v-if="cuser.avatar" :src="cuser.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-form-item label="姓名">
          <el-input v-model.trim="cuser.name" />
        </el-form-item>
        <el-row>
          <el-col :xs="12" :sm="9" :md="7" :lg="5" :xl="4">
            <el-form-item label="性别">
              <br />
              <el-radio v-model="cuser.gender" label="0">男</el-radio>
              <el-radio v-model="cuser.gender" label="1">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="15" :md="17" :lg="19" :xl="20">
            <el-form-item label="年龄">
              <el-input v-model.trim="cuser.age" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="邮箱">
          <el-input v-model.trim="cuser.email" />
        </el-form-item>
      </el-col>
      <el-col :offset="2" :span="11">
        <el-form-item label="手机">
          <el-input v-model.trim="cuser.tel" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="地址">
      <el-input v-model.trim="cuser.address" />
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input
        v-model="cuser.introduction"
        :autosize="{ minRows: 4, maxRows: 6 }"
        type="textarea"
      />
    </el-form-item>
    <el-form-item>
      <el-button style="margin-top: 10px;" type="primary" @click="submit">
        更新</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { userUpdate } from "@/api/user";
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      cuser: JSON.parse(JSON.stringify(this.user)),
    };
  },
  methods: {
    // 更新提交
    submit() {
      const self = this;
      this.$confirm("确认更新", "提醒", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var obj = JSON.parse(JSON.stringify(self.cuser));
          obj.id = self.$store.state.user.token;
          userUpdate(obj).then((response) => {
            self.$store.commit("user/UPDATE_USER", self.cuser);
            this.$message({
              type: "success",
              message: "更新成功!",
            });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 上传图片
    uploadImg(file) {
      var self = this;
      this.getBase64(file.raw).then((res) => {
        self.cuser.avatar = res;
      });
    },
    // 将图片转换成base64编码
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 7px;
}
</style>

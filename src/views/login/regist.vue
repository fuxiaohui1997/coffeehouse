<template>
  <div class="regist-container">
    <el-form
      ref="registForm"
      :model="registForm"
      :rules="registRules"
      class="regist-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Coffee House后台注册</h3>
      </div>

      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="name" />
        </span>
        <el-input
          ref="name"
          v-model="registForm.name"
          placeholder="姓名"
          name="name"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="tel">
        <span class="svg-container">
          <svg-icon icon-class="tel" />
        </span>
        <el-input
          ref="tel"
          v-model="registForm.tel"
          placeholder="手机"
          name="tel"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="address">
        <span class="svg-container">
          <svg-icon icon-class="address" />
        </span>
        <el-input
          ref="address"
          v-model="registForm.address"
          placeholder="地址"
          name="address"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="cpassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="cpassword"
            v-model="registForm.cpassword"
            :type="passwordType"
            placeholder="确认密码"
            name="cpassword"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item class="remember">
        <el-link :underline="false" @click="goLogin">
          已有账号?去登录
        </el-link>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegist"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { regist } from "@/api/user";
export default {
  name: "Regist",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入至少5位用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入至少6位密码"));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    const validateTel = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入手机"));
      } else {
        callback();
      }
    };
    const validateAddress = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入地址"));
      } else {
        callback();
      }
    };
    return {
      registForm: {
        username: "",
        password: "",
        cpassword: "",
        name: "",
        email: "",
        tel: "",
        address: ""
      },
      registRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        cpassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        name: [{ required: true, trigger: "blur", validator: validateName }],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        tel: [{ required: true, trigger: "blur", validator: validateTel }],
        address: [
          { required: true, trigger: "blur", validator: validateAddress }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      checked: false
    };
  },
  mounted() {
    if (this.registForm.username === "") {
      this.$refs.username.focus();
    } else if (this.registForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegist() {
      if (this.registForm.password !== this.registForm.cpassword) {
        this.$message({
          type: "warning",
          message: "确认密码与密码不一致"
        });
        return;
      }
      this.$refs.registForm.validate(valid => {
        if (valid) {
          regist(this.registForm).then(response => {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.$store
              .dispatch("user/login", {
                username: this.registForm.username,
                password: this.registForm.password
              })
              .then(() => {
                if (this.checked) {
                  this.setCookie(this.username, this.password, 7);
                }
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .regist-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.regist-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.regist-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .regist-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .remember {
    background-color: transparent;
    border: none;
    color: #eee;
    text-align: center;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f9ebb7f"],{"14a5":function(e,s,t){},"33f4":function(e,s,t){"use strict";var r=t("96ef"),a=t.n(r);a.a},"58e5":function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"regist-container"},[t("el-form",{ref:"registForm",staticClass:"regist-form",attrs:{model:e.registForm,rules:e.registRules,autocomplete:"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("Coffee House后台注册")])]),e._v(" "),t("el-form-item",{attrs:{prop:"name"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"name"}})],1),e._v(" "),t("el-input",{ref:"name",attrs:{placeholder:"姓名",name:"name",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.registForm.name,callback:function(s){e.$set(e.registForm,"name",s)},expression:"registForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"email"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"email"}})],1),e._v(" "),t("el-input",{ref:"email",attrs:{placeholder:"邮箱",name:"email",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.registForm.email,callback:function(s){e.$set(e.registForm,"email",s)},expression:"registForm.email"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"tel"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"tel"}})],1),e._v(" "),t("el-input",{ref:"tel",attrs:{placeholder:"手机",name:"tel",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.registForm.tel,callback:function(s){e.$set(e.registForm,"tel",s)},expression:"registForm.tel"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"address"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"address"}})],1),e._v(" "),t("el-input",{ref:"address",attrs:{placeholder:"地址",name:"address",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.registForm.address,callback:function(s){e.$set(e.registForm,"address",s)},expression:"registForm.address"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),t("el-input",{ref:"username",attrs:{placeholder:"账号",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.registForm.username,callback:function(s){e.$set(e.registForm,"username",s)},expression:"registForm.username"}})],1),e._v(" "),t("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(s){e.capsTooltip=s},expression:"capsTooltip"}},[t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),t("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(s){e.capsTooltip=!1}},nativeOn:{keyup:function(s){return e.checkCapslock(s)}},model:{value:e.registForm.password,callback:function(s){e.$set(e.registForm,"password",s)},expression:"registForm.password"}}),e._v(" "),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),t("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(s){e.capsTooltip=s},expression:"capsTooltip"}},[t("el-form-item",{attrs:{prop:"cpassword"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),t("el-input",{key:e.passwordType,ref:"cpassword",attrs:{type:e.passwordType,placeholder:"确认密码",name:"cpassword",tabindex:"2",autocomplete:"on"},on:{blur:function(s){e.capsTooltip=!1}},nativeOn:{keyup:function(s){return e.checkCapslock(s)}},model:{value:e.registForm.cpassword,callback:function(s){e.$set(e.registForm,"cpassword",s)},expression:"registForm.cpassword"}}),e._v(" "),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),t("el-form-item",{staticClass:"remember"},[t("el-link",{attrs:{underline:!1},on:{click:e.goLogin}},[e._v("\n        已有账号?去登录\n      ")])],1),e._v(" "),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleRegist(s)}}},[e._v("\n      注册\n    ")])],1)],1)},a=[],o=t("61f7"),n=t("c24f"),i={name:"Regist",data:function(){var e=function(e,s,t){Object(o["d"])(s)?t():t(new Error("请输入至少5位用户名"))},s=function(e,s,t){s.length<6?t(new Error("请输入至少6位密码")):t()},t=function(e,s,t){s.length<1?t(new Error("请输入姓名")):t()},r=function(e,s,t){s.length<1?t(new Error("请输入邮箱")):t()},a=function(e,s,t){s.length<1?t(new Error("请输入手机")):t()},n=function(e,s,t){s.length<1?t(new Error("请输入地址")):t()};return{registForm:{username:"",password:"",cpassword:"",name:"",email:"",tel:"",address:""},registRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:s}],cpassword:[{required:!0,trigger:"blur",validator:s}],name:[{required:!0,trigger:"blur",validator:t}],email:[{required:!0,trigger:"blur",validator:r}],tel:[{required:!0,trigger:"blur",validator:a}],address:[{required:!0,trigger:"blur",validator:n}]},passwordType:"password",capsTooltip:!1,loading:!1,redirect:void 0,otherQuery:{},checked:!1}},mounted:function(){""===this.registForm.username?this.$refs.username.focus():""===this.registForm.password&&this.$refs.password.focus()},methods:{goLogin:function(){this.$router.push("/login")},checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=e.shiftKey,t=e.key;t&&1===t.length&&(this.capsTooltip=!!(s&&t>="a"&&t<="z"||!s&&t>="A"&&t<="Z")),"CapsLock"===t&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleRegist:function(){var e=this;this.registForm.password===this.registForm.cpassword?this.$refs.registForm.validate((function(s){s&&Object(n["e"])(e.registForm).then((function(s){e.$message({type:"success",message:"注册成功"}),e.$store.dispatch("user/login",{username:e.registForm.username,password:e.registForm.password}).then((function(){e.checked&&e.setCookie(e.username,e.password,7),e.$router.push({path:e.redirect||"/",query:e.otherQuery}),e.loading=!1})).catch((function(){e.loading=!1}))}))})):this.$message({type:"warning",message:"确认密码与密码不一致"})}}},l=i,c=(t("88ba"),t("33f4"),t("2877")),p=Object(c["a"])(l,r,a,!1,null,"9b9fd86a",null);s["default"]=p.exports},"88ba":function(e,s,t){"use strict";var r=t("14a5"),a=t.n(r);a.a},"96ef":function(e,s,t){}}]);
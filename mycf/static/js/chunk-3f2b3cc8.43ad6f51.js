(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f2b3cc8"],{"0f4e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{padding:"30px"}},[n("el-row",[n("el-col",{attrs:{span:10}},[n("div",{staticStyle:{margin:"10px 0"}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:t.listQuery.search.value,callback:function(e){t.$set(t.listQuery.search,"value",e)},expression:"listQuery.search.value"}},[n("el-select",{staticStyle:{width:"100px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:t.listQuery.search.key,callback:function(e){t.$set(t.listQuery.search,"key",e)},expression:"listQuery.search.key"}},[n("el-option",{attrs:{label:"商品名",value:"name"}}),t._v(" "),n("el-option",{attrs:{label:"价格",value:"price"}}),t._v(" "),n("el-option",{attrs:{label:"种类",value:"category"}})],1),t._v(" "),n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getList},slot:"append"})],1)],1)]),t._v(" "),n("el-col",{attrs:{span:1}},[n("el-button",{staticStyle:{margin:"10px"},attrs:{type:"primary"},on:{click:t.goAddGood}},[t._v("\n        添加商品\n      ")])],1)],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodsList,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"商品编号",width:"220","element-loading-text":"加载中！"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row._id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"190px",align:"center",label:"商品名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"商品价格"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v("￥"+t._s(a.price))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"商品数量"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"400px",align:"center",label:"商品种类"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.category,(function(e){return n("el-tag",{key:e,staticStyle:{margin:"4px 8px"}},[t._v("\n          "+t._s(e)+"\n        ")])}))}}])}),t._v(" "),n("el-table-column",{attrs:{width:"160px","class-name":"status-col",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return t.editGoods(e.row)}}},[t._v("\n          编辑\n        ")]),t._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.deleteGoods(e.row._id,e.$index)}}},[t._v("\n          删除\n        ")])]}}])})],1),t._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("el-pagination",{attrs:{"current-page":t.listQuery.page,"page-size":t.listQuery.limit,layout:"prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.listQuery,"page",e)},"update:current-page":function(e){return t.$set(t.listQuery,"page",e)},"current-change":t.handleCurrentChange}})],1)],1)},r=[],o=(n("96cf"),n("3b8d")),l=n("c40e"),s={data:function(){return{total:0,listQuery:{page:1,limit:10,sort:"+id",search:{key:"",value:""}},goodsList:[]}},created:function(){this.getList()},methods:{handleCurrentChange:function(){this.getList()},getList:function(){var t=this;this.loading=!0,this.$emit("create"),Object(l["c"])(this.listQuery).then((function(e){t.goodsList=e.data.items,t.total=e.data.total}))},goAddGood:function(){this.$router.push("addgood?active=add")},editGoods:function(t){this.$store.commit("goods/CHANGE_SETTING",{goods:t}),this.$router.push("addgood?active=edit")},deleteGoods:function(t,e){console.log(e);var n=this;this.$confirm("确认删除","确认操作",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:Object(l["b"])({id:t}).then((function(t){n.goodsList.splice(e,1),n.$message({type:"success",message:"删除商品成功"})}));case 1:case"end":return a.stop()}}),a)})))).catch((function(t){console.log(t)}))}}},i=s,c=n("2877"),u=Object(c["a"])(i,a,r,!1,null,null,null);e["default"]=u.exports},c40e:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return s}));var a=n("b775");function r(t){return Object(a["a"])({url:"/goods/add",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/goods/update",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/goods/delete",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/goods/list",method:"get",params:t})}}}]);
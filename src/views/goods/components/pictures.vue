<template>
  <div>
    <el-upload
      id="upload"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="uploadImg"
      :on-remove="removeImg"
      :file-list="filelists"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="removeImg(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      filelists: [],
      good: {
        imgList: []
      }
    };
  },
  watch: {
    good: {
      handler: function() {
        // 监听变化，传值给父组件
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
      if (!this.good.imgList) {
        return;
      }
      this.good.imgList.forEach(item => {
        var file = { url: item.src };
        this.filelists.push(file);
      });
    }
  },
  mounted() {
    // 图片渲染设置宽高
    const type = this.$route.query.active;
    if (type === "edit") {
      if (!this.good.imgList) {
        return;
      }
      this.good.imgList.forEach((item, index) => {
        var img = new Image();
        img.src = item.src;
        img.onload = function() {
          // 设置缩放
          const w = img.width;
          const h = img.height;
          const uploadId = document.getElementById("upload");
          const liDom = uploadId.querySelector(".el-upload-list--picture-card")
            .children;
          const scale = 150 / h;
          const width = w * scale;
          liDom[index].style.width = width + "px";
          liDom[index].style.height = "150px";
        };
      });
    }
  },
  methods: {
    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加图片
    uploadImg(file, filelist) {
      var self = this;
      this.getBase64(file.raw).then(res => {
        this.good.imgList.push({
          name: file.name,
          id: file.uid,
          src: res
        });
        var img = new Image();
        img.src = res;
        // 设置尺寸
        img.onload = function() {
          // 设置缩放
          const w = img.width;
          const h = img.height;
          const uploadId = document.getElementById("upload");
          const liDom = uploadId.querySelector(".el-upload-list").lastChild;
          const scale = 150 / h;
          const width = w * scale;
          liDom.style.width = width + "px";
          liDom.style.height = "150px";
        };
      });
      self.filelists = filelist;
    },
    // 删除图片
    removeImg(file) {
      var fileIndex = this.filelists.findIndex(item => {
        return item.uid === file.uid;
      });
      this.filelists.splice(fileIndex, 1);
      var index = this.good.imgList.findIndex(item => {
        return item.id === file.uid;
      });
      this.good.imgList.splice(index, 1);
    },
    // 将图片转换成base64
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }
  }
};
</script>

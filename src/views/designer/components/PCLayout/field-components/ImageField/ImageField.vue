<!--Created by LiuLei on 2019/12/25-->
<template>
  <el-upload
    class="fd-upload"
    :action="action"
    accept="image/*"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :headers="headers"
    multiple
    :limit="limit"
    :on-exceed="handleExceed"
    list-type="picture"
    :file-list="fileList">
    <el-button plain type="primary">
      上传图片
      <i class="el-icon-upload el-icon--right"/>
    </el-button>
    <!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
  </el-upload>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import operateModelMixins from '@/views/designer/components/PCLayout/mixins/modelMixins'
import apiNameMixins from '@/views/designer/components/PCLayout/mixins/apiNameMixins'
import formBaseItemMixins from '@/views/designer/components/PCLayout/mixins/formBaseItemMixins'
import api from '@/api'

interface IFile {
  name: string,
  url: string
}

@Component({
  name: 'ImageField'
})
export default class ImageField extends mixins(
  formBaseItemMixins,
  operateModelMixins,
  apiNameMixins) {
  fileList: IFile[] = []

  // get fileList () {
  //   return (this.model || []).map((url: string) => {
  //     return {
  //       name: '',
  //       url
  //     }
  //   })
  // }
  //
  // set fileList (val: any[]) {
  //   console.log('val', val)
  //   this.model = val
  // }

  // get fileList () {
  //   return (this.model || []).map((url: string) => {
  //     return {
  //       name: '',
  //       url
  //     }
  //   })
  // }

  get limit (): number {
    return this.layout.attrs?.limitNumber || 1
  }

  get action (): string {
    return api.commonOss.storage().url
  }

  get headers () {
    return {
      Authorization: `Bearer ${this.$store.state.user.token}`,
      'X-tenant-id': this.$store.state.user.tenantId
    }
  }

  created () {
    //  初始化 fileList
    if (this.model) {
      // TODO 优化
      if (typeof this.model === 'string') {
        this.model = this.model.split('^&^')
      }
      this.fileList = this.model.map((url: string) => {
        return {
          url,
          name: ''
        }
      })
    }
  }

  handleRemove (file: IFile, fileList: IFile[]) {
    console.log(file, fileList)
  }

  handlePreview (file: IFile) {
    console.log(file)
  }

  handleExceed (files: any[], fileList: IFile[]) {
    this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  beforeRemove (file: IFile, fileList: IFile[]) {
    console.log(fileList)
    return this.$confirm(`确定移除 ${file.name}？`)
  }

  handleSuccess (response: any) {
    if (!this.model) {
      this.model = []
    }
    this.model.push(response.data[0])
    // this.fileList = fileList.map((item: any) => {
    //   return {
    //     name: item.name,
    //     url: item.response.data[0]
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
.fd-upload {
  $imageH: 92px;

  /deep/ .el-upload-list {
    &--picture {
      display: flex;
      align-items: center;

      .el-upload-list__item {
        margin-top: 10px;
        height: $imageH;
        width: 80px;
        padding: 0;

        & + .el-upload-list__item {
          margin-left: 5px;
        }

        .el-upload-list__item-thumbnail {
          margin: 20px 0 0 50%;
          height: $imageH - 40px;
          width: auto;
          transform: translateX(-50%);
        }

        .el-upload-list__item-status-label,
        .el-icon-close,
        .el-icon-close-tip {
          z-index: 99999;
        }

        .el-upload-list__item-name {
          display: none;
        }
      }
    }
  }
}
</style>

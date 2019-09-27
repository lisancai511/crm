<template>
  <div class="details">
      <el-form v-if="showEdit" ref="form" style="margin-left:20px" label-position="top" :model="sizeForm" label-width="80px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="对象名称" prop="name">
              <el-input size='medium' v-model="sizeForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item prop="name">
              <div class="rightIcon">
                  <span @click="showIcon" class="addIcon">
                    <dd-icon v-show="showIconFlag" name="Addto"></dd-icon>
                    <div v-show="showIconFlag">图标</div>
                    <dd-icon v-show="!showIconFlag" :name="icon"></dd-icon>
                  </span>
                  <span @click="dialogVisible = true" v-show="!showIconFlag">更换图标</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label-width="86px" label="API Name" prop="apiName">
              <el-input :disabled="true" size='medium' v-model="sizeForm.apiName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label-width="93px" label="最后修改人" prop="lastModifierName">
              <el-input :disabled="true" size='medium' v-model="sizeForm.lastModifierName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="创建人 " prop="creatorName">
              <el-input :disabled="true" size='medium' v-model="sizeForm.creatorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label-width="93px">
              <div style="padding-top:30px;">
                  <span style="margin-right:10px">启用</span>
                  <el-checkbox v-model="sizeForm.enable"></el-checkbox>
                  <span style="margin-right:10px">是否允许重复</span>
                  <el-checkbox v-model="sizeForm.repeatable"></el-checkbox>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label-width="118px" label="Name字段类型" prop="nameFieldType">
              <el-input :disabled="true" size='medium' v-model="sizeForm.nameFieldType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item  label-width="93px" label="Name字段名称" prop="nameFieldName">
              <el-input :disabled="true" size='medium' type="textarea" :rows="2" v-model="sizeForm.nameFieldName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
             <el-form-item label-width="93px" label="备注" prop="description">
               <el-input size='medium' type="textarea" :rows="6" v-model="sizeForm.description"></el-input>
             </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
             <el-button @click="saveData" style="margin:20px 0" type="primary">保存</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div v-else>
        <div class="main">
          <span class="main_left">对象名称</span>
          <span class="main_right">{{sizeForm.name}}</span>
          <span class="main_edit" @click="showEdit=!showEdit"><dd-icon name="edit"> </dd-icon> 编辑</span>
        </div>
        <div class="main">
          <span class="main_left">API Name</span>
          <span class="main_right">{{sizeForm.apiName}}</span>
        </div>
        <div class="main">
          <span class="main_left">创建人</span>
          <span class="main_right">{{sizeForm.creator}}</span>
        </div>
        <div class="main">
          <span class="main_left">Name字段类型</span>
          <span class="main_right">{{sizeForm.nameFieldType}}</span>
        </div>
        <div class="main">
          <span class="main_left">图标</span>
          <span class="main_right"><dd-icon name="Folder"></dd-icon></span>
        </div>
        <div class="main">
          <span class="main_left">最后修改人</span>
          <span class="main_right">{{sizeForm.lastModifierName}}</span>
        </div>
        <div class="main">
          <span class="main_left">启用</span>
          <span class="main_right"><el-checkbox v-model="sizeForm.enable" disabled></el-checkbox></span>
        </div>
        <div class="main">
          <span class="main_left">Name字段名称</span>
          <span class="main_right">{{sizeForm.nameFieldName}}</span>
        </div>
        <div class="main">
          <span class="main_left">备注</span>
          <span class="main_right">{{sizeForm.description}}</span>
        </div>
      </div>

      <el-dialog
        title="图标"
        :visible.sync="dialogVisible"
        width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="shureIcon">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  sizeForm: any = {}
  private showIconFlag: Boolean = true
  private dialogVisible: Boolean = false
  private showEdit: Boolean = false
  private icon: String = 'Folder'
  private mounted () {
    if (this.$route.query.id) {
      this.getData()
    }
  }
  showIcon () {
    this.dialogVisible = true
  }
  shureIcon () {
    this.dialogVisible = false
    this.showIconFlag = false
  }
  async getData () {
    const { data } = await Api.bizObjects.getSingleBizObjects(this.$route.query.id)
    this.sizeForm = data
  }
  async saveData () {
    try {
      await Api.bizObjects.updateBizObjects(this.sizeForm)
      this.showEdit = !this.showEdit
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    } catch (err) {
      this.$message('请求失败')
    }
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(241,242,246,1);
  min-height: 800px;
}
.addIcon {
  width:60px;
  height:60px;
  cursor: pointer;
  border-radius:3px;
  border:1px dashed rgba(221,221,221,1);
  display: inline-flex;
  margin-right: 20px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.rightIcon {
  display: flex;
  align-items: center;
  span {
    cursor: pointer;
  }
}
/deep/ .el-form-item__label {
  padding: 0 0 1px 0;
}
.main {
  margin: 20px 20px 0 0;
  width: 800px;
  &_left {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 20px;
    color:rgba(144,156,165,1);
    vertical-align: top;
  }
  &_right {
    display: inline-block;
    max-width: 430px;
  }
  &_edit {
    color: #FE723F;
    float: right;
    cursor: pointer;
  }
}
</style>

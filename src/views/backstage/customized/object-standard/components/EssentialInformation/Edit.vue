<template>
  <div class="edit">
    <el-form
      ref="form"
      style="margin-left:20px"
      label-position="top"
      :model="sizeForm"
      label-width="80px" size="mini">
      <el-row>
        <el-col :span="6">
          <el-form-item :rules="{required: true, message: '请输入对象名称'}" label="对象名称" prop="name">
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
          <el-form-item :rules="{required: true, message: '请输入apiName'}" label-width="86px" label="API Name" prop="apiName">
            <el-input :disabled="objectId !== 'add'" size='medium' v-model="sizeForm.apiName"></el-input>
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
          <el-form-item :rules="{required: true, message: '请输入Name字段类型'}" label-width="118px" label="Name字段类型" prop="nameFieldType">
            <el-select style="width: 100%" size='medium' v-model="sizeForm.nameFieldType" placeholder="请选择">
              <el-option
                v-for="item in NameType"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label-width="93px" :rules="{required: true, message: '请输入Name字段名称'}" label="Name字段名称" prop="nameFieldName">
            <el-input :disabled="objectId !== 'add'" size='medium'
                      v-model="sizeForm.nameFieldName"></el-input>
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
        <el-col class="m-t-20 m-b-20" :span="15">
          <el-button @click="saveData" type="primary">保存</el-button>
          <el-button v-if="!objectId?true:false" @click="edit" type="primary">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'EssentialInformationEdit'
})
export default class EssentialInformationEdit extends Vue {
  @Prop({ required: true, type: Object }) readonly sizeForm !: any
  private showIconFlag: Boolean = true
  private dialogVisible: Boolean = false
  private icon: String = 'Folder'
  NameType:any = ['文本', '编号']

  get objectId () {
    return this.$route.params.objectId || false
  }

  showIcon () {
    this.dialogVisible = true
  }

  edit () {
    this.$emit('edit', false)
  }

  shureIcon () {
    this.dialogVisible = false
    this.showIconFlag = false
  }

  async saveData () {
    if (this.objectId === 'add') {
      const form = this.$refs['form'] as any
      form.validate(async (valid: any) => {
        if (valid) {
          try {
            const { data } = await Api.bizObjects.addObjects(this.sizeForm)
            if (data.success) {
              this.$message.success('创建成功')
              this.$router.go(-1)
            }
          } catch (err) {
          }
        } else {
          this.$message.error('请完善必填字段')
        }
      })
    } else {
      const form = this.$refs['form'] as any
      form.validate(async (valid: any) => {
        if (valid) {
          try {
            await Api.bizObjects.updateObjects(this.sizeForm)
            this.$emit('edit', false)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (err) {
          }
          this.$emit('updateObject')
        } else {
          this.$message.error('请完善必填字段')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

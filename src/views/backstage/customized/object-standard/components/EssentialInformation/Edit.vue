<template>
  <div class="edit">
    <el-form ref="form"
             style="margin-left:20px"
             label-position="top"
             :model="sizeForm"
             label-width="80px"
             size="mini">
      <el-row>
        <el-col :span="6">
          <el-form-item :rules="{required: true, message: '请输入对象名称'}"
                        label="对象名称"
                        prop="name">
            <el-input size='medium'
                      v-model="sizeForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="3">
          <el-form-item prop="name">
            <icon-select-dialog
              v-model="sizeForm.iconUrl"
              :icon-names="iconNames">
              <div class="rightIcon">
                <span class="dd-click">{{sizeForm.iconUrl?'更换图标':'选择图标'}}</span>
                <dd-icon
                  class="m-l-20"
                  v-if="sizeForm.iconUrl"
                  :full-name="sizeForm.iconUrl?sizeForm.iconUrl:'Addto'"></dd-icon>
              </div>
            </icon-select-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :rules="{required: true, message: '请输入apiName'}"
                        label-width="86px"
                        label="API Name"
                        prop="apiName">
            <el-input :disabled="!!objectId"
                      size='medium'
                      v-model="sizeForm.apiName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="3">
          <el-form-item label-width="93px">
            <div style="padding-top:30px;">
              <!-- <span style="margin-right:10px">启用</span>
              <el-checkbox v-model="sizeForm.enable"></el-checkbox> -->
              <span style="margin-right:10px">是否允许重复</span>
              <el-checkbox v-model="sizeForm.repeatable"></el-checkbox>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :rules="{required: true, message: '请输入Name字段类型'}"
                        label-width="118px"
                        label="Name字段类型"
                        prop="nameFieldType">
            <el-select style="width: 100%"
                       size='medium'
                       v-model="sizeForm.nameFieldType"
                       placeholder="请选择">
              <el-option v-for="item in NameType"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="3">
          <el-form-item label-width="93px"
                        :rules="{required: true, message: '请输入Name字段名称'}"
                        label="Name字段名称"
                        prop="nameFieldName">
            <el-input :disabled="!!objectId"
                      size='medium'
                      v-model="sizeForm.nameFieldName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label-width="93px"
                        label="备注"
                        prop="description">
            <el-input size='medium'
                      type="textarea"
                      :rows="6"
                      v-model="sizeForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="m-t-20 m-b-20"
                :span="15">
          <el-button @click="saveData"
                     type="primary">保存
          </el-button>
          <el-button v-if="!objectId"
                     @click="edit"
                     type="primary">返回
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'
import { object as iconNames } from '@/assets/icon-names'
import IconSelectDialog from '@/components/IconSelectDialog.vue'

@Component({
  name: 'EssentialInformationEdit',
  components: { IconSelectDialog }
})
export default class EssentialInformationEdit extends Vue {
  @Prop({ required: true, type: Object }) readonly sizeForm!: any
  NameType: any = ['文本', '编号']
  iconNames: any = iconNames

  get objectId () {
    return this.$route.params.objectId || false
  }

  edit () {
    this.$router.go(-1)
  }

  async saveData () {
    if (!this.objectId) {
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
.icon {
  cursor: pointer;
}

.icon:hover {
  color: $dd--info-color;
  transform: scale(1.2, 1.2);
}

.active {
  color: $dd--info-color;
  transform: scale(1.2, 1.2);
}
</style>

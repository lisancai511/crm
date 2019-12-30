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
        <el-col style="display:flex" :span="6"
                :offset="3">
          <el-form-item prop="name">
            <icon-select-dialog v-model="sizeForm.iconUrl"
                                :icon-names="iconNames">
              <div class="rightIcon p-t-30">
                <span class="dd-click">{{sizeForm.iconUrl?'更换图标':'选择图标'}}</span>
                <dd-icon class="m-l-20"
                         v-if="sizeForm.iconUrl"
                         :full-name="sizeForm.iconUrl?sizeForm.iconUrl:'Addto'"></dd-icon>
              </div>
            </icon-select-dialog>
          </el-form-item>
          <el-form-item v-if="sizeForm.nameFieldType !== 'AutoNumberField'" label-width="93px">
            <div class="p-t-30 m-l-30">
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
          <el-form-item label-width="93px"
                        :rules="{required: true, message: '请输入Name字段名称'}"
                        label="Name字段名称"
                        prop="nameFieldName">
            <el-input :disabled="!!objectId"
                      size='medium'
                      v-model="sizeForm.nameFieldName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6"
                :offset="3">
          <el-form-item v-if="sizeForm.nameFieldType !== 'AutoNumberField'" label-width="93px">
            <div style="padding-top:30px;">
              <span style="margin-right:10px">启用</span>
              <el-checkbox v-model="sizeForm.enable"></el-checkbox>
              <span style="margin-right:10px">是否允许重复</span>
              <el-checkbox v-model="sizeForm.repeatable"></el-checkbox>
            </div>
          </el-form-item>
        </el-col> -->
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
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="sizeForm.nameFieldType === 'AutoNumberField'" :span="6" :offset="3">
          <el-form-item prop="autoNumberFormat"
                        :rules="{required: true, message: '请选择格式'}"
                        label="格式">
            <el-select size='medium' style="width:100%"
                       v-model="sizeForm.autoNumberFormat">
              <el-option v-for="prefix in prefixes"
                         :key="prefix.value"
                         :value="prefix.value"
                         :label="prefix.label">{{prefix.label}}
              </el-option>
            </el-select>
            <span v-if="sizeForm.autoNumberFormat"
                  class="fs-12">
              示例：{{$moment().format(prefixByValue[sizeForm.autoNumberFormat].label)}}{{String(sizeForm.beginNumber).padStart(+sizeForm.autoNumberLength,'0')}}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 编号 -->
      <el-row v-if="sizeForm.nameFieldType === 'AutoNumberField'">

        <el-col :span="6">
          <el-form-item prop="beginNumber"
                        :rules="{required: true, message: '请输入起始编号'}"
                        label="起始编号">
            <el-input size='medium' v-model.number="sizeForm.beginNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item prop="autoNumberLength"
                        :rules="{required: true, message: '请输入编号长度'}"
                        label="编号长度">
            <el-input size='medium' v-model.number="sizeForm.autoNumberLength"/>
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
      <!-- 编号 -->
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
import IconSelectDialog from '@/components/IconSelectDialog.vue'
import { arrToMap } from '@/utils'
import { iconMaps } from '@/assets/icon'
import { AutoNumberPrefixesList } from '@/views/designer/config/AutoNumberPrefixes'

@Component({
  name: 'EssentialInformationEdit',
  components: { IconSelectDialog }
})
export default class EssentialInformationEdit extends Vue {
  @Prop({ required: true, type: Object }) readonly sizeForm!: any
  NameType: any = [{
    label: '文本',
    value: 'TextField'
  }, {
    label: '编号文本',
    value: 'AutoNumberField'
  }]

  iconNames: any = []

  get prefixes () {
    return AutoNumberPrefixesList
  }

  get prefixByValue () {
    return arrToMap(this.prefixes, 'value')
  }

  get objectId () {
    return this.$route.params.objectId || false
  }

  edit () {
    this.$router.go(-1)
  }

  async saveData () {
    if (!this.objectId) {
      const form = this.$refs.form as any
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
      const form = this.$refs.form as any
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

  created () {
    Api.utils.getIconNames(iconMaps.object).then((iconNames: any) => {
      this.iconNames = iconNames
    })
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

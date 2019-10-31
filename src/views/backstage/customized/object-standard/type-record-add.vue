<template>
  <div>
    <el-card style="min-height: calc(100vh - 150px)">
      <div class="typeRecordAdd">
        <div @click="$router.go(-1)"
             class="close">
          <dd-icon name="close" />
        </div>
        <h3 style="margin:10px 0 25px">
          新建记录类型
        </h3>
        <el-form label-position="top"
                 label-width="100px"
                 :model="formLabelAlign">
          <el-form-item label="记录类型标签">
            <el-input style="width:500px"
                      v-model="formLabelAlign.name"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formLabelAlign.enable">启用</el-checkbox>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      style="width:1000px"
                      v-model="formLabelAlign.description"
                      :rows="6"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="!recordTypeId">
          <h3 style="margin:30px 0 17px">设置可以使用的角色及页面布局</h3>
          <el-table :data="roleList"
                    :header-cell-style="{background:'#F8FAFC'}"
                    border
                    style="width: 50%;">
            <el-table-column prop="name"
                             width="200"
                             label="角色">
            </el-table-column>
            <el-table-column width="80"
                             align="center"
                             label="启用">
              <template slot-scope="scope">
                <el-checkbox v-model="formLabelAlign.roleToRecordTypes[scope.$index].enable"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="设置为默认">
              <template slot-scope="scope">
                <el-checkbox v-model="formLabelAlign.roleToRecordTypes[scope.$index].asDefault"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="请选择要使用的布局">
              <template slot-scope="scope">
                <el-select style="width: 100%"
                           v-model="formLabelAlign.roleToRecordTypes[scope.$index].layoutId"
                           placeholder="请选择">
                  <el-option v-for="item in layoutList"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-button class="m-t-20"
                 @click="submit"
                 type="primary">保存</el-button>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'TypeRecordTypeAdd'
})
export default class TypeRecordTypeAdd extends Vue {
  private input: string = ''
  private formLabelAlign: any = {
    roleToRecordTypes: []
  }
  roleList: any = []
  layoutList: any = []

  get recordTypeId (): string {
    return this.$attrs.recordTypeId
  }

  get objectId (): string {
    return this.$route.params.objectId
  }

  created () {
    this.getData(this.recordTypeId)
  }

  async submit () {
    try {
      if (this.formLabelAlign.id) {
        await Api.bizObjects.updateRecordTypes(
          this.objectId,
          this.formLabelAlign.id,
          this.formLabelAlign
        )
        this.$message.success('修改成功')
        this.$router.go(-1)
      } else {
        await Api.bizObjects.addRecordTypes(this.formLabelAlign, this.objectId)
        this.$message.success('添加成功')
        this.$router.go(-1)
      }
    } catch (err) {
      this.$message.error('添加失败')
    }
  }

  async getData (recordTypeId: string) {
    if (this.recordTypeId) {
      const {
        data: { data }
      } = await Api.bizObjects.getSingleRecordTypes(this.objectId, recordTypeId)
      this.formLabelAlign = data
    }
    ;[
      {
        data: { data: this.roleList }
      },
      {
        data: { data: this.layoutList }
      }
    ] = await Promise.all([
      Api.mainData.getRoles(),
      Api.bizObjects.getLayouts(this.objectId)
    ])
    if (!this.recordTypeId) {
      this.roleList.forEach((item: any) => {
        let obj: any = {}
        obj.roleId = item.id
        this.formLabelAlign.roleToRecordTypes.push(obj)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dd-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(34, 45, 62, 1);
  line-height: 20px;
  margin: 0 0 8px;
}

.typeRecordAdd {
  position: relative;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  right: 0;
  cursor: pointer;
}
</style>

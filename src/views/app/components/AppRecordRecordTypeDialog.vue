<!--Created by LiuLei on 2019/11/20-->
<template>
  <el-dialog
    @close="closeDialog"
    title="选择记录类型"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form>
      <el-form-item>
        <el-select
          v-model="recordTypeId"
          style="width: 100%">
          <el-option
            :key="type.id"
            :value="type.id"
            :label="type.name"
            v-for="type in recordTypes">
            {{type.name}}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="dd-text-center">
      <el-button
        @click="dialogVisible = false">取 消
      </el-button>
      <el-button
        type="primary"
        @click="submit">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import api from '@/api'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import { arrToMap } from '@/utils'

@Component({
  name: 'AppRecordRecordTypeDialog'
})
export default class AppRecordRecordTypeDialog extends mixins(routerParams) {
  dialogVisible: boolean = false
  recordTypes: any[] = []
  recordTypeId: string = ''
  resolve: any
  reject: any

  get recordTypeById () {
    return arrToMap(this.recordTypes, 'id')
  }

  // 按钮点击start
  selectRecordType () {
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      if (this.recordTypes.length === 0) {
        try {
          await api.bizObjects.getAllRecordTypes(this.objectId, { checkAuth: true }).then((res: any) => {
            this.recordTypes = res.data.data
          })
        } catch (e) {
          reject(e)
        }
      }
      if (this.recordTypes.length === 0) {
        resolve(null)
      } else if (this.recordTypes.length === 1) {
        resolve(this.recordTypes[0])
        // await this.$router.push({
        //   path: `${this.$route.path}/records/new`,
        //   query: {
        //     recordTypeId: this.recordTypes[0].id
        //   }
        // })
      } else {
        this.recordTypeId = this.recordTypes[0].id
        this.dialogVisible = true
      }
    })
  }

  submit () {
    if (this.recordTypeById[this.recordTypeId]) {
      typeof this.resolve === 'function' && this.resolve(this.recordTypeById[this.recordTypeId])
    } else {
      typeof this.reject === 'function' && this.reject()
    }
    this.dialogVisible = false
    // console.log('closeDialog111')
  }

  closeDialog () {
    // console.log('closeDialog')
    typeof this.reject === 'function' && this.reject()
  }
}
</script>

<style lang="scss" scoped>

</style>

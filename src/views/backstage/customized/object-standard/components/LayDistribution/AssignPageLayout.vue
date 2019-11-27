<template>
  <div>
    <el-table class="m-b-30"
              :data="roleList"
              :header-cell-style="{background:'#F8FAFC'}"
              border>
      <el-table-column prop="name"
                       min-width='200'
                       fixed='left'
                       label="角色">
      </el-table-column>
      <el-table-column v-for="(item, index0) in recordTypesList"
                       :key="item.id"
                       min-width='200'
                       :label="item.name">
        <template slot-scope="scope">
          <el-input v-model="input"
                    placeholder="请选择"
                    class="dd-click"
                    suffix-icon="el-icon-arrow-down"
                    v-if="!selectMaps[item.id + '_' + scope.row.id]"
                    @focus="showSelect(item.id + '_' + scope.row.id)"> placeholder="请输入内容"></el-input>
          <el-select v-else
                     :ref="item.id + '_' + scope.row.id"
                     clearable
                     v-model="saveArr[scope.$index][index0].layoutId"
                     style="width: 100%"
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
    <el-button @click="saveData"
               type="primary">保存</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'LayDistribution'
})
export default class LayDistribution extends Vue {
  saveArr: any = []
  roleList: any = []
  layoutList: any = []
  recordTypesList: any = []
  data: any = []
  selectMaps: any = {}
  input: any = ''

  created () {
    this.getData()
  }

  get objectId (): string {
    return this.$route.params.objectId
  }

  async getData () {
    ;[
      {
        data: { data: this.roleList }
      },
      {
        data: { data: this.layoutList }
      },
      {
        data: { data: this.recordTypesList }
      },
      {
        data: { data: this.data }
      }
    ] = await Promise.all([
      Api.mainData.getRoles(),
      Api.bizObjects.getLayouts(this.objectId),
      Api.bizObjects.getAllRecordTypes(this.objectId),
      Api.bizObjects.getLayoutDistribution(this.objectId)
    ])
    if (this.recordTypesList.length === 0) {
      this.recordTypesList.push({ id: -1, name: '默认' })
    }
    this.roleList.forEach((item: any) => {
      let arr: any = []
      this.recordTypesList.forEach((item0: any) => {
        let obj: any = {}
        obj.roleId = item.id
        obj.recordTypeId = item0.id
        arr.push(obj)
      })
      this.saveArr.push(arr)
    })
  }

  async saveData () {
    let newAry: any = []
    let ary = this.saveArr.flat()
    ary.map((item: any) => {
      if (item.layoutId) {
        newAry.push(item)
      }
    })
    try {
      const { data } = await Api.bizObjects.updateLayoutDistribution(
        newAry,
        this.objectId
      )
      if (data.success) {
        this.$message.success('保存成功')
      }
    } catch (err) {}
  }

  showSelect (key: string) {
    this.$set(this.selectMaps, key, true)
    this.$nextTick(() => {
      ;(this.$refs as any)[key][0].focus()
      ;(this.$refs as any)[key][0].$el.click()
    })
  }
}
</script>

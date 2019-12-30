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
          <el-input v-model="selectMaps[item.id + '_' + scope.row.id]"
                    placeholder="请选择"
                    class="dd-click"
                    suffix-icon="el-icon-arrow-down"
                    v-if="currentKey!==item.id + '_' + scope.row.id"
                    @focus="showSelect(item.id + '_' + scope.row.id)"></el-input>
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
import { arrToMap } from '@/utils'

@Component({
  name: 'LayDistribution'
})
export default class LayDistribution extends Vue {
  saveArr: any = []
  roleList: any = []
  layoutList: any = []
  recordTypesList: any = []
  Authdata: any = []
  currentKey:string = ''
  input: any = ''

  created () {
    this.getData()
  }

  get objectId (): string {
    return this.$route.params.objectId
  }

  get layoutMaps () {
    const tempMaps:any = {}
    this.saveArr.forEach((outArr:any) => {
      outArr.forEach((innerArr:any) => {
        tempMaps[`${innerArr.recordTypeId}_${innerArr.roleId}`] = innerArr.layoutId
      })
    })
    return tempMaps
  }

  get layoutById () {
    return arrToMap(this.layoutList, 'id')
  }

  get selectMaps () {
    const tempMaps:any = {}
    this.recordTypesList.forEach((type:any) => {
      this.roleList.forEach((role:any) => {
        const key = type.id + '_' + role.id
        tempMaps[key] = (this.layoutById[this.layoutMaps[key]] || {}).name
      })
    })
    return tempMaps
  }

  set selectMaps (val:any) {}

  async getData () {
    [
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
        data: { data: this.Authdata }
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
      const arr: any = []
      this.recordTypesList.forEach((item0: any) => {
        const obj: any = {}
        obj.roleId = item.id
        obj.recordTypeId = item0.id
        obj.layoutId = null
        arr.push(obj)
      })
      this.saveArr.push(arr)
    })
    this.saveArr.forEach((item:any) => {
      item.forEach((item0:any) => {
        this.Authdata.forEach((item1:any) => {
          if (item0.roleId === item1.roleId && item0.recordTypeId === item1.recordTypeId) {
            item0.layoutId = item1.layoutId
          }
        })
      })
    })
  }

  async saveData () {
    const newAry: any = []
    const ary = this.saveArr.flat()
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
    this.currentKey = key
    this.$nextTick(() => {
      ;(this.$refs as any)[key][0].focus()
      ;(this.$refs as any)[key][0].$el.click()
    })
  }
}
</script>

<!--Created by LiuLei on 2019/10/28-->
<template>
  <div class="TheTabFollowUp">
    <div class="attrs__section">
      <div class="m-b-10">
        <strong>
          请选择要展示的跟进记录类型
        </strong>
      </div>
      <el-checkbox-group v-model="checkListOptions">
        <div
          class="m-b-10"
          v-for="item in types"
          :key="item.id">
          <el-checkbox
            :label="item.id">{{item.v}}
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div class="attrs__section m-t-30">
      <div class="m-b-10">
        <strong>请选择要展示的按钮</strong>
      </div>
    </div>
    <el-checkbox-group v-model="checkListButtons">
      <div
        class="m-b-10"
        v-for="item in standardButtons"
        :key="item.apiName">
        <el-checkbox
          :label="item.apiName">{{item.name}}
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'
import designerStore from '@/store/modules/designer'
import PredefinedButtonApiNames from '@/views/designer/config/PredefinedButtonApiNames'

@Component({
  name: 'TabFollowUpAttrs.vue'
})
export default class TheTabFollowUpAttrs extends Vue {
  @Prop({ required: true }) readonly data !: IField

  get checkListOptions () {
    return (this.data.attrs.usedOptions as any[]).map((item: any) => item.id)
  }

  set checkListOptions (val: string[]) {
    this.data.attrs.usedOptions = this.types.filter((type: any) => {
      return val.includes(type.id)
    })
  }

  get checkListButtons () {
    return (this.data.attrs.usedButtons as any[]).map((item: any) => item.apiName)
  }

  set checkListButtons (val: string[]) {
    this.data.attrs.usedButtons = this.standardButtons.filter((type: any) => {
      return val.includes(type.apiName)
    })
  }

  get standardButtons (): any[] {
    return [
      {
        apiName: PredefinedButtonApiNames.new,
        name: '新建跟进记录'
      },
      {
        apiName: PredefinedButtonApiNames.edit,
        name: '编辑'
      },
      {
        apiName: PredefinedButtonApiNames.delete,
        name: '删除'
      }
    ]
  }

  get types () {
    return designerStore.followUpTypes
  }

  async created () {
    await designerStore.getFollowUpTypes()
    // api.bizObjects.getFieldValueCandidate(
    //   PredefinedObjectApiNames.followUp,
    //   PredefinedFollowUpFieldApiNames.type
    // ).then((res: any) => {
    //   this.types = res.data.data.items
    // })
  }
}
</script>

<style lang="scss" scoped>
.TheTabFollowUp {
  .checkbox-group {
  }
}
</style>

<!--Created by LiuLei on 2019/11/5-->
<template>
  <div
    @click="handleClickContainer"
    @scroll="handleScroll"
    ref="container"
    class="approval-process">
    <!--    <div @click="test" style="position: absolute;z-index: 999999999">测试</div>-->
    <div
      v-loading="loading"
      ref="body"
      class="approval-process__body">
      <wrap-nodes :nodes="workflow"/>
      <div class="node-end__wrap">
        <div class="node-end__dot"></div>
        <div class="node-end__text">流程结束</div>
      </div>
    </div>
    <!--<el-button @click="visibleDrawer=true">
      el-drawer
    </el-button>-->
    <el-drawer
      custom-class="workflow-attr-drawer"
      title="我是标题"
      :with-header="false"
      append-to-body
      z-index="100"
      :visible.sync="visibleDrawer"
      :show-close="false"
      direction="rtl">
      <workflow-drawer
        :visible.sync="visibleDrawer"
        v-if="workflowGlobal.currentNode"
        :node="workflowGlobal.currentNode"/>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
// import mockData from '@/views/backstage/office-setting/form-management/new/components/mockData'
import FormDataStore from '../mixins/form-data-store'
import { mixins } from 'vue-class-component'
import CardApproval from '@/views/backstage/office-setting/form-management/new/components/NodeApproval.vue'
import CardCondition from '@/views/backstage/office-setting/form-management/new/components/NodeCondition.vue'
import WrapNodes from '@/views/backstage/office-setting/form-management/new/components/WrapNodes.vue'
import { ICondition, INode } from '@/views/backstage/office-setting/form-management/types'
import WorkflowDrawer from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/index.vue'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'ApprovalProcess',
  components: { WorkflowDrawer, WrapNodes, CardCondition, CardApproval },
  provide () {
    return {
      workflowGlobal: (this as any).workflowGlobal
    }
  }
})
export default class ApprovalProcess extends mixins(FormDataStore) {
  static title = '审批流设置'
  visibleDrawer: boolean = false
  loading: boolean = false
  scrollLeft: number = 0
  scrollTop: number = 0
  workflowGlobal: {
    currentNode: null | ICondition | INode,
    users: any[]
    roles: any[]
    departments: any[]
    fields: IField[]
  } = {
    currentNode: null,
    users: [],
    roles: [],
    departments: [],
    fields: []
  }

  // @Watch('fields', { immediate: true })
  // onFieldsChange (fields: IField[]) {
  //   this.workflowGlobal.fields = fields
  // }

  async created () {
    this.$bus.$on('form/management/workflow/selectNode', this.updateSelectedNode)
    this.workflowGlobal.users = this.users
    this.workflowGlobal.roles = this.roles
    this.workflowGlobal.departments = this.departments
    this.workflowGlobal.fields = this.fields
  }

  beforeDestroy () {
    this.$bus.$off('form/management/workflow/selectNode', this.updateSelectedNode)
  }

  mounted () {
    setTimeout(async () => {
      await this.initPosition()
    }, 0)
  }

  activated () {
    const container: HTMLElement = this.$refs.container as any
    container.scrollLeft = this.scrollLeft
    container.scrollTop = this.scrollTop
  }

  handleScroll (e: any) {
    const target: HTMLElement = e.target
    this.scrollTop = target.scrollTop
    this.scrollLeft = target.scrollLeft
  }

  handleClickContainer () {
    this.workflowGlobal.currentNode = null
  }

  initPosition () {
    // (this.$refs.body as any).scrollTo({
    //   top: 160,
    //   left: 100,
    //   behavior: 'smooth'
    // })
    const container: HTMLElement = this.$refs.container as any
    const body: HTMLElement = this.$refs.body as any
    // console.log(container.clientWidth)
    // console.log(body.clientWidth)
    // console.log((body.clientWidth - container.clientWidth) / 2)
    // return animateScrollTo([scrollLeft, 0], {
    //   elementToScroll: this.$refs.container as any,
    //   speed: 1
    // })

    container.scrollLeft = (body.clientWidth - container.clientWidth) / 2
    // console.log('container.scrollLeft', container.scrollLeft)
    // console.log('container.scrollTop', container.scrollTop)
  }

  updateSelectedNode (node: INode | ICondition) {
    this.workflowGlobal.currentNode = node
    this.visibleDrawer = true
  }
}
</script>
<style lang="scss">
.workflow-attr-drawer {
  .el-drawer__header {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.approval-process {
  height: 100%;
  overflow-y: auto;
  text-align: center;

  &__body {
    padding: 60px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    transform: scale(1);
    transform-origin: 50% 0 0;
    position: relative;
    overflow-x: hidden;
  }

  .node-end {
    &__wrap {

    }

    &__dot {
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: $dd-workflow-arrow;
      margin: 0 auto;
    }

    &__text {
      padding-top: 6px;
      color: $dd-workflow-arrow;
    }
  }
}
</style>

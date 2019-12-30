<!--Created by LiuLei on 2019/9/9-->
<template>
  <div class="customized-module">
    <el-card
      class="m-b-10"
      :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">标准对象模块</strong>
      </div>
      <module-table
        standard
        @edit="editModule"
        :data="standardModules"/>
    </el-card>
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">自定义对象模块</strong>
          <el-button @click="newModule" type="primary" size="small">新建</el-button>
        </div>
      </div>
      <module-table
        @delete="deleteModule"
        @edit="editModule"
        :data="customizedModules"/>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ModuleTable from '@/views/backstage/customized/module/components/ModuleTable.vue'
import { IDD } from '@/types/common'

@Component({
  name: 'CustomizedModule',
  components: { ModuleTable }
})
export default class CustomizedModule extends Vue {
  get modules () {
    return this.$store.state.backstage.customized.modules
  }

  get standardModules (): IDD.ISModule[] {
    return this.modules.filter((module: IDD.ISModule) => module.standard)
  }

  get customizedModules (): IDD.ISModule[] {
    return this.modules.filter((module: IDD.ISModule) => !module.standard)
  }

  get rules () {
    return {
      objectId: [
        {
          required: true,
          message: '请选择对象',
          trigger: 'change'
        }
      ],
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ]
    }
  }

  async created () {
    await this.$store.dispatch('backstage/customized/getModules')
  }

  async deleteModule (module: IDD.ISModule) {
    await this.$store.dispatch('backstage/customized/deleteModule', module.id)
  }

  newModule () {
    this.$router.push(`${this.$route.path}/new`)
  }

  editModule (module: IDD.ISModule) {
    this.$router.push({
      path: `${this.$route.path}/${module.id}/edit`,
      query: {
        module: encodeURIComponent(JSON.stringify({
          id: module.id,
          name: module.name,
          bizObjectId: module.bizObjectId,
          type: module.type,
          description: module.description,
          iconUrl: module.iconUrl
        }))
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.customized-module {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

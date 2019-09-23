<!--Created by LiuLei on 2019/9/9-->
<template>
  <div class="customized-menu">
    <el-card
      class="m-b-10"
      :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">标准对象菜单</strong>
      </div>
      <menu-table :data="standardMenus"/>
    </el-card>
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">自定义对象菜单</strong>
          <el-button type="primary" size="small">新建</el-button>
        </div>
      </div>
      <menu-table :data="customizedMenus"/>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MenuTable from '@/views/backstage/customized/menu/components/MenuTable.vue'

@Component({
  name: 'CustomizedMenu',
  components: { MenuTable }
})
export default class CustomizedMenu extends Vue {
  private standardMenus = [
    {
      name: '菜单1',
      object: '对象1',
      icon: '图标1',
      remark: '备注1',
      operation: '操作1'
    },
    {
      name: '菜单2',
      object: '对象2',
      icon: '图标2',
      remark: '备注2',
      operation: '操作2'
    },
    {
      name: '菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    }
  ]
  private customizedMenus = [
    {
      name: '自定义菜单1',
      object: '对象1',
      icon: '图标1',
      remark: '备注1',
      operation: '操作1'
    },
    {
      name: '自定义菜单2',
      object: '对象2',
      icon: '图标2',
      remark: '备注2',
      operation: '操作2'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '自定义菜单3',
      object: '对象3',
      icon: '图标3',
      remark: '备注3',
      operation: '操作3'
    }
  ]
}
</script>

<style lang="scss" scoped>
.customized-menu{
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

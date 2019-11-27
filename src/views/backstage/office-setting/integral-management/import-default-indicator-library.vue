<template>
  <div>
    <el-card
      style="min-height: calc(100vh - 70px); padding: 20px;"
      class="m-b-10"
      :body-style="{padding:0}">
      <div v-if="true">
        <div class="m-t-20">
          <strong class="fs-16">导入默认指标库</strong>
        </div>
        <!-- 树和表格 -->
        <div class="body m-t-20">
          <div class="body_left">
            <el-tree
              :default-expand-all="true"
              :data="treeData"
              show-checkbox
              node-key="id"
              :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span class="icon">
                  <dd-icon @click.native="editNode(data, node)" class="iconfont m-l-30 m-r-10" name="edit"/>
                  <dd-icon @click.native="deleteNode(data, node)" class="iconfont m-l-10 m-r-10" name="delete"/>
                  <dd-icon @click.native="creatNode(data, node)" class="iconfont m-l-10 m-r-10" name="Addto"/>
                  <dd-icon @click.native="downNode(data, node)" class="iconfont m-l-10 m-r-10" name="down"/>
                  <dd-icon @click.native="upNode(data, node)" class="iconfont m-l-10 m-r-10" name="up"/>
                </span>
              </span>
            </el-tree>
          </div>
          <div class="body_right">
            <div class="m-b-20" style="float:right">
              <el-input
                style="width:300px"
                placeholder="搜索...">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <el-table
              ref="multipleTable"
              :header-cell-style="{background:'#F8FAFC'}"
              :data="tableData"
              border
              tooltip-effect="dark"
              class="table"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                width="200"
                label="积分类型">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="dataSource"
                width="200"
                label="规则类别">
              </el-table-column>
              <el-table-column
                prop="description"
                width="200"
                label="规则描述">
              </el-table-column>
              <el-table-column
                prop="frequencyType"
                width="200"
                label="给分频率">
              </el-table-column>
              <el-table-column
                prop="address"
                fixed="right"
                width="250"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-button type="primary" class="m-t-30">保存</el-button>
              <el-button @click="()=>{$router.go(-1)}" type="primary" class="m-t-30 m-l-20">返回</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  flag:boolean = false
  treeData:any = [{
    'id': 111,
    'name': '公司',
    'type': 'Company',
    'parentId': -1,
    'creator': 123,
    'seq': 98,
    'createdTime': '2019-10-22T18:04:42Z',
    'lastModifier': 123,
    'lastModifiedTime': '2019-10-24T06:28:45Z',
    'children': [ {
      'id': 6592349401824497664,
      'name': '财务部',
      'type': 'Department',
      'parentId': 111,
      'creator': 1,
      'seq': 100,
      'createdTime': '2019-10-22T10:02:57Z',
      'lastModifier': 123,
      'lastModifiedTime': '2019-10-31T09:13:22Z',
      'children': [ {
        'id': 659234940182449765,
        'name': '外贸部',
        'type': 'Department',
        'parentId': 6592349401824497664,
        'creator': 123,
        'seq': 99,
        'createdTime': '2019-10-23T13:17:48Z',
        'lastModifier': 123,
        'lastModifiedTime': '2019-10-24T06:52:16Z',
        'children': [ {
          'id': 6593017068990369792,
          'name': '咋说的',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 91,
          'createdTime': '2019-10-24T06:16:02Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-10-28T06:06:32Z',
          'children': null
        }, {
          'id': 6593017146199117824,
          'name': '小心点是否',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 93,
          'createdTime': '2019-10-24T06:16:20Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-10-30T02:07:37Z',
          'children': null
        }, {
          'id': 6593080935179227136,
          'name': '撒打发斯蒂芬',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 94,
          'createdTime': '2019-10-24T10:29:48Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-10-30T02:07:37Z',
          'children': null
        }, {
          'id': 6593081194630483968,
          'name': '阿萨德大所多',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 95,
          'createdTime': '2019-10-24T10:30:50Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-10-31T09:11:36Z',
          'children': null
        }, {
          'id': 6593080918083244032,
          'name': '撒打发斯蒂芬',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 96,
          'createdTime': '2019-10-24T10:29:44Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-11-01T10:15:21Z',
          'children': null
        }, {
          'id': 6593081088191631360,
          'name': '阿萨德',
          'type': 'Department',
          'parentId': 659234940182449765,
          'creator': 123,
          'seq': 97,
          'createdTime': '2019-10-24T10:30:25Z',
          'lastModifier': 123,
          'lastModifiedTime': '2019-11-01T10:15:21Z',
          'children': null
        } ]
      } ]
    }, {
      'id': 6593026286053101568,
      'name': '了开讲啦首付款',
      'type': 'Department',
      'parentId': 111,
      'creator': 123,
      'seq': 101,
      'createdTime': '2019-10-24T06:52:39Z',
      'lastModifier': 123,
      'lastModifiedTime': '2019-10-31T09:13:22Z',
      'children': null
    } ]
  }]
  chaneseArr:any = ['一', '二', '三', '四', '五', '六']
  levelList:any = []
  tableData:any = [
  ]
  multipleSelection:any = []
  handleSelectionChange (val:any) {
    this.multipleSelection = val
    console.log(this.multipleSelection)
  }
  showMore () {
    this.flag = !this.flag
  }
  goToImportDefault () {
    this.$router.push({
      path: this.$route.path + '/importDefaultIndicatorLibrary'
    })
  }
  rederButton (h:any, { column }:any) {
    return this.flag ? h('span', [h('span', column.label), h('el-tag', { style: 'float:right', on: { click: this.showMore } }, '收起')]) : h('span', [h('span', column.label), h('el-tag', { style: 'float:right', on: { click: this.showMore } }, '展开')])
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header{
  border: 0 !important;
}
.nav {
  display: flex;
  justify-content: space-between;
}
.body {
  display: flex;
  &_left{
    width: 20%;
    overflow: auto !important;
    min-height: calc(100vh - 170px);
  }
  &_right{
    width: 80%;
  }
}
.custom-tree-node {
 .icon {
   opacity: 0;
 }
}
/deep/ .el-tree-node__content:hover {
  .icon {
    opacity: 1;
  }
}
.iconfont:hover {
  color: $dd--primary-color;
  transform:scale(1.4);
}
/deep/.el-tree>.el-tree-node{
    min-width:100%;
    display: inline-block;
}
</style>

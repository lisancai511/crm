<template>
  <div>
    <el-card style="min-height: calc(100vh - 70px); padding: 20px;"
             class="m-b-10"
             :body-style="{padding:0}">
      <div class="m-t-20">
        <strong class="fs-16">从行业库添加指标</strong>
      </div>
      <div>
        <div class="m-t-30 m-b-10">请选择所属行业</div>
        <el-select style="width: 260px" v-model="value" @change="chooseIndustry" placeholder="请选择">
          <el-option
            v-for="item in industryList"
            :key="item.value"
            :label="item.industryName"
            :value="item.id">
          </el-option>
        </el-select>
        <div class="m-t-20">
          <div>
            行业细分：{{actuveIndustry}} <el-button @click="dialogVisible = true" type="text">修改</el-button>
          </div>
          <div>
            <el-table
              :data="data"
              :header-cell-style="{background:'#F8FAFC'}"
              row-key="id"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="m-t-30">
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="()=>{$router.go(-1)}">返回</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="请选择行业细分"
      :visible.sync="dialogVisible">
       <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="行业"
          width="180">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.id">{{null}}</el-radio>
            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="规则说明"
          width="400">
        </el-table-column>
        <el-table-column
          prop="address"
          label="被引用次">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  actuveIndustry:string = '房产中介'
  radio:any = 2
  dialogVisible:boolean = false
  industryList:any = [{
    'id': 1,
    'industryId': 2,
    'industryName': '培训业',
    'description': '包括***等指标，适用于餐饮企业',
    'refrenceCount': 50
  }, {
    'id': 1,
    'industryId': 2,
    'industryName': '教育业',
    'description': '包括***等指标，适用于餐饮企业',
    'refrenceCount': 110
  }]
  value:any = ''
  tableData:any = [{
    date: '2016-05-02',
    name: '王小虎',
    id: 1,
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    id: 2,
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    id: 3,
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    id: 4,
    address: '上海市普陀区金沙江路 1516 弄'
  }]
  data:any = [
    {
      'id': 1,
      'name': '临时积分',
      'children': [{
        'id': 8,
        'name': '行为指标',
        'children': [{
          'id': 9,
          'name': '餐具',
          'children': []
        }
        ]
      }]
    },
    {
      'id': 2,
      'name': '固定积分',
      'children': [{
        'id': 234234234,
        'name': '固定指标'
      }]
    }
  ]
  multipleSelection:any = []
  handleSelectionChange (val:any) {
    this.multipleSelection = val
    console.log(this.multipleSelection)
  }
  chooseIndustry () {
    // 拿到选择过的数据
    this.dialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: 0 !important;
}
// /deep/.el-table__indent {
//   padding: 0 !important;
// }
</style>

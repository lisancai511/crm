<template>
  <div class="form-management">
    <el-card style="min-height: calc(100vh - 70px);"
             :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">考勤统计
        </strong>
        <div @click="dialogVisible = true"
             class="title fr"
             type="text">
          <dd-icon name="setting" />
          <span> 展示列</span>
        </div>
        <div class="block m-t-20">
          <el-date-picker style="width:350px;"
                          size="small"
                          v-model="value1"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
          <el-checkbox class="m-l-10"
                       v-model="checked">离职员工<span>(保留三个月)</span></el-checkbox>
          <div class="fr">
            <span class="m-r-10">部门/人员/角色</span>
            <el-select size="small"
                       @focus="dialogVisible1=true"
                       v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in 1"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="m-b-30">
        <el-table :header-cell-style="{background:'#F8FAFC'}"
                  class="dd-table--card"
                  :data="data">
          <el-table-column prop="name"
                           label="加班规则名称"></el-table-column>
          <el-table-column prop="label"
                           label="加班规则名称"></el-table-column>
        </el-table>
      </div>
      <div class="block m-t-20">
        <el-pagination style="float:right"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage2"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="10"
                       layout="sizes, prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible"
               width="620px">
      <div class="p-t-20 p-l-20">
        <strong>请选择要展示的列</strong>
        <div class="m-t-10">
          <el-checkbox class="m-b-15"
                       :indeterminate="isIndeterminate"
                       v-model="checkAll"
                       @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities"
                             @change="handleCheckedCitiesChange">
            <el-row>
              <el-col style="overflow:hidden" v-for="item in showLine" :key="item.value" :span="8">
                <el-checkbox class="m-b-10"
                         :label="item.value">{{item.label}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible1"
               width="600px">
      <ChoosePeople mode='orguser'
                    @cancel='cancel'
                    :peopleIdList="filter.userIds"
                    :roleIdList="filter.roleIds"
                    :orgIdList="filter.orgIds"
                    @chooseDone="chooseDone"></ChoosePeople>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'

@Component({
  name: 'FormManagement',
  filters: {},
  components: {
    ChoosePeople
  }
})
export default class FormManagement extends Vue {
  filter: any = {
    pageSize: 10,
    pageNo: 1
  }

  checked: boolean = false

  value: any = null

  data: any = [
    {
      name: '123',
      label: '123'
    },
    {
      name: '123',
      label: '123'
    }
  ]

  checkAll: any = false
  checkedCities: any = [1, 2]
  isIndeterminate: any = true

  total: number = 10

  currentPage2: any = 1

  value1: any = ''

  dialogVisible: boolean = false
  dialogVisible1: boolean = false

  showLine: any = [
    {
      label: '职位',
      value: 1
    },
    {
      label: '出勤天数',
      value: 2
    },
    {
      label: '出勤班次',
      value: 3
    },
    {
      label: '休息天数',
      value: 4
    },
    {
      label: '工作时长',
      value: 5
    },
    {
      label: '迟到次数',
      value: 6
    },
    {
      label: '迟到时长',
      value: 7
    },
    {
      label: '严重迟到次数',
      value: 8
    },
    {
      label: '严重迟到时长',
      value: 9
    },
    {
      label: '旷工迟到天数',
      value: 10
    },
    {
      label: '早退次数',
      value: 11
    },
    {
      label: '早退时长',
      value: 12
    },
    {
      label: '上班缺卡次数',
      value: 13
    },
    {
      label: '下班缺卡次数',
      value: 14
    },
    {
      label: '旷工天数',
      value: 15
    },
    {
      label: '加班时长-按加班规则计算',
      value: 16
    },
    {
      label: '加班总时长',
      value: 17
    },
    {
      label: '加班时长（转加班费）',
      value: 18
    },
    {
      label: '加班时长（转调休）',
      value: 19
    }
  ]

  cities: any = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19
  ]

  created () {
    // this.getData()
  }

  cancel () {
    this.dialogVisible1 = false
  }

  chooseDone (val: any) {
    if (val.value) {
      this.filter.userIds = val.peopleIdList
      this.filter.orgIds = val.orgIdList
      this.filter.roleIds = val.roleIdList
      this.getData()
    }
    this.dialogVisible = false
  }

  handleCheckAllChange (val: any) {
    this.checkedCities = val ? this.cities : []
    this.isIndeterminate = false
  }

  handleCheckedCitiesChange (value: any) {
    const checkedCount = value.length
    this.checkAll = checkedCount === this.cities.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
    this.getData()
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
    this.getData()
  }

  async getData () {
    const data = await Api.jiliOa.getShiftsList(this.filter)
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0 !important;
}
/deep/.el-card__header {
  border: none;
}
.title {
  color: $dd--info-color;
  cursor: pointer;
}
</style>

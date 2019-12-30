<template>
  <div>
    <el-card style="min-height: calc(100vh - 70px); padding: 20px;"
             class="m-b-10"
             :body-style="{padding:0}">
      <div>
        <strong class="fs-16">基础分管理</strong>
      </div>
      <div class="main m-t-20 m-b-20">
        <div>
          <el-button size="small"
                     @click="handleClick()"
                     type="primary">批量设置</el-button>
        </div>

        <div>
          <div>
            <span class="m-r-10">部门/人员/角色</span>
            <el-select size="small"
                       @focus="dialogVisible=true"
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

      <el-table ref="multipleTable"
                :header-cell-style="{background:'#F8FAFC'}"
                :data="data"
                border
                class="table"
                @selection-change="handleSelectionChange"
                tooltip-effect="dark">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="userName"
                         width="200"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="baseScore"
                         width="100"
                         label="分数">
        </el-table-column>
        <el-table-column width="150"
                         label="给分频率">
          <template slot-scope="scope">
            <span>{{scope.row.frequencyType | scoreFrequency}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag class="m-r-5"
                    size="mini"
                    v-for="(item, index) in scope.row.roleNames"
                    :key="item+'_'+ index">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="150"
                         label="部门">
          <template slot-scope="scope">
            <el-tag class="m-r-5"
                    size="mini"
                    v-for="item in scope.row.orgNames"
                    :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastModifiedTime"
                         label="设置时间">
        </el-table-column>
        <el-table-column prop="address"
                         width="200"
                         label="操作">
          <template slot-scope="scope">
            <span class="dd-click"
                  @click="handleClick(scope.row)">
              <dd-icon class="m-r-5"
                       name="edit"></dd-icon>{{scope.row.baseScore?'编辑':'去设置'}}
            </span>
          </template>
        </el-table-column>
      </el-table>
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
               width="600px">
      <ChoosePeople mode='orguser'
                    @cancel='cancel'
                    :peopleIdList="filter.userIds"
                    :roleIdList="filter.roleIds"
                    :orgIdList="filter.orgIds"
                    @chooseDone="chooseDone"></ChoosePeople>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibles"
               class="m-l-20"
               width="30%">
      <el-form class="m-l-20 m-r-20"
               label-position="top"
               label-width="80px"
               :model="formLabelAlign">
        <el-form-item class="p-t-20"
                      label="分数">
          <el-input-number size="small"
                           :min="1"
                           :max="1000"
                           v-model="formLabelAlign.score"></el-input-number>
        </el-form-item>
        <el-form-item label="给分频率">
          <el-select size="small"
                     style="width:100%"
                     v-model="formLabelAlign.frequencyType"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisibles = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'
import lodash from 'lodash'

@Component({
  name: 'CustomizedApplication',
  components: {
    ChoosePeople
  },
  filters: {
    scoreFrequency (val: any) {
      switch (val) {
        case 'OnceOnly':
          return '同一人仅给一次分'
        case 'OncePerMonth':
          return '每月给一次分'
        case 'OncePerYear':
          return '每年给一次分'
      }
    }
  }
})
export default class CustomizedApplication extends Vue {
  filter: any = {
    pageNo: 1,
    pageSize: 10,
    userIds: [],
    orgIds: [],
    roleIds: []
  }

  total: number = 10

  currentPage2: any = 1

  multipleSelection: any = []

  isSingle: boolean = false

  options: any = [
    {
      label: '同一人仅给一次分',
      value: 'OnceOnly'
    },
    {
      label: '每月给一次分',
      value: 'OncePerMonth'
    },
    {
      label: '每年给一次分',
      value: 'OncePerYear'
    }
  ]

  formLabelAlign: any = {
    frequencyType: 'OnceOnly',
    score: 1
  }

  value: any = null
  dialogVisible: any = false
  dialogVisibles: any = false
  data: any = []
  created () {
    this.getData()
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
    this.getData()
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
    this.getData()
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

  cancel () {
    this.dialogVisible = false
  }

  handleClick (row: any) {
    if (row) {
      this.formLabelAlign.score = row.baseScore
      this.formLabelAlign.frequencyType = row.frequencyType
      this.isSingle = row.userId
    } else {
      this.formLabelAlign.score = 1
      this.formLabelAlign.frequencyType = 'OnceOnly'
      this.isSingle = false
    }
    this.dialogVisibles = true
  }

  handleSelectionChange (val: any) {
    this.multipleSelection = val
  }

  async saveData () {
    if (this.isSingle) {
      this.formLabelAlign.userId = this.isSingle
      await Api.jiliScore.addUserScore(this.formLabelAlign)
    } else {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择要批量设置的用户')
        return
      }
      this.formLabelAlign.userIds = this.multipleSelection.map((item: any) => {
        return item.userId
      })
      await Api.jiliScore.addUsersScore(this.formLabelAlign)
    }
    this.formLabelAlign.frequencyType = 'OnceOnly'
    this.formLabelAlign.score = 1
    this.$message.success('修改成功')
    this.dialogVisibles = false
    this.getData()
  }

  async getData () {
    const params = lodash.cloneDeep(this.filter)
    const {
      data: { data }
    } = await Api.jiliScore.getUserScore(params)
    this.data = data.content
    this.total = data.total
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: 0 !important;
}
.main {
  display: flex;
  justify-content: space-between;
  &_right {
    display: flex;
  }
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0 !important;
}
/deep/ .el-table th.gutter {
  display: table-cell !important;
}
/deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>

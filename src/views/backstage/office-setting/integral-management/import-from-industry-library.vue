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
        <el-select style="width: 260px"
                   v-model="industryId"
                   @change="chooseIndustry(industryId)"
                   placeholder="请选择">
          <el-option v-for="item in industryList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <div v-if="this.actuveIndustry"
             class="m-t-20">
          <div>
            行业细分：{{actuveIndustry}}
            <el-button class="dd-button__text dd-button__text--info"
                       @click="dialogVisible = true"
                       type="text">修改
            </el-button>
          </div>
          <div v-if="scoreData.length>0">
            <el-table ref="table"
                      :header-cell-style="{background:'#F8FAFC'}"
                      :data="scoreData"
                      border
                      tooltip-effect="dark"
                      class="table"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               width="50">
              </el-table-column>
              <el-table-column prop="name"
                               width="100"
                               label="指标名称">
              </el-table-column>
              <el-table-column label="积分类型">
                <template slot-scope="scope">
                  {{renderType(scope.row)}}
                </template>
              </el-table-column>
              <el-table-column prop="description"
                               label="规则描述">
              </el-table-column>
              <el-table-column width="100"
                               prop="lastModifierName"
                               label="修改人">
              </el-table-column>
              <el-table-column width="180"
                               prop="lastModifiedTime"
                               label="最后修改时间">
              </el-table-column>
              <el-table-column width="100"
                               prop="address"
                               label="操作">
                <template>
                  <span>查看</span>
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
          </div>
        </div>
        <div class="m-t-30">
          <el-button @click="saveData"
                     type="primary">保存</el-button>
          <el-button type="primary"
                     @click="()=>{$router.go(-1)}">返回</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog title="请选择行业细分"
               :visible.sync="dialogVisible">
      <el-table border
                :data="tableData"
                style="width: 100%">
        <el-table-column prop="date"
                         label="行业"
                         width="180">
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      :label="scope.row.id">{{scope.row.industryName}}</el-radio>
            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description"
                         label="规则说明"
                         width="400">
        </el-table-column>
        <el-table-column prop="refrenceCount"
                         label="被引用次">
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="chooseRadio">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  filter: any = {
    pageSize: 10,
    pageNo: 1
  }

  total: number = 10
  currentPage2: any = 1
  actuveIndustry: any = null
  radio: any = null
  dialogVisible: boolean = false
  industryList: any = []
  industryId: any = ''
  tableData: any = []
  scoreData: any = []
  saveScoreData: any = {
    scoreMeasurePackId: null,
    scoreMeasureIds: []
  }

  mounted () {
    this.getData()
  }

  async chooseRadio () {
    this.dialogVisible = false
    this.saveScoreData.scoreMeasurePackId = this.radio
    const res = await Api.jiliScore.getScoreMeasures(this.radio, this.filter)
    this.scoreData = res.data.data
    this.radio = null
  }

  handleSelectionChange (val: any) {
    this.saveScoreData.scoreMeasureIds = val.map((item: any) => {
      return item.id
    })
  }

  async saveData () {
    if (this.saveScoreData.scoreMeasureIds.length > 0) {
      await Api.jiliScore.addScoreMeasures(this.saveScoreData)
      this.$message.success('添加成功')
      this.$router.push('/backstage/office-setting/integral-management/point-index-management')
    } else {
      this.$message.error('请先选择要导入的积分库')
    }
  }

  renderType (row: any) {
    let str = ''
    if (row.level1 && row.level1.name) {
      str += row.level1.name
    }
    if (row.level2 && row.level2.name) {
      str += '>' + row.level2.name
    }
    if (row.level3 && row.level3.name) {
      str += '>' + row.level3.name
    }
    if (row.level4 && row.level4.name) {
      str += '>' + row.level4.name
    }
    if (row.level5 && row.level5.name) {
      str += '>' + row.level5.name
    }
    return str
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
  }

  async chooseIndustry (val: any) {
    // 拿到选择过的数据
    this.industryList.forEach((item: any) => {
      if (item.id === val) {
        this.actuveIndustry = item.name
      }
    })
    const res = await Api.jiliScore.getIndustriesMeasures(val)
    this.tableData = res.data.data
    this.$nextTick(() => {
      this.dialogVisible = true
    })
  }

  async getData () {
    const {
      data: { data }
    } = await Api.jiliScore.getIndustries()
    this.industryList = data
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__header {
  border: 0 !important;
}

// /deep/.el-table__indent {
//   padding: 0 !important;
// }
</style>

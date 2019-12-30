<template>
  <div>
    <h3 class="m-l-20 p-t-20 p-b-10">新建依赖</h3>
    <div class="depend">
      <div class="depend_left">
        <div class="m-l-20 m-t-20 depend_title">控制字段</div>
        <div @click='changeActive(item.id, index)'
             v-for="(item, index) in leftData.items"
             :key="item.id"
             :class="index===active?'p-l-20 depend_left_content dd-click active':'p-l-20 depend_left_content dd-click'">
          {{item.v}}
        </div>
      </div>
      <div class="depend_right">
        <div class="m-l-20 m-t-20 depend_title">依赖字段</div>
        <div class="p-l-20 p-t-20 depend_right_content">
          <el-checkbox-group style="display:flex; flex-direction:column" @change="handleCheckedCitiesChange"
                             v-model="checkedCities">
            <el-checkbox v-for="item in rightData.items" :key="item.id" :label="item.id" class="m-b-10">{{item.v}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button class="m-l-20 m-t-20" @click="saveData" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'FieldDependenceEdit'
})

export default class FieldDependenceEdit extends Vue {
  private newData: any = {
    dependencyFields: [],
    dependencyItems: []
  }

  private dependencyItems: any = []
  private checked: any = []
  private leftData: any = []
  private rightData: any = []
  private active: any = 0
  private activeId: any = ''
  private checkedCities: any = []
  @Prop() private controlId: any
  @Prop() private dependenceId: any
  @Prop({ required: true }) readonly objectId !: string
  @Prop({ required: true }) readonly fieldDependenceId !: string

  created () {
    if (this.fieldDependenceId) {
      this.getDepend()
    } else {
      this.newData.dependencyFields[0] = this.controlId
      this.newData.dependencyFields[1] = this.dependenceId
      this.getLeftData()
      this.getRightData()
    }
  }

  async getLeftData () {
    const { data: { data } } = await Api.bizObjects.getFieldValueCandidate(this.objectId, this.controlId)
    data.items.forEach((item: any, index: any) => {
      if (!index) {
        this.activeId = item.id
      }
      const id = item.id
      this.newData.dependencyItems.push({ [id]: [] })
    })
    this.newData.dependencyItems.forEach((item: any, index: any) => {
      const arr = Object.keys(item)
      this.dependencyItems.forEach((item0: any) => {
        const newArr = Object.keys(item0)
        if (arr[0] === newArr[0]) {
          this.newData.dependencyItems[index] = item0
        }
      })
    })
    const ary = Object.keys(this.newData.dependencyItems[0])
    this.changeActive(ary[0], 0)
    this.leftData = data
  }

  async getRightData () {
    const { data: { data } } = await Api.bizObjects.getFieldValueCandidate(this.objectId, this.dependenceId)
    this.rightData = data
  }

  async getDepend () {
    const data = await Api.bizObjects.getFieldDependence(this.objectId, this.fieldDependenceId)
    this.newData.dependencyFields[0] = this.controlId
    this.newData.dependencyFields[1] = this.dependenceId
    this.getLeftData()
    this.getRightData()
    this.dependencyItems = data.data.data.dependencyItems
  }

  handleCheckedCitiesChange (value: any) {
    this.newData.dependencyItems[this.active][this.activeId] = value
  }

  changeActive (val: any, index: any) {
    this.active = index
    this.activeId = val
    this.checkedCities = this.newData.dependencyItems[index] ? this.newData.dependencyItems[index][val] : []
  }

  async saveData () {
    if (this.fieldDependenceId) {
      await Api.bizObjects.updateFieldDependence(this.objectId, this.fieldDependenceId, this.newData)
    } else {
      await Api.bizObjects.addFieldDependence(this.objectId, this.newData)
    }
    this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  height: 75px;
  line-height: 75px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid rgba(241, 242, 246, 1);
}

.depend {
  width: 100%;
  height: 100%;
  display: flex;

  &_left {
    width: 216px;
    height: 100%;
    border-right: 1px solid #F1F2F6;

    &_content {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }
  }

  &_right {
    width: 100%;
    min-height: calc(100vh - 150px);
    background: #F1F2F6;
    overflow-y: auto;

    &_content {
      display: flex;
      flex-direction: column;
    }
  }

  &_title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .active {
    background: #E8F1FF;
    border-left: 2px solid #1E88FE;
    color: $dd--primary-color;
  }
}
</style>

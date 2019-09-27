<template>
  <div>
    <h3 class="m-l-20 p-t-20 p-b-10">新建依赖</h3>
    <div class="depend">
       <div class="depend_left">
         <div class="m-l-20 m-t-20 depend_title">控制字段</div>
         <div @click='changeActive(item.id, index)' v-for="(item, index) in leftData.items" :key="item.id" :class="index===active?'p-l-20 depend_left_content dd-click active':'p-l-20 depend_left_content dd-click'">{{item.v}}</div>
       </div>
       <div class="depend_right">
         <div class="m-l-20 m-t-20 depend_title">依赖字段</div>
         <div class="p-l-20 p-t-20 depend_right_content">
            <el-checkbox-group style="display:flex; flex-direction:column" @change="handleCheckedCitiesChange" v-model="checkedCities">
                <el-checkbox v-for="item in rightData.items" :key="item.id" :label="item.id" class="m-b-10">{{item.v}}</el-checkbox>
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
  name: 'NewField'
})

export default class NewField extends Vue {
  private data:any = {
    dependencyFields: [],
    dependencyItems: []
  }
  private checked:any = []
  private leftData:any = []
  private rightData:any = []
  private active:any = 0
  private activeId:any = ''
  private checkedCities:any = []
  @Prop() private IdOne:any
  @Prop() private IdTwo:any
  mounted () {
    this.data.dependencyFields[0] = this.IdOne
    this.data.dependencyFields[1] = this.IdTwo
    this.getLeftData()
    this.getRightData()
  }
  async getLeftData () {
    const { data } = await Api.bizObjects.getObjDepend(this.$route.query.id, this.IdOne)
    data.items.forEach((item:any, index:any) => {
      if (!index) {
        this.activeId = item.id
      }
      let id = item.id
      this.data.dependencyItems.push({ [id]: [] })
    })
    this.leftData = data
  }
  async getRightData () {
    const { data } = await Api.bizObjects.getObjDepend(this.$route.query.id, this.IdTwo)
    this.rightData = data
  }
  handleCheckedCitiesChange (value:any) {
    this.data.dependencyItems[this.active][this.activeId] = value
  }
  changeActive (val:any, index:any) {
    this.active = index
    this.activeId = val
    this.checkedCities = this.data.dependencyItems[index][val]
  }
  async saveData () {
    await Api.bizObjects.addDepend(this.$route.query.id, this.data)
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
  border-bottom: 1px solid rgba(241,242,246,1);
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
    min-height: 770px;
    background: #F1F2F6;
    overflow-y: auto;
    &_content {
      display: flex;
      flex-direction: column;
    }
  }
  &_title {
    font-size:16px;
    font-weight:600;
    margin-bottom: 6px;
  }
  .active {
    background: #E8F1FF;
    border-left: 2px solid #1E88FE;
    color:#3A85FF;
  }
}
</style>

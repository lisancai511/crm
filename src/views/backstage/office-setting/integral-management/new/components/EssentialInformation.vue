<template>
  <div class="EssentialInformation">
    <el-card class="main">
      <el-row>
        <el-col>
          <div class="m-b-10 title">指标名称</div>
          <el-input @change="saveData"
                    :required="true"
                    size="medium"
                    v-model="dataFirst.name"
                    placeholder="请输入内容"></el-input>
        </el-col>
        <el-col>
          <div class="m-t-20 m-b-10 title">上级指标</div>
          <el-cascader @change="handleChange"
                       :options="options"
                       style="width:100%;"
                       v-model="dataFirst.superiorLevelId"
                       :props="{ checkStrictly: true, label: 'name', value: 'id' }"
                       clearable></el-cascader>
        </el-col>
        <el-col>
          <div class="m-t-20 m-b-10 title">指标描述</div>
          <el-input @change="saveData"
                    type="textarea"
                    :rows="4"
                    size="medium"
                    v-model="dataFirst.description"
                    placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  static title = '基本信息'
  input: any = ''
  options: any = []
  @Prop() private data: any
  dataFirst: any = {
    name: '',
    superiorLevelId: '',
    description: ''
  }

  async mounted () {
    await this.getData()
    this.dataFirst.name = this.data.name
    this.dataFirst.superiorLevelId = this.data.superiorLevelId || []
    this.dataFirst.description = this.data.description
  }

  async getData () {
    const newData = await Api.jiliScore.getDataScoreTree()
    this.options = newData.data.data
    this.deleteEmptyChildren(this.options)
  }

  saveData () {
    this.$emit('choose', this.dataFirst)
  }

  beforeDestroy () {
    this.$emit('choose', this.dataFirst)
  }

  handleChange (val: any) {
    const arr = this.options.map((item: any) => {
      return item.id
    })
    arr.indexOf(val[val.length - 1]) > -1
      ? (this.data.type = 1)
      : (this.data.type = 2)
    this.$emit('choose', this.dataFirst)
  }

  deleteEmptyChildren (arr: any) {
    arr.forEach((item: any) => {
      item.children = item.children.filter((item: any) => {
        return !item.measure
      })
      if (item.children && item.children.length > 0) {
        this.deleteEmptyChildren(item.children)
      } else {
        item.children = null
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.EssentialInformation {
  width: 100%;
  display: flex;
  min-height: 650px;
  justify-content: center;
  .main {
    width: 600px;
    min-height: 400px;
    margin-top: 20px;
    padding: 10px;
    padding-bottom: 60px;
    .title {
      font-weight: bold;
    }
  }
}
.select {
  display: block;
  cursor: pointer;
  color: #ccc;
  width: 100%;
  height: 40px;
  line-height: 50px;
  text-align: center;
}
.select:hover {
  color: $dd--primary-color;
}
.selectIcon {
  font-size: 18px;
  padding: 2px;
  height: 20px;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}
.selectIcon:hover {
  border: 1px solid $dd--primary-color;
  color: $dd--primary-color;
}
</style>

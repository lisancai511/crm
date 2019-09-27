<template>
  <div>
    <el-card :body-style="{padding: 0, minHeight: '770px', position: 'relative'}">
      <div @click="$router.go(-1)" class="close m-r-20"><dd-icon name="close"/></div>
      <div v-if="toNext">
          <h3 style="margin:30px 0 30px 20px">新建字段依赖</h3>
          <el-form style="margin-left:20px;" label-position="top" label-width="200px">
            <el-form-item label="控制字段">
              <el-select v-model="value1" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in data"
                  :key="index"
                  :label="item.name"
                  :disabled="item.id===value2"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="依赖字段">
              <el-select v-model="value2" @change="filterData" clearable placeholder="请选择">
                <el-option
                  v-for="item in data"
                  :key="item.id"
                  :label="item.name"
                  :disabled="item.id===value1"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button @click="goToNext" type="primary" style="margin-top:20px">下一步</el-button>
          </el-form>
      </div>
      <NewDependEdit :IdOne="value1" :IdTwo="value2" v-else></NewDependEdit>
    </el-card>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import NewDependEdit from './newDependEdit.vue'
@Component({
  name: 'NewField',
  components: {
    NewDependEdit
  }
})

export default class NewField extends Vue {
  private data:any = []
  private value1:any = ''
  private value2:any = ''
  private toNext:boolean = true
  private created () {
    this.getData()
  }
  async getData () {
    const { data } = await Api.bizObjects.getFields(this.$route.query.id as string)
    this.data = data
  }
  goToNext () {
    if (this.value1 && this.value2) { this.toNext = !this.toNext } else {
      this.$message('请完善依赖信息')
    }
  }
  filterData (val:any) {
    this.data.map((item:any) => {
      if (item.id === val) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  margin-top: 20px;
  border-top: 1px solid #F1F2F6;
}
.el-select {
  width: 400px;
}
.close {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
</style>

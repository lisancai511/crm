<template>
  <div>
    <el-card :body-style="{padding: 0, minHeight: '770px', position: 'relative'}">
      <div @click="$router.go(-1)" class="close m-r-20">
        <dd-icon name="close"/>
      </div>
      <div v-if="toNext">
        <h3 style="margin:30px 0 30px 20px">新建字段依赖</h3>
        <el-form style="margin-left:20px;" label-position="top" label-width="200px">
          <el-form-item label="控制字段">
            <el-select v-model="controlId" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in data"
                :key="index"
                :label="item.name"
                :disabled="item.id===dependenceId"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="依赖字段">
            <el-select v-model="dependenceId" @change="filterData" clearable placeholder="请选择">
              <el-option
                v-for="item in data"
                :key="item.id"
                :label="item.name"
                :disabled="item.id===controlId"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            @click="goToNext"
            type="primary"
            style="margin-top:20px">下一步
          </el-button>
        </el-form>
      </div>
      <FieldDependenceEdit
        :controlId="controlId"
        :dependenceId="dependenceId"
        :objectId="objectId"
        :fieldDependenceId="fieldDependenceId"
        v-else/>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import FieldDependenceEdit from './components/FieldDependence/FieldDependenceEdit.vue'

@Component({
  name: 'FieldDependenceAdd',
  components: {
    FieldDependenceEdit
  }
})

export default class FieldDependenceAdd extends Vue {
  private data: any = []
  private controlId: string | undefined = ''
  private dependenceId: string | undefined = ''
  private toNext: boolean = true

  get objectId () {
    return this.$attrs.objectId
  }

  get fieldDependenceId () {
    return this.$attrs.fieldDependenceId
  }

  created () {
    if (this.$route.name === 'ObjectFieldDependenceEdit') {
      this.controlId = this.$route.query.controlId as any
      this.dependenceId = this.$route.query.dependenceId as any
      this.toNext = !this.toNext
    } else {
      this.getData()
    }
  }

  async getData () {
    const { data: { data } } = await Api.bizObjects.getFields(
      this.objectId,
      ['OptionListField', 'MoreOptionListField'].join(',')
    )
    this.data = data
  }

  goToNext () {
    if (this.controlId && this.dependenceId) {
      this.toNext = !this.toNext
    } else {
      this.$message('请完善依赖信息')
    }
  }

  filterData (val: any) {
    this.data.map((item: any) => {
      item.disabled = item.id === val
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
  right: 0;
  cursor: pointer;
}
</style>

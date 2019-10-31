<template>
  <div class="main">
    <el-card class="m-b-20"
             :body-style="{padding:0}">
      <div slot="header">
        <div class="title">
          <span class="title_left">{{isStandard?'平台标准对象':'组织自定义对象'}}</span>
          <span class="title_right">合计共有9个平台标准对象</span>
        </div>
        <div v-if="!isStandard"
             class="m-t-20">
          <el-button size="medium"
                     @click="creatObject"
                     type="primary">新建对象</el-button>
        </div>
      </div>
      <div>
        <el-table :header-cell-style="{background:'#F8FAFC'}"
                  :data="objects">
          <el-table-column label="对象名称">
            <template slot-scope="scope">
              <span class="link"
                    @click="goToEdit(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="apiName"
                           label="API">
          </el-table-column>
          <el-table-column prop="description"
                           label="备注">
          </el-table-column>
          <el-table-column prop="creator"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="lastModifiedTime"
                           label="最后修改日期">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('backstage/customized')

@Component({
  name: 'StandardObjects',
  computed: {
    ...mapState(['standardObjects', 'customObjects'])
  }
})
export default class StandardObject extends Vue {
  standardObjects: any
  customObjects: any

  get objects () {
    return this.isStandard ? this.standardObjects : this.customObjects
  }

  @Watch('$route', { immediate: true, deep: true })
  on$RouterChange () {
    this.getData()
  }

  get isStandard () {
    return this.$route.meta.title === '平台标准对象'
  }

  creatObject () {
    this.$router.push({
      path: this.$route.path + `/add`
    })
  }

  created () {
    this.getData()
  }

  goToEdit (row: any) {
    this.$router.push({
      path: this.$route.path + `/${row.id}`
    })
  }

  getData () {
    this.$store.dispatch('backstage/customized/getObjects', this.isStandard)
    sessionStorage.setItem('activeName', 'first')
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;

  &_left {
    font-size: 16px;
    font-weight: 600;
  }

  &_right {
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}

.link {
  cursor: pointer;
  color: $dd--info-color;
}
</style>

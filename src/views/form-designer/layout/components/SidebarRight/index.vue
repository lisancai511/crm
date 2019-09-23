<!--Created by LiuLei on 2019/9/5-->
<template>
  <el-aside width="285px"
            class="form-design-sidebar--right">
    <div class="form-design-sidebar--right__inner">
      <div v-if="curLayout">
        <TextField :data="curLayout"
                   position="top"/>
      </div>
    </div>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { field } from '@/views/form-designer/config/components'
import basicFieldComponents from '@/views/backstage/customized/object-standard/details/feildList/components/fields'

@Component({
  name: 'FormDesignSidebarRight',
  components: {
    'TextField': basicFieldComponents.TextField
  }
})
export default class SidebarRight extends Vue {
  curLayout: field | null = null

  created () {
    this.$bus.$on('selectLayout', this.updateLayout)
  }

  beforeDestroy () {
    this.$bus.$off('selectLayout', this.updateLayout)
  }

  updateLayout (layout: field | null) {
    if (this.curLayout !== null) {
      this.$set(this.curLayout, 'isSelect', false)
    }
    if (layout === null) {
      this.curLayout = layout
      return
    }
    this.$set(layout, 'isSelect', true)
    this.curLayout = layout
  }
}
</script>

<style lang="scss" scoped>
.form-design-sidebar--right {
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
  background-color: #fff;
  height: 100%;
  overflow: auto;

  &__inner {
    flex: 1;
  }
}
</style>

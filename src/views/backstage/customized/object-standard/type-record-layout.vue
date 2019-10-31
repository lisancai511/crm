<template>
  <div>
    <el-card>
      <div class="typeRecordAdd">
        <div @click="$router.go(-1)"
             class="close">
          <dd-icon name="close" />
        </div>
        <h3 style="margin:10px 0 25px">
          分配页面布局
        </h3>
        <AssignPageLayout />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AssignPageLayout from './components/LayDistribution/AssignPageLayout.vue'
@Component({
  name: 'TypeRecordTypeLayout',
  components: {
    AssignPageLayout
  }
})
export default class TypeRecordTypeLayout extends Vue {}
</script>
<style lang="scss" scoped>
.typeRecordAdd {
  position: relative;
}
.close {
  position: absolute;
  right: 0;
}
.layDistribution {
  .details {
    padding: 0 !important;
  }
}
</style>

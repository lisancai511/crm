<!--Created by LiuLei on 2019/9/17-->
<template>
  <div class="fd-components-tab-related-list">
    <div class="related-list__wrap">
      <div class="related-list">
        <related-list-item
          v-for="child in layout.children"
          @click.native.stop="updateCurrentField(child)"
          :key="child.id"
          :layout="child"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import updateCurrentField from '@/views/designer/mixins/updateCurrentField'
import RelatedListItem from '@/views/designer/components/Tab/RelatedList/RelatedListItem.vue'

@Component({
  name: 'FdComponentsTabRelatedList',
  components: { RelatedListItem }
})
export default class FdComponentsTabRelatedList extends mixins(updateCurrentField) {
}
</script>

<style lang="scss" scoped>
.fd-components-tab-related-list {
  margin: 0 -25px;
  min-height: 100%;
  z-index: 999;
  position: relative;
  padding: 0 25px;

  .related-list {
    /*background-color: #40D2A5;*/

    &__wrap {
      padding: 20px 0;
    }
  }
}
</style>

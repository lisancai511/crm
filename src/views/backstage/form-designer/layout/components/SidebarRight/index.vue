<!--Created by LiuLei on 2019/9/5-->
<template>
    <div class="form-design-sidebar--right">
      <div class="form-design-sidebar--right__inner">
        FormDesignSidebarRight
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'FormDesignSidebarRight'
  })
export default class SidebarRight extends Vue {
}
</script>

<style lang="scss" scoped>
  .form-design-sidebar--right{
    display: flex;
    flex-direction: column;
    padding: 29px 20px 22px 0;
    &__inner{
      flex: 1;
      width: 285px;
      background-color: #fff;
    }
  }
</style>

<!--Created by LiuLei on 2019/11/4-->
<template>
  <div class="form-management">
    FormManagement
    <router-link to="/backstage/office-setting/form-management/new">
      新建表单
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FormManagement'
})
export default class FormManagement extends Vue {
}
</script>

<style lang="scss" scoped>

</style>

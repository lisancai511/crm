<template>
  <div class="details">
    <AssignPageLayout />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AssignPageLayout from './AssignPageLayout.vue'
@Component({
  name: 'LayDistribution',
  components: { AssignPageLayout }
})
export default class LayDistribution extends Vue {}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 20px 20px;
  border-top: 1px solid rgba(241, 242, 246, 1);
}
</style>

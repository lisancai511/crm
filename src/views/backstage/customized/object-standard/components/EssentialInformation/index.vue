<template>
  <div class="details">
    <EssentialInformationEdit
      :sizeForm="sizeForm"
      @edit="edit"
      @updateObject="updateObject"
      v-if="showEdit"/>
    <EssentialInformationDetails
      :sizeForm="sizeForm"
      @edit="edit"
      v-else/>
  </div>
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import Api from '@/api'
import { mixins } from 'vue-class-component'
import injectObjectId from '@/views/backstage/customized/object-standard/mixins/injectObjectId'
import EssentialInformationEdit from './Edit.vue'
import EssentialInformationDetails from './Details.vue'

@Component({
  name: 'EssentialInformation',
  components: {
    EssentialInformationEdit,
    EssentialInformationDetails
  }
})
export default class EssentialInformation extends mixins(injectObjectId) {
  sizeForm: any = {
    iconUrl: '',
    beginNumber: 0,
    autoNumberLength: 3,
    autoNumberFormat: 'yyyyMMdd'
  }

  private showEdit: Boolean = false

  edit (showEdit: boolean) {
    this.showEdit = showEdit
  }

  @Watch('showEdit', { immediate: true, deep: true })
  changeShowEdit () {
    this.getData(this.objectId)
  }

  async getData (objectId: string) {
    if (objectId) {
      const { data: { data } } = await Api.bizObjects.getObjectById(objectId)
      this.sizeForm = data
    } else {
      this.showEdit = true
    }
  }

  updateObject () {
    this.getData(this.objectId)
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(241, 242, 246, 1);
  min-height: calc(100vh - 160px);
}

.addIcon {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px dashed rgba(221, 221, 221, 1);
  display: inline-flex;
  margin-right: 20px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.rightIcon {
  display: flex;
  align-items: center;

  span {
    cursor: pointer;
  }
}

/deep/ .el-form-item__label {
  padding: 0 0 1px 0;
}
</style>

<template>
  <div class="RecordTypeChange">
    <el-form
      ref="form"
      :rules="rules"
      :model="form">
      <el-form-item prop="model">
        <el-select
          style="width: 100%"
          filterable
          remote
          clearable
          reserve-keywor
          :remote-method="remoteMethod"
          placeholder=""
          v-model="form.model">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="dd-text-center">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button
          :loading="loading"
          @click="confirm" type="primary">确定
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import api from '@/api'

@Component({
  name: 'RecordTypeChange'
})
export default class RecordTypeChange extends Vue {
  @Prop({ required: true, type: String }) readonly recordTypeId!: string
  @Prop({ required: true, type: String }) readonly objectId!: string
  @Prop({ required: true, type: String }) readonly objectApiName!: string
  @Prop({ required: true, type: Array }) readonly recordId!: string[]
  form: any = {
    model: ''
  }
  options: any = []
  allOptions: any = []
  loading: boolean = false

  get rules () {
    return {
      model: { required: true, message: '请选择新的记录类型' }
    }
  }

  @Watch('recordTypeId', { immediate: true })
  onOwnerIdChange (val: string) {
    this.form.model = val
  }

  @Watch('objectId', { immediate: true })
  onObjectIdChange (val: string) {
    if (!val) {
      return
    }
    api.bizObjects.getAllRecordTypes(this.objectId).then((res: any) => {
      this.allOptions = this.options = res.data.data
    })
  }

  remoteMethod (query: string) {
    this.options = this.allOptions.filter((user: any) => user.name.includes(query))
  }

  confirm () {
    this.$nextTick(() => {
      (this.$refs.form as any).validate(async (valid: boolean) => {
        if (valid) {
          this.loading = true
          try {
            await api.passObjectOp.putAppRecordRecordType({
              objectApiName: this.objectApiName,
              recordId: this.recordId.join(','),
              data: {
                recordTypeId: this.form.model
              }
            })
            this.$emit('confirm', this.form.model)
          } catch (e) {
            console.error(e)
          } finally {
            this.loading = false
          }
        }
      })
    })
  }
}

</script>

<style scoped lang="scss">
.RecordTypeChange {
}
</style>

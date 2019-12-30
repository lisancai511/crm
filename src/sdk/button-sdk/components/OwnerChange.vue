<template>
  <div class="OwnerChange">
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
import PredefinedObjectApiNames from '@/views/designer/config/PredefinedObjectApiNames'

@Component({
  name: 'OwnerChange'
})
export default class OwnerChange extends Vue {
  @Prop({ required: true, type: Array }) readonly ownerId!: string[]
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
      model: { required: true, message: '请选择新的所有人' }
    }
  }

  @Watch('ownerId', { immediate: true })
  onOwnerIdChange (val: string) {
    this.form.model = val
  }

  created () {
    // TODO 确定切换账号数据会不会更新
    api.paasObjectOp.getAppRecords(PredefinedObjectApiNames.user).then((res: any) => {
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
            await api.paasObjectOp.putAppRecordOwner({
              objectApiName: this.objectApiName,
              recordId: this.recordId.join(','),
              data: {
                ownerId: this.form.model
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
.OwnerChange {
}
</style>

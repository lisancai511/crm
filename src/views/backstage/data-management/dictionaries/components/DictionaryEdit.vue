<!--Created by LiuLei on 2019/11/1-->
<template>
  <el-dialog
    width="30%"
    title="编辑"
    @close="onClose"
    :visible.sync="visibleDialog">
    <el-form
      :model="copyDictionary"
      ref="form"
      :rules="rules">
      <el-form-item
        label="名称"
        prop="name">
        <el-input v-model="copyDictionary.name"></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description">
        <el-input
          type="textarea"
          v-model="copyDictionary.description"></el-input>
      </el-form-item>
      <div class="dd-text-center">
        <el-button
          type="primary"
          :loading="loading"
          @click="validate">保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import api from '@/api'

@Component({
  name: 'DictionaryEdit'
})
export default class DictionaryEdit extends Vue {
  @Prop({ required: true, type: Object }) readonly dictionary !: any
  copyDictionary: any = {
    name: '',
    description: ''
  }

  loading: boolean = false

  visibleDialog = false
  _resove: ((value?: unknown) => void) | undefined
  _reject: ((value?: unknown) => void) | undefined

  get rules () {
    return {
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ]
    }
  }

  @Watch('dictionary', { immediate: true })
  onDictionaryChange () {
    if (this.copyDictionary.id) {
      return
    }
    this.copyDictionary = _.cloneDeep(this.dictionary)
  }

  show () {
    this.visibleDialog = true
    return new Promise((resolve, reject) => {
      this._resove = resolve
      this._reject = reject
    })
  }

  validate () {
    this.$nextTick(() => {
      (this.$refs.form as any).validate((valid: boolean) => {
        if (valid) {
          this.save()
        }
      })
    })
  }

  async save () {
    try {
      await api.globalData.putDictionary(
        this.copyDictionary.id,
        {
          name: this.copyDictionary.name,
          description: this.copyDictionary.description
        }
      ).then((res: any) => {
        (this._resove as any)(res)
        this.$message({
          type: 'success',
          message: '编辑成功',
          duration: 500
        })
      })
    } catch (e) {
      (this._reject as any)(e)
      this.$message({
        type: 'info',
        message: '编辑失败',
        duration: 500
      })
      console.error(e)
    } finally {
      this.visibleDialog = false
    }
  }

  cancel () {
    this.visibleDialog = false
  }

  onClose () {
    (this._reject as any)('cancel')
  }
}
</script>

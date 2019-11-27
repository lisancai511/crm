<!--Created by LiuLei on 2019/10/31-->
<template>
  <div class="NewDictionary">
    <el-card>
      <div slot="header">
        <strong class="fs-18">新建数据字段</strong>
      </div>
      <el-form
        ref="form"
        :rules="rules"
        :model="dictionary">
        <el-form-item
          label="名称"
          prop="name">
          <el-input v-model="dictionary.name"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description">
          <el-input
            type="textarea"
            v-model="dictionary.description"></el-input>
        </el-form-item>
        <el-form-item
          label="在下面为字典输入一列值，每个值应单独占一行"
          prop="items">
          <el-input
            :rows="6"
            type="textarea"
            v-model="dictionary.items"></el-input>
        </el-form-item>
        <el-form-item
          prop="letterOrder">
          <el-checkbox v-model="dictionary.letterOrder">
            按字母顺序而不是输入顺序排序值，所有值将以字母顺序显示
          </el-checkbox>
        </el-form-item>
        <el-form-item
          prop="firstItemAsDefault">
          <el-checkbox v-model="dictionary.firstItemAsDefault">
            将第一个值作为默认值
          </el-checkbox>
        </el-form-item>
        <div class="dd-text-center">
          <el-button type="primary" @click="validate">保存</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import api from '@/api'

interface IDictionary<T> {
  name: string,
  description: string,
  items: T,
  letterOrder: boolean,
  firstItemAsDefault: boolean
}

@Component({
  name: 'NewDictionary'
})
export default class NewDictionary extends Vue {
  dictionary: IDictionary<string> = {
    name: '',
    description: '',
    items: '',
    letterOrder: false,
    firstItemAsDefault: false
  }

  get rules () {
    return {
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ],
      items: [
        {
          required: true,
          message: '请输入字典值',
          trigger: 'change'
        }
      ]
    }
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

  save () {
    // TODO 调用接口
    const _dictionary: IDictionary<string[]> = {
      ..._.cloneDeep(this.dictionary),
      items: this.dictionary.items.split(/\n+/g)
    }
    api.globalData.postDictionary({
      name: _dictionary.name,
      description: _dictionary.description,
      items: _dictionary.items,
      type: 'StandardApp',
      firstItemAsDefault: _dictionary.firstItemAsDefault,
      letterOrder: _dictionary.letterOrder
    }).then(() => {
      this.$router.go(-1)
      this.$message.success('新建成功')
    })
    console.log(_dictionary)
  }
}
</script>

<style lang="scss" scoped>

</style>

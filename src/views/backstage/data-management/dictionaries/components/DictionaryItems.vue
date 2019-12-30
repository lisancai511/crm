<!--Created by LiuLei on 2019/11/4-->
<template>
  <div>
    <el-table
      :header-cell-style="{background:'#F8FAFC'}"
      :data="avaliable ? enableDictionaryItems : disableDictionaryItems"
      style="width: 100%">
      <el-table-column
        label="值"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="默认"
        v-if="avaliable"
      >
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.id"
            v-model="defaultDictionaryItemId">
            {{''}}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column v-else/>
      <el-table-column
        label="最后修改人"
      >
        <template slot-scope="scope">
          {{scope.row.lastModifierName}}
          &nbsp;&nbsp;
          {{scope.row.lastModifiedTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="avaliable"
            class="dd-button__text dd-button__text--info"
            @click="openEditDictionaryItemDialog(scope.row)"
            type="text">编辑
          </el-button>
          <el-button
            class="dd-button__text dd-button__text--info"
            @click="deleteDictionaryItem(scope.row)" type="text">删除</el-button>
          <el-button
            class="dd-button__text dd-button__text--info"
            @click="editDictionaryItemState(scope.row,!avaliable)"
            type="text">{{avaliable ? '禁用' : '启用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="30%"
      title="编辑"
      :visible.sync="visibleEditDictionaryItemDialog"
    >
      <el-form
        ref="curEditDictionaryItemForm"
        :rules="curEditDictionaryItemRules"
        :model="curEditDictionaryItem">
        <el-form-item
          label="值"
          prop="name"
        >
          <el-input v-model="curEditDictionaryItem.name"></el-input>
        </el-form-item>
        <div class="dd-text-center">
          <el-button
            type="primary"
            @click="editDictionaryItemDialog">保存
          </el-button>
          <el-button @click="visibleEditDictionaryItemDialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import api from '@/api'
import _ from 'lodash'

interface IDictionaryItem {
  id: string,
  name: string,
  description: string,
  asDefault: boolean,
  avaliable: boolean,
  lastModifierName: string,
  lastModifiedTime: string
}

@Component({
  name: 'DictionaryItems'
})
export default class DictionaryItems extends Vue {
  @Prop({ required: true, type: Array }) readonly data !: any[]
  @Prop({ required: true, type: String }) readonly dictionaryId !: string
  @Prop({ required: true, type: Boolean }) readonly avaliable !: boolean
  visibleEditDictionaryItemDialog: boolean = false
  curEditDictionaryItem: IDictionaryItem | {} = {}

  get enableDictionaryItems () {
    return this.data.filter((item: IDictionaryItem) => {
      return item.avaliable
    })
  }

  get disableDictionaryItems () {
    return this.data.filter((item: IDictionaryItem) => {
      return !item.avaliable
    })
  }

  get defaultDictionaryItemId () {
    const defaultDictionaryItem = this.enableDictionaryItems.find((value: IDictionaryItem) => {
      return value.asDefault
    })
    return defaultDictionaryItem ? defaultDictionaryItem.id : ''
  }

  set defaultDictionaryItemId (id: string) {
    api.globalData.putDictionaryItemDefault(
      this.dictionaryId,
      id
    ).then(() => {
      this.$emit('update:data', this.data.map((item: IDictionaryItem) => {
        return {
          ...item,
          asDefault: item.id === id
        }
      }))
    }).catch((e: any) => {
      console.error(e)
      this.$message({
        type: 'info',
        message: '设置默认值失败',
        duration: 500
      })
    })
  }

  get curEditDictionaryItemRules () {
    return {
      name: [
        {
          required: true,
          message: '请输入值',
          trigger: 'change'
        }
      ]
    }
  }

  openEditDictionaryItemDialog (item: IDictionaryItem) {
    this.curEditDictionaryItem = _.cloneDeep(item)
    this.visibleEditDictionaryItemDialog = true
  }

  editDictionaryItemDialog () {
    this.$nextTick(() => {
      (this.$refs.curEditDictionaryItemForm as any).validate((valid: boolean) => {
        if (valid) {
          this.visibleEditDictionaryItemDialog = false
          const curEditDictionaryItem: IDictionaryItem = this.curEditDictionaryItem as any
          api.globalData.putDictionaryItem(
            this.dictionaryId,
            curEditDictionaryItem.id,
            {
              name: curEditDictionaryItem.name,
              description: curEditDictionaryItem.description
            }
          ).then(() => {
            this.$message({
              type: 'success',
              message: '编辑成功',
              duration: 500
            })
          }).catch((e: any) => {
            console.log(e)
            this.$message({
              type: 'info',
              message: '编辑失败',
              duration: 500
            })
          })
        }
      })
    })
  }

  async deleteDictionaryItem (item: IDictionaryItem) {
    try {
      await api.globalData.deleteDictionaryItem(
        this.dictionaryId,
        item.id
      )
      this.$message({
        type: 'success',
        message: '删除成功',
        duration: 500
      })
    } catch (e) {
      console.error(e)
      this.$message({
        type: 'success',
        message: '删除失败',
        duration: 500
      })
    }
  }

  async editDictionaryItemState (item: IDictionaryItem, state: boolean) {
    const label = state ? '启用' : '禁用'
    try {
      await api.globalData.putDictionaryItemState(
        this.dictionaryId,
        item.id,
        state
      )
      item.avaliable = state
      this.$message({
        type: 'success',
        message: `${label}成功`,
        duration: 500
      })
    } catch (e) {
      console.error(e)
      this.$message({
        type: 'info',
        message: `${label}失败`,
        duration: 500
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.el-button.el-button--text {
  padding-bottom: 0;
  padding-top: 0;
}
</style>

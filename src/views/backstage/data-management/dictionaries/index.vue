<!--Created by LiuLei on 2019/10/31-->
<template>
  <div class="dictionaries">
    <el-card :body-style="{padding:0}">
      <div class="dictionaries__header" slot="header">
        <strong class="fs-16">数据字典</strong>
        <el-button
          @click="newDictionary"
          type="primary"
          size="small">新建
        </el-button>
      </div>
      <el-table
        :header-cell-style="{background:'#F8FAFC'}"
        style="width: 100%"
        :data="dictionaries">
        <el-table-column
          prop="name"
          label="名称"
        >
          <template slot-scope="scope">
         <span @click="$router.push(`${$route.path}/${scope.row.id}`)" class="dd-link">
            {{scope.row.name}}
         </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              class="dd-button__text dd-button__text--info"
              type="text" @click="editDictionary(scope.row)">编辑
            </el-button>
            <el-button
              class="dd-button__text dd-button__text--info"
              type="text" @click="deleteDictionary(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <dictionary-edit
      ref="editDictionaryDialog"
      :dictionary="copyDictionary"/>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import api from '@/api'
import DictionaryEdit from '@/views/backstage/data-management/dictionaries/components/DictionaryEdit.vue'
import { mixins } from 'vue-class-component'
import utils from '@/views/backstage/data-management/dictionaries/mixins/utils'

@Component({
  name: 'Dictionary',
  components: { DictionaryEdit }
})
export default class Dictionary extends mixins(utils) {
  dictionaries: any[] = []
  copyDictionary: any = {}

  created () {
    this.getDictionaries()
  }

  async getDictionaries () {
    try {
      const {
        data: {
          data: dictionaries
        }
      } = await api.globalData.getDictionaries()
      this.dictionaries = dictionaries
    } catch (e) {
      console.error(e)
    }
  }

  newDictionary () {
    this.$router.push('/backstage/data-management/dictionaries/add')
  }

  editDictionary (dictionary: any) {
    this.copyDictionary = dictionary;
    (this.$refs.editDictionaryDialog as any).show().then((data: any) => {
      // TODO 更新数据
      const {
        data: {
          data: _dictionary
        }
      } = data
      console.log(_dictionary)
    })
  }
}
</script>

<style lang="scss" scoped>
.dictionaries {
  .el-button.el-button--text {
    padding-bottom: 0;
    padding-top: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

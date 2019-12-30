<!--Created by LiuLei on 2019/11/1-->
<template>
  <div class="details">
    <el-card class="m-b-10">
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">数据字典:学历</strong>
          <div>
            <el-button @click="editDictionary" type="info" size="small">编辑</el-button>
            <el-button @click="deleteThis" type="warning" size="small">删除</el-button>
          </div>
        </div>
      </div>
      <div>
        <p>名称:{{dictionary.name}} </p>
        <p>描述:{{dictionary.description}} </p>
      </div>
    </el-card>
    <el-card
      :body-style="{padding:0}"
      class="m-b-10">
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">值列表</strong>
          <div>
            <el-button
              @click="newDictionaryItems"
              type="primary" size="small">新建
            </el-button>
            <el-button
              @click="replaceDictionaryItems"
              type="info" size="small">替换
            </el-button>
          </div>
        </div>
      </div>
      <dictionary-items
        :avaliable="true"
        :data.sync="dictionaryItems"
        :dictionary-id="dictionaryId"
      />
    </el-card>
    <el-card :body-style="{padding:0}"
             class="m-b-10">
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">禁用值</strong>
        </div>
      </div>
      <dictionary-items
        :avaliable="false"
        :data.sync="dictionaryItems"
        :dictionary-id="dictionaryId"
      />
    </el-card>
    <el-card>
      <div slot="header">
        <div class="card-header">
          <strong class="fs-16">字典使用情况</strong>
        </div>
      </div>
      <el-table></el-table>
    </el-card>
    <dictionary-edit
      ref="editDictionaryDialog"
      :dictionary="dictionary"/>
    <el-dialog
      width="30%"
      title="添加数据字典"
      :visible.sync="visibleNewDictionaryItemsDialog">
      <el-form
        ref="dictionaryItemsNewForm"
        :rules="dictionaryItemsNewRules"
        :model="dictionaryItemsNew">
        <el-form-item
          prop="value"
          label="在下边添加一个或多个值，每个值应单独占一行"
        >
          <el-input type="textarea" :rows="6" v-model="dictionaryItemsNew.value"/>
        </el-form-item>
        <div class="dd-text-center">
          <el-button
            type="primary"
            @click="newDictionaryItems">保存
          </el-button>
          <el-button @click="visibleNewDictionaryItemsDialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      width="30%"
      title="查找并替换字典表值"
      :visible.sync="visibleReplaceDictionaryItemsDialog">
      <div class="m-b-20">使用此页面用新值全局替换字典表中的现有值</div>
      <el-form
        ref="dictionaryItemsReplaceForm"
        :rules="dictionaryItemsReplaceRules"
        label-width="180px"
        :model="dictionaryItemsReplace">
        <el-form-item
          label="选择要更改的确切值"
          prop="replaceFromItemId">
          <el-select clearable v-model="dictionaryItemsReplace.replaceFromItemId">
            <el-option v-for="item in dictionaryItems"
                       :key="item.id"
                       :label="item.name"
                       :disabled="item.id === dictionaryItemsReplace.replaceToItemId"
                       :value="item.id"
            >{{item.name}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择要更改至的目标值"
          prop="replaceToItemId">
          <el-select clearable v-model="dictionaryItemsReplace.replaceToItemId">
            <el-option v-for="item in dictionaryItems"
                       :key="item.id"
                       :label="item.name"
                       :disabled="item.id === dictionaryItemsReplace.replaceFromItemId"
                       :value="item.id"
            >{{item.name}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="替换所有的空值"
          prop="includeNull">
          <el-checkbox v-model="dictionaryItemsReplace.includeNull"></el-checkbox>
        </el-form-item>
        <div class="dd-text-center">
          <el-button
            type="primary"
            @click="replaceDictionaryItems">保存
          </el-button>
          <el-button @click="visibleReplaceDictionaryItemsDialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import api from '@/api'
import DictionaryEdit from '@/views/backstage/data-management/dictionaries/components/DictionaryEdit.vue'
import { mixins } from 'vue-class-component'
import utils from '@/views/backstage/data-management/dictionaries/mixins/utils'
import DictionaryItems from '@/views/backstage/data-management/dictionaries/components/DictionaryItems.vue'

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
  name: 'DictionaryDetails',
  components: { DictionaryItems, DictionaryEdit }
})
export default class DictionaryDetails extends mixins(utils) {
  dictionary = {
    id: '',
    name: '',
    description: ''
  }

  dictionaryItems: IDictionaryItem[] = []
  visibleNewDictionaryItemsDialog: boolean = false
  visibleReplaceDictionaryItemsDialog: boolean = false
  dictionaryItemsNew: { value: string } = {
    value: ''
  }

  dictionaryItemsReplace: {
    replaceFromItemId: string,
    replaceToItemId: string,
    includeNull: boolean
  } = {
    replaceFromItemId: '',
    replaceToItemId: '',
    includeNull: false
  }

  get dictionaryId () {
    return this.$attrs.dictionaryId
  }

  get dictionaryItemsNewRules () {
    return {
      value: [
        {
          required: true,
          message: '请输入',
          trigger: 'change'
        }
      ]
    }
  }

  get dictionaryItemsReplaceRules () {
    return {
      replaceFromItemId: [
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ],
      replaceToItemId: [
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]
    }
  }

  async created () {
    try {
      const [
        {
          data: {
            data: dictionary
          }
        },
        {
          data: {
            data: dictionaryItems
          }
        }
      ] = await Promise.all([
        api.globalData.getDictionary(this.dictionaryId),
        api.globalData.getDictionaryItems(this.dictionaryId)
      ])
      this.dictionary = dictionary
      this.dictionaryItems = dictionaryItems
    } catch (e) {
      console.error(e)
    }
  }

  editDictionary () {
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

  async deleteThis () {
    await this.deleteDictionary(this.dictionaryId)
    this.$router.go(-1)
  }

  newDictionaryItems () {
    this.visibleNewDictionaryItemsDialog = true
    this.$nextTick(() => {
      (this.$refs as any).dictionaryItemsNewForm.validate((valid: boolean) => {
        if (valid) {
          // TODO 请求api
        }
      })
    })
  }

  replaceDictionaryItems () {
    this.visibleReplaceDictionaryItemsDialog = true
    this.$nextTick(() => {
      (this.$refs as any).dictionaryItemsReplaceForm.validate((valid: boolean) => {
        if (valid) {
          // TODO 请求api
        }
      })
    })
  }
}

</script>

<style lang="scss" scoped>
.details {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

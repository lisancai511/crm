<!--Created by LiuLei on 2019/11/25-->
<template>
  <el-select
    style="width: 100%"
    class="fd-form-item__option-list"
    placeholder=""
    v-model="model"
    :disabled="layout.attrs.disabled">
    <el-option
      :key="item.id"
      :value="item.id"
      :label="item.v"
      v-for="item in filterValueCandidates">
      {{item.v}}
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import _ from 'lodash'
import { DESIGNER_EXEC_TYPES } from '@/views/designer/config/Designer'
import { mixins } from 'vue-class-component'
import formBaseItemMixins from '@/views/designer/components/PCLayout/mixins/formBaseItemMixins'
import { toFormApiName } from '@/views/app/utils'

@Component({
  name: 'OptionListFieldDesign'
})
export default class OptionListField extends mixins(formBaseItemMixins) {
  // 选项列表控制字段值
  controlFieldValue: string = ''
  valueCandidateIds: string[] = []

  get showAll () {
    return [DESIGNER_EXEC_TYPES.DESIGNER, DESIGNER_EXEC_TYPES.DETAILS].includes(this.designer.setting.execType)
  }

  // 获取当前控制字段ID
  get formattedFieldDependencies () {
    for (let i = 0; i < this.fieldDependencies.length; i++) {
      const dependencyFields = this.fieldDependencies[i].dependencyFields
      const dependencyItems = this.fieldDependencies[i].dependencyItems
      for (let j = 0; j < dependencyFields.length; j++) {
        if (j > 0 && dependencyFields[j].fieldId === this.layout.id) {
          const allDependencyItemMap = this.getAllDependencyItemMap(dependencyItems)
          const dependencyItemMap = this.getDependencyItemMap(allDependencyItemMap, j - 1)
          return {
            // dependencyFields: dependencyFields.filter((field: any, index: number) => index < j),
            dependencyField: dependencyFields[j - 1],
            dependencyItems,
            allDependencyItemMap,
            dependencyItemMap
          }
        }
      }
    }
    return {}
  }

  // 获取选项列表值
  get filterValueCandidates () {
    if (this.showAll || !this.formattedFieldDependencies.dependencyField) {
      return this.layout.attrs.sValueCandidates
    }
    const fieldById = this.fieldById
    // 获取控制字段Id
    const controlFieldId = this.formattedFieldDependencies.dependencyField.fieldId
    const controlField = fieldById[controlFieldId] || {}
    let controlFieldApiName = controlField.apiName
    controlFieldApiName = toFormApiName(controlFieldApiName, controlField.type)
    const controlFieldValue = this.record[controlFieldApiName]
    this.controlFieldValue = controlFieldValue
    const valueCandidateIdMap = this.formattedFieldDependencies.dependencyItemMap[controlFieldValue]

    if (!valueCandidateIdMap) {
      return this.layout.attrs.sValueCandidates
    }
    const valueCandidateIds = Object.keys(valueCandidateIdMap)
    this.valueCandidateIds = valueCandidateIds
    return this.layout.attrs.sValueCandidates.filter((item: any) => {
      return valueCandidateIds.includes(item.id)
    })
  }

  @Watch('controlFieldValue')
  onControlFieldValueChange (newVal: string) {
    if (this.layout.type === ComponentTypes.OptionListField) {
      if (newVal) {
        this.model && (this.model = this.valueCandidateIds[0])
      }
    }
  }

  getAllDependencyItemMap (dependencyItems: any) {
    const deepDependencyItems = _.cloneDeep(dependencyItems)
    return deepDependencyItems.reduce((pre: any, cur: any) => {
      if (_.isPlainObject(cur)) {
        const [k, v] = Object.entries(cur)[0]
        pre[k] = this.getAllDependencyItemMap(v)
      } else {
        pre[cur] = {}
      }
      return pre
    }, {})
  }

  getDependencyItemMap (allDependencyItemMap: any, reduceLevel: number = 0) {
    if (reduceLevel === 0) {
      return allDependencyItemMap
    }
    for (let i = 0; i < reduceLevel; i++) {
      allDependencyItemMap = Object.values(allDependencyItemMap)
        .reduce((pre: any, cur: any) => {
          pre = {
            ...pre,
            ...cur
          }
          return pre
        }, {})
    }
    return allDependencyItemMap
  }
}
</script>

<style lang="scss" scoped>

</style>

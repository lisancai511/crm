<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-design-navbar">
    <div class="navbar__left">
      <el-menu
        mode="horizontal"
        :default-active="activeMenu">
        <el-menu-item
          :key="designer.meta.type"
          :index="designer.meta.type"
          :class="{'dd-is-active':designer.meta.type === layoutType}"
          v-for="designer in designers">
          <!--          <router-link :to="{name:designer.name,query:pathQuery}" replace>{{designer.meta.title}}</router-link>-->
          <a @click="nav({name:designer.name,query:pathQuery})">{{designer.meta.title}}</a>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="navbar__right">
      <el-button
        @click="save"
        :disabled="saving"
        :loading="saving && saveAndExiting"
        type="primary">
        保存
      </el-button>
      <el-button
        :disabled="saving"
        :loading="saveAndExiting"
        @click="saveAndExit">保存并退出
      </el-button>
      <el-button
        :disabled="saving"
        @click="confirmExit">退出
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import formDesignerRouter from '@/router/modules/designer'
import designerStore from '@/store/modules/designer'
import { arrToMap } from '@/utils'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import api from '@/api'
import {
  compressStringToBase64,
  getLocalLayoutFields,
  getLocalLayoutNeedAddFields,
  getLocalLayoutNeedModifyFields,
  getLocalLayoutUsedFields,
  localFieldToServerField,
  localLayoutToServer
} from '@/views/designer/utils'
import { IField, fieldComponents } from '@/views/designer/config/components'
import { IHoverLookup } from '@/views/designer/types'
import initLayoutBaseData from '@/views/designer/mixins/initLayoutBaseData'
import _ from 'lodash'
import AsyncValidator from 'async-validator'
import allSettled from 'promise.allsettled'

(AsyncValidator as any).warning = function () {
}
const fieldComponentByType: { [prop: string]: IField } = arrToMap(fieldComponents, 'type')

@Component({
  name: 'FormDesignNavBar'
})
export default class FormDesignNavBar extends mixins(initLayoutBaseData) {
  activeMenu: string | undefined = LayoutTypes.PC
  designers = formDesignerRouter.children
  saving: boolean = false
  saveAndExiting: boolean = false
  isEdit: boolean = false

  get pathQuery () {
    return {
      layoutId: designerStore.layoutId,
      objectId: designerStore.object.id
    }
  }

  get layoutType (): LayoutTypes {
    return this.$route.meta.type
  }

  get curLayout () {
    return designerStore.layout[this.layoutType]
  }

  get fieldComponentByType () {
    return arrToMap(fieldComponents, 'type')
  }

  get hackCurLayout () {
    return JSON.parse(JSON.stringify(this.curLayout))
  }

  @Watch('layoutType')
  onRouteNameChange (newVal: LayoutTypes) {
    this.isEdit = false
    designerStore.initLayoutByType(newVal)
  }

  @Watch('hackCurLayout', { deep: true })
  onCurLayoutChange (newVal: any, oldVal: any) {
    if (designerStore.isStopWatchingLayout) {
      return
    }
    if (newVal.type !== oldVal.type) {
      return
    }
    if (oldVal.isInit) {
      return
    }
    const isEqual = _.isEqualWith(newVal, oldVal, (objValue, othValue, key) => {
      if (_.isObject(objValue) && _.isObject(othValue) && ((objValue as any).isSelect || (othValue as any).isSelect)) {
        return (objValue as any).isSelect !== (othValue as any).isSelect
      }
      if (_.isObject(objValue) && _.isObject(othValue) && ((objValue as any).isError || (othValue as any).isError)) {
        return (objValue as any).isError !== (othValue as any).isError
      }
      if (([
        'isSelect',
        'isError'
        // , 'isEdit'
      ] as any[]).includes(key)) {
        return true
      }
    })
    // console.log('isEqual', isEqual)
    if (isEqual) {
      return
    }
    this.isEdit = true
    // console.log('oldVal', JSON.parse(JSON.stringify(oldVal)))
    // console.log('newVal', JSON.parse(JSON.stringify(newVal)))
  }

  @Watch('$route', { deep: true, immediate: true })
  on$routeChange (val: any) {
    designerStore.updateCurRoute(val)
  }

  created () {
    this.activeMenu = this.$route.meta.type
  }

  nav (routerOptions: any) {
    // return
    if (routerOptions.name === this.$route.name) {
      return
    }
    if (this.isEdit) {
      this.$confirm('布局已被修改暂未保存，是否保存？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async () => {
        await this.save()
        await this.$router.replace(routerOptions)
      }).catch((e) => {
        if (e === 'cancel') {
          this.$router.replace(routerOptions)
        }
      })
    } else {
      this.$router.replace(routerOptions)
    }
  }

  async save () {
    const { layoutType } = this
    switch (layoutType) {
      case LayoutTypes.PC:
      case LayoutTypes.Mobile:
        await this.savePcOrMobile(layoutType)
        break
      case LayoutTypes.Hover:
        await this.saveHover()
        break
      case LayoutTypes.Linear:
        await this.saveLinear()
        break
      default:
    }
  }

  async saveAndExit () {
    this.saveAndExiting = true
    await this.save()
    this.saveAndExiting = false
    this.exit()
  }

  confirmExit () {
    if (this.isEdit) {
      this.$confirm('布局已被修改暂未保存，是否保存？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(this.saveAndExit).catch(e => {
        if (e === 'cancel') {
          this.exit()
        }
      })
    } else {
      this.exit()
    }
  }

  exit () {
    this.$router.replace({
      path: `/backstage/customized/object-standard/${designerStore.object.id}`,
      query: {
        id: this.pathQuery.objectId
      }
    })
  }

  flatRules (rules: any): void {
    Object.entries(rules).forEach(([k, v]: [string, any]) => {
      if (_.isPlainObject(v)) {
        rules[k] = {
          type: 'object',
          required: true,
          options:
            { first: true },
          fields: v
        }
        this.flatRules(v)
      }
    })
  }

  async savePcOrMobile (type: LayoutTypes.PC | LayoutTypes.Mobile) {
    const ui = designerStore.layout[type]

    const allUsedFields: IField[] = getLocalLayoutFields(ui.define)
    const serverFields: IField[] = designerStore.fields
    const allFields = [...new Set([...serverFields, ...allUsedFields])]
    // 验证当前显示的表单
    this.$bus.$emit('designer/layout/valid')
    const validResult = await allSettled(allUsedFields.map((field: IField) => {
      const configRules: any = fieldComponentByType[field.type].configRules
      // TODO 递归格式化验证规则
      const copyRules = _.cloneDeep(configRules)
      this.flatRules(copyRules)
      // console.log(copyRules)
      // 验证name和apiName重复
      // TODO 优化算法
      const otherUsedFieldNames: string[] = []
      const otherUsedFieldApiNames: string[] = []
      allFields.forEach((_field: IField) => {
        if (_field.id) {
          if (_field.id === field.id) {
            return
          }
        } else {
          if (_field === field) {
            return
          }
        }
        otherUsedFieldNames.push(_field.name)
        otherUsedFieldApiNames.push(_field.apiName)
      })
      const dynamicConfigRules: any = ((this.fieldComponentByType[field.type] || {}) as IField).dynamicConfigRules
      const dynamicRules: any = dynamicConfigRules({
        otherUsedFieldNames: otherUsedFieldNames,
        otherUsedFieldApiNames: otherUsedFieldApiNames
      })
      // console.log(dynamicRules)
      Object.entries(copyRules as any).forEach(([k, v]) => {
        if (dynamicRules[k]) {
          (v as any[]).push(dynamicRules[k])
        }
      })
      // console.log(field)
      const validator = new AsyncValidator(copyRules)
      return new Promise((resolve, reject) => {
        validator.validate(field, { firstFields: true })
          .then((data) => {
            this.$set(field, 'isError', false)
            resolve(data)
          })
          .catch((err: any) => {
            this.$set(field, 'isError', true)
            reject(err)
          })
      })
    }))
    // console.log(validResult)
    if (validResult.some(item => item.status === 'rejected')) {
      return
    }
    // console.log(getLocalLayoutNeedAddFields(ui.define))
    const layoutUI = {
      ...ui,
      usedFields: getLocalLayoutUsedFields(ui.define).map((field: IField) => {
        return {
          id: field.id,
          required: field.attrs.required,
          readOnly: field.attrs.disabled
        }
      }),
      needAddFields: getLocalLayoutNeedAddFields(ui.define)
        .map(field => localFieldToServerField(field)),
      needModifyFields: getLocalLayoutNeedModifyFields(ui.define)
        .map(field => localFieldToServerField(field)),
      define: compressStringToBase64(JSON.stringify(localLayoutToServer(ui.define)))
    }
    await this.saveUI(layoutUI)
    this.$bus.$emit(`designer/updateSelectLayout`, null)
  }

  async saveLinear () {
    const ui = designerStore.layout[LayoutTypes.Linear]
    const layoutUI = {
      ...ui,
      define: compressStringToBase64(
        JSON.stringify((ui.define as any[]).map((item: any) => {
          return [item.id, !!item.required]
        }))
      )
    }
    await this.saveUI(layoutUI)
  }

  async saveHover () {
    const ui = designerStore.layout[LayoutTypes.Hover]
    const layoutUI = {
      ...ui,
      define: compressStringToBase64(
        JSON.stringify({
          usedFields: ui.define.usedFields.map((item: IField) => item.id),
          lookups: ui.define.lookups.filter((item: IHoverLookup) => item.checked)
            .map((item: IHoverLookup) => {
              return {
                id: item.id,
                objectId: item.objectId,
                relatedListTitle: item.relatedListTitle,
                usedFields: item.usedFields.map((field: IField) => field.id)
              }
            })
        })
      )
    }
    await this.saveUI(layoutUI)
  }

  // 请求接口
  async saveUI (layoutUI: any) {
    this.saving = true
    try {
      if (!layoutUI.id) {
        await api.bizObjects.createLayoutUIs(
          designerStore.object.id,
          designerStore.layoutId,
          layoutUI
        )
      } else {
        await api.bizObjects.updateLayoutUIs(
          layoutUI.id,
          designerStore.object.id,
          designerStore.layoutId,
          layoutUI
        )
      }
      this.$message({
        message: '布局保存成功',
        type: 'success',
        duration: 1000
      })
      await this.initLayoutBaseData()
      designerStore.updateLayoutByType({
        layout: {
          ...(designerStore.layout as any)[layoutUI.type],
          isInit: false
        },
        type: layoutUI.type
      })
      this.$bus.$emit(`designer/${this.layoutType}/initLayout`)
      this.isEdit = false
    } catch (e) {
      console.error(e)
      return await Promise.reject(e)
    } finally {
      this.saving = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-design-navbar {
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 9px 26px 0 rgba(48, 48, 48, 0.13);
  display: flex;
  justify-content: space-between;
  align-content: center;
  z-index: 1;

  .el-menu {
    border-bottom: none;

    /deep/ .el-menu-item {
      border-bottom: none !important;

      &.is-active {
        /*font-weight: bold;*/
        /*font-size: 15px;*/
        color: #909399;
      }

      &.dd-is-active {
        font-weight: bold;
        font-size: 16px;
        color: #000;
      }

      a {
        line-height: 60px;
        display: inline-block;
      }
    }
  }

  .navbar {
    &__right {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
  }
}
</style>

<!--Created by LiuLei on 2019/12/5-->
<template>
  <div class="drawer-condition">
    <el-form
      label-position="left"
      label-width="80px">
      <el-form-item
        :label="fieldByApiName[condition.fieldApiName].name"
        :key="condition.fieldApiName"
        v-for="(condition,index) in normalConditions">
        <template v-if="condition.fieldApiName === CREATOR_KEY">
          <el-row>
            <el-col :span="20">
              <!--<el-select
                style="width: 100%"
                v-model="selectedCreator"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="user in workflowGlobal.users"
                  :key="user.id"
                  :label="user.name"
                  :value="user.id">
                </el-option>
              </el-select>-->
              <user-select-dialog
                :mode="false"
                :checked.sync="selectedCreator">
                <div class="submit__user">
                  <user-box
                    :users="workflowGlobal.users"
                    :departments="workflowGlobal.departments"
                    :roles="workflowGlobal.roles"
                    :closable="false"
                    :targets="selectedCreator"/>
                </div>
              </user-select-dialog>
            </el-col>
            <el-col style="text-align: right" :span="4">
              <el-button
                @click="deleteCondition(index)"
                type="text">
                <dd-icon name="delete"/>
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <template
            v-if="[ComponentTypes.NumberField,ComponentTypes.MoneyField].includes(fieldByApiName[condition.fieldApiName].type)">
            <el-row class="m-b-10">
              <el-col :span="condition.operator === CONDITION_RANGE_OPERATOR_TYPES.BETWEEN ? 20 : 8">
                <el-select
                  style="width: 100%"
                  v-model="condition.operator">
                  <el-option
                    :key="item.operator"
                    :label="item.name"
                    :value="item.operator"
                    v-for="item in CONDITION_RANGE_OPERATOR_LIST">
                    {{item.name}}
                  </el-option>
                </el-select>
              </el-col>
              <template v-if="condition.operator !== CONDITION_RANGE_OPERATOR_TYPES.BETWEEN">
                <el-col class="p-l-10" :span="12">
                  <el-input v-model="condition.values[0].value"/>
                </el-col>
              </template>
              <el-col style="text-align: right" :span="4">
                <el-button
                  @click="deleteCondition(index)"
                  type="text">
                  <dd-icon name="delete"/>
                </el-button>
              </el-col>
            </el-row>
            <el-row v-if="condition.operator === CONDITION_RANGE_OPERATOR_TYPES.BETWEEN">
              <el-col :span="4">
                <el-input size="mini"
                          v-model="condition.values[0].value"/>
              </el-col>
              <el-col :span="4">
                <el-select
                  size="mini"
                  style="width: 100%"
                  v-model="condition.values[0].operator">
                  <el-option
                    :key="item.operator"
                    :label="item.operator"
                    :value="item.operator"
                    v-for="item in CONDITION_RANGE_OPERATOR_LIST_PLAIN">
                    {{item.operator}}
                  </el-option>
                </el-select>
              </el-col>
              <el-col
                class="dd-text-center"
                :span="4">
                {{fieldByApiName[condition.fieldApiName].name}}
              </el-col>
              <el-col :span="4">
                <el-select
                  size="mini"
                  style="width: 100%"
                  v-model="condition.values[1].operator">
                  <el-option
                    :key="item.operator"
                    :label="item.operator"
                    :value="item.operator"
                    v-for="item in CONDITION_RANGE_OPERATOR_LIST_PLAIN">
                    {{item.operator}}
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-input
                  size="mini"
                  v-model="condition.values[1].value"/>
              </el-col>
            </el-row>
          </template>
          <template v-else-if="fieldByApiName[condition.fieldApiName].type === ComponentTypes.OptionListField">
            <el-row>
              <el-col :span="20">
                <el-checkbox-group v-model="condition.values">
                  <el-checkbox
                    :key="index"
                    v-for="(item,index) in fieldByApiName[condition.fieldApiName].attrs.valueCandidates.split(/\s/)"
                    :label="item"/>
                </el-checkbox-group>
              </el-col>
              <el-col style="text-align: right" :span="4">
                <el-button
                  @click="deleteCondition(index)"
                  type="text">
                  <dd-icon name="delete"/>
                </el-button>
              </el-col>
            </el-row>
          </template>
        </template>
      </el-form-item>
    </el-form>
    <div class="condition__footer m-t-30">
      <condition-add-dialog
        v-model="selectedFieldApiNames"
        :condition-fields="conditionFields">
        <el-button type="primary">添加条件</el-button>
      </condition-add-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import {
  CONDITION_RANGE_OPERATOR_LIST,
  CONDITION_RANGE_OPERATOR_TYPES,
  CONDITION_TYPES,
  ICondition
} from '@/views/backstage/office-setting/form-management/types'
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import ConditionAddDialog
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerCondition/components/ConditionAddDialog.vue'
import { arrToMap } from '@/utils'
import _ from 'lodash'
import nanoid from 'nanoid'
import UserSelectDialog from '@/components/UserSelectDialog.vue'
import UserBox
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/components/UserBox.vue'

const CREATOR_KEY = CONDITION_TYPES.CREATOR + '_' + nanoid(20)

@Component({
  name: 'DrawerCondition',
  components: { UserBox, UserSelectDialog, ConditionAddDialog }
})
export default class DrawerCondition extends Vue {
  @Inject() readonly workflowGlobal!: {
    users: any[],
    departments: any[],
    roles: any[],
    currentNode: ICondition,
    fields: IField[]
  }

  selectedCreator: any[] = []
  normalConditions: any[] = []

  get CREATOR_KEY () {
    return CREATOR_KEY
  }

  get selectedFieldApiNames () {
    return this.normalConditions.map((item: any) => item.fieldApiName)
  }

  set selectedFieldApiNames (apiNames: string[]) {
    const normalConditionByAFieldApiName = arrToMap(
      this.normalConditions.filter((item: any) => apiNames.includes(item.fieldApiName)),
      'fieldApiName')
    //  add new condition
    apiNames.forEach((apiName: string) => {
      if (!Reflect.has(normalConditionByAFieldApiName, apiName)) {
        normalConditionByAFieldApiName[apiName] = this.getDefaultCondition(apiName)
      }
    })
    this.normalConditions = Object.values(normalConditionByAFieldApiName)
  }

  get CONDITION_RANGE_OPERATOR_TYPES () {
    return CONDITION_RANGE_OPERATOR_TYPES
  }

  get CONDITION_RANGE_OPERATOR_LIST () {
    return CONDITION_RANGE_OPERATOR_LIST
  }

  get CONDITION_RANGE_OPERATOR_LIST_PLAIN () {
    return CONDITION_RANGE_OPERATOR_LIST.filter((item: any) =>
      ![
        CONDITION_RANGE_OPERATOR_TYPES.BETWEEN,
        CONDITION_RANGE_OPERATOR_TYPES.EQ,
        CONDITION_RANGE_OPERATOR_TYPES.GE,
        CONDITION_RANGE_OPERATOR_TYPES.GT
      ].includes(item.operator)
    )
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get fieldByApiName () {
    return {
      ...arrToMap(this.workflowGlobal.fields, 'apiName'),
      [CREATOR_KEY]: {
        name: '发起人'
      }
    }
  }

  // get normalConditions () {
  //   return this.selectedFieldApiNames.reduce((pre: any, cur: string) => {
  //     const curCondition: any = {
  //       values: []
  //     }
  //     switch (this.fieldByApiName[cur].type) {
  //       case ComponentTypes.NumberField:
  //         curCondition.type = CONDITION_TYPES.RANGE
  //         break
  //       case ComponentTypes.OptionListField:
  //         curCondition.type = CONDITION_TYPES.CHOICE
  //         break
  //       default:
  //     }
  //     this.$set(pre, cur, curCondition)
  //     return pre
  //   }, {})
  // }

  get SUPPORTED_FIELD_TYPES (): string[] {
    return [
      ComponentTypes.OptionListField,
      ComponentTypes.NumberField,
      ComponentTypes.MoneyField
    ]
  }

  get conditionFields () {
    return [
      {
        apiName: CREATOR_KEY,
        name: '发起人'
      },
      ...this.workflowGlobal.fields.filter((field: IField) => {
        return this.SUPPORTED_FIELD_TYPES.includes(field.type)
      })
    ]
  }

  get newCondition (): ICondition {
    // const config = this.workflowGlobal.currentNode.config
    // const configMap = config.reduce((pre: any, cur: any) => {
    //   if (cur.type === CONDITION_TYPES.CREATOR) {
    //     pre[CREATOR_KEY] = {
    //       ...cur,
    //       values: this.formatSelectCreator(this.selectedCreator)
    //     }
    //   }
    //   // else {
    //   //   pre[cur.fieldApiName] = cur
    //   // }
    //   return pre
    // }, {})
    // !configMap[CREATOR_KEY] && (configMap[CREATOR_KEY] = {
    //   type: CONDITION_TYPES.CREATOR,
    //   values: this.formatSelectCreator(this.selectedCreator)
    // })
    return {
      ...this.workflowGlobal.currentNode,
      config: [
        // ...Reflect.ownKeys(configMap).map((key: any) => configMap[key]),
        ...this.normalConditions.map((item: any) => {
          if (item.type !== CONDITION_TYPES.CREATOR) {
            return item
          }
          return {
            ...item,
            values: this.formatSelectCreator(this.selectedCreator)
          }
        })
      ]
    }
  }

  @Watch('newCondition')
  onNewNodeChange (condition: ICondition) {
    this.$emit('update', condition)
  }

  formatSelectCreator (selectCreator: any[]) {
    return [...selectCreator]
    // return selectCreator.map((item: any) => {
    //   return {
    //     id: item,
    //     type: APPROVAL_TARGET_TYPES.USER
    //   }
    // })
  }

  watchNormalCondition (condition: any) {
    switch (condition.type) {
      case CONDITION_TYPES.CHOICE:
      case CONDITION_TYPES.CREATOR:
        return condition
      case CONDITION_TYPES.RANGE:
        return Object.defineProperty(condition, 'operator', {
          get (): any {
            switch (this.values.length) {
              case 1:
                return this.values[0].operator
              case 2:
                return CONDITION_RANGE_OPERATOR_TYPES.BETWEEN
              default:
            }
          },
          set (v: CONDITION_RANGE_OPERATOR_TYPES): void {
            console.log('operator', v)
            switch (v) {
              case CONDITION_RANGE_OPERATOR_TYPES.EQ:
              case CONDITION_RANGE_OPERATOR_TYPES.GE:
              case CONDITION_RANGE_OPERATOR_TYPES.GT:
                this.values = [this.values[0]]
                this.values[0].operator = v
                break
              case CONDITION_RANGE_OPERATOR_TYPES.LE:
              case CONDITION_RANGE_OPERATOR_TYPES.LT:
                this.values = [this.values[this.values.length - 1]]
                this.values[0].operator = v
                break
              case CONDITION_RANGE_OPERATOR_TYPES.BETWEEN:
                if (this.values.length === 1) {
                  switch (this.values[0].operator) {
                    case CONDITION_RANGE_OPERATOR_TYPES.GE:
                    case CONDITION_RANGE_OPERATOR_TYPES.GT:
                      this.values = [
                        {
                          ...this.values[0],
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        },
                        {
                          value: '',
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        }
                      ]
                      break
                    case CONDITION_RANGE_OPERATOR_TYPES.LE:
                    case CONDITION_RANGE_OPERATOR_TYPES.LT:
                      this.values = [
                        {
                          value: '',
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        },
                        {
                          ...this.values[0],
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        }
                      ]
                      break
                    case CONDITION_RANGE_OPERATOR_TYPES.EQ:
                      this.values = [
                        {
                          ...this.values[0],
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        },
                        {
                          value: '',
                          operator: CONDITION_RANGE_OPERATOR_TYPES.LE
                        }
                      ]
                      break
                    default:
                  }
                }
                break
              default:
            }
          }
        })
      default:
    }
  }

  getDefaultCondition (fieldApiName: string) {
    const curField = this.fieldByApiName[fieldApiName]
    switch (curField.type) {
      case ComponentTypes.NumberField:
      case ComponentTypes.MoneyField:
        return this.watchNormalCondition({
          type: CONDITION_TYPES.RANGE,
          fieldApiName,
          values: [{
            value: '',
            operator: CONDITION_RANGE_OPERATOR_TYPES.EQ
          }]
        })
      case ComponentTypes.OptionListField:
      default:
        return this.watchNormalCondition({
          type: CONDITION_TYPES.CHOICE,
          fieldApiName,
          values: []
        })
    }
  }

  created () {
    const config = _.cloneDeep(this.workflowGlobal.currentNode.config)
    const creator: any = config.find((item: any) => item.type === CONDITION_TYPES.CREATOR)
    creator && (creator.fieldApiName = CREATOR_KEY)
    // this.selectedCreator = creator ? ((creator).values as any).map((value: any) => value.id) : []
    this.selectedCreator = creator ? [...creator.values] : []
    const normalConditions = config
      // .filter((item: any) => {
      //   return item.type !== CONDITION_TYPES.CREATOR
      // })
      .map((item: any) => {
        if (item.type !== CONDITION_TYPES.CREATOR) {
          return item
        }
        return {
          fieldApiName: CREATOR_KEY,
          ...item
        }
      })
      .map(this.watchNormalCondition)
    if (normalConditions.length === 0) {
      normalConditions.push({
        type: CONDITION_TYPES.CREATOR,
        fieldApiName: CREATOR_KEY,
        values: []
      })
    }
    this.normalConditions = normalConditions
  }

  deleteCondition (index: number) {
    this.normalConditions = this.normalConditions.filter((item: any, i: number) => index !== i)
  }
}

</script>

<style lang="scss" scoped>
.drawer-condition {
  padding: 20px;

  .submit__user {
    width: 100%;
    border: 1px solid $dd--border-color-base;
    min-height: 40px;
    border-radius: 4px;
    display: flex;
    align-content: center;
    padding: 0 5px 2px;
    cursor: pointer;
  }

  /deep/ .el-form-item__label {
    /*line-height: 40px;*/
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

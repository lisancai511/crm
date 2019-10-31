<!--Created by LiuLei on 2019/10/8-->
<template>
  <div class="FdTransfer">
    <div class="fd-transfer__header-wrap">
      <div class="fd-transfer__header fd-transfer__header--left">
        <el-input
          v-if="filterable"
          size="small"
          v-model="searchVal"
          :placeholder="filterPlaceholder">
          <el-button slot="append"
                     type="primary"
                     icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="fd-transfer__header--center"></div>
      <div class="fd-transfer__header fd-transfer__header--right"></div>
    </div>
    <div class="fd-transfer__body-wrap">
      <div class="fd-transfer__body fd-transfer__body--left">
        <div class="fd-transfer__body__title">可选字段</div>
        <div class="fd-transfer__body__inner">
          <slot name="left-header"></slot>
          <div class="fd-transfer__body__main">
            <div class="fd-transfer__body__content">
              <el-checkbox-group v-model="checkedDataList">
                <el-checkbox v-for="item in data"
                             class="fd-transfer__item"
                             :label="item[key]"
                             v-show="!valueKey.includes(item[key]) && (item[label] || '').includes(searchVal)"
                             :key="item[key]">
                  <slot v-bind="item">
                    <the-item-label
                      :label="item[label]"/>
                  </slot>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="fd-transfer__body fd-transfer__body--center">
        <el-button type="primary"
                   :disabled="checkedDataList.length === 0"
                   class="fd-transfer__body--center__button"
                   @click="leftToRight"
                   icon="el-icon-arrow-right" circle></el-button>
        <el-button type="primary"
                   :disabled="checkedValueList.length === 0"
                   class="fd-transfer__body--center__button"
                   @click="rightToLeft"
                   icon="el-icon-arrow-left" circle></el-button>
      </div>
      <div class="fd-transfer__body fd-transfer__body--right">
        <div class="fd-transfer__body__title">已选字段</div>
        <div class="fd-transfer__body__inner">
          <slot name="right-header"></slot>
          <div class="fd-transfer__body__main">
            <el-checkbox-group v-model="checkedValueList">
              <draggable tag="div"
                         v-model="selectedData"
                         v-bind="dragOptions"
                         @start="isDragging = true"
                         @end="isDragging = false"
                         class="fd-transfer__body__content">
                <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
                  <el-checkbox v-for="item in selectedData"
                               class="fd-transfer__item"
                               :label="item[key]"
                               :key="item[key]">
                    <div class="el-checkbox__label__main">
                      <span class="el-checkbox__label__inner el-checkbox__label__inner--right">
                      <slot v-bind="item">
                        <the-item-label :label="item[label]"/>
                      </slot>
                    </span>
                      <span>
                      <i class="el-icon-sort-down"></i>
                      <i class="el-icon-sort-up"></i>
                    </span>
                    </div>
                    <slot name="itemRight" v-bind:itemRight="item"></slot>
                  </el-checkbox>
                </transition-group>
              </draggable>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TheItemLabel from '@/views/designer/components/Transfer/TheItemLabel.vue'

@Component({
  name: 'FdTransfer',
  components: { TheItemLabel }
})
export default class FdTransfer extends Vue {
  @Prop({ required: true, type: Array }) readonly data!: []
  @Prop({ required: true, type: Array }) readonly value!: []
  @Prop({ default: false, type: Boolean }) readonly filterable!: boolean
  @Prop({ default: '', type: String }) readonly filterPlaceholder!: string
  @Prop({
    default () {
      return {}
    },
    type: Object
  }) readonly props !: any

  checkedDataList: any[] = []
  checkedValueList: any[] = []
  isDragging = false
  searchVal = ''

  key = 'key'
  label = 'label'

  created () {
    const { key, label } = this.props
    if (key) {
      this.key = key
    }

    if (label) {
      this.label = label
    }
  }

  get valueKey () {
    return this.value.map((_: any) => _.key)
  }

  get selectedData () {
    return this.value
  }

  set selectedData (newVal) {
    this.$emit('input', newVal)
  }

  get dragOptions () {
    return {
      animation: 200,
      group: 'fd_transfer' + '_' + 'group',
      disabled: false,
      ghostClass: 'sort-box__item-ghost',
      dragClass: 'sort-box__item-drag'
    }
  }

  leftToRight () {
    const updatedVal = [
      ...this.value,
      ...this.data.filter((_: any) => this.checkedDataList.includes(_.key))
        .map((_: any) => {
          return {
            ..._,
            required: false
          }
        })
    ]
    this.$emit(
      'input',
      updatedVal
    )
    this.checkedDataList = []
  }

  rightToLeft () {
    const updatedVal = this.value.filter((_: any) => !this.checkedValueList.includes(_.key))
      .map((_: any) => {
        return {
          ..._,
          required: false
        }
      })
    this.$emit(
      'input',
      updatedVal
    )
    this.checkedValueList = []
  }
}
</script>

<style lang="scss" scoped>
.FdTransfer {
  /*border: 1px solid red;*/
  width: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  .fd-transfer {
    &__header {
      /*border: 1px solid blue;*/
      flex: 1;

      &-wrap {
        /*border: 1px solid green;*/
        display: flex;
        justify-content: space-between;
      }

      &--center {
        width: 56px;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;

      &--left, &--right {
        flex: 1;
      }

      &--center {
        width: 56px;
        padding-top: 41px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__button {
          margin: 15px 0 0;
          width: 22px;
          height: 22px;
          border-radius: 2px;
          padding: 0;

          &:first-child {
            margin-top: 0
          }
        }
      }

      &-wrap {
        flex: 1;
        display: flex;
        justify-content: space-between;
      }

      &__title {
        margin: 15px 0 10px;
      }

      &__inner {
        flex: 1;
        border: 1px solid rgba(217, 217, 217, 1);
        display: flex;
        flex-direction: column;
        /*padding: 15px;*/
      }

      &__main {
        flex: 1;
        /*border: 1px solid red;*/
        overflow-y: auto;
        position: relative;
      }

      &__content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        padding: 15px;
      }
    }

    &__item {
      padding-bottom: 10px;
      margin: 0;
      width: 100%;
      display: flex;
      align-items: center;

      /deep/ .el-checkbox__label {
        /*background-color: #FE723F;*/
        flex: 1;
        display: flex;
        overflow: hidden;
        align-items: center;
        justify-content: space-between;
      }

      .el-checkbox__label {
        &__main {
          /*background-color: red;*/
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;
        }
      }

      .el-checkbox__label {
        &__inner {
          &--right {
            width: 80%;
            /*vertical-align: bottom;*/
          }
        }
      }

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>

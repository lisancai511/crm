<!--Created by LiuLei on 2019/9/17-->
<template>
  <div class="fd-components-tab-follow-up">
    <el-tabs v-show="usedOptions.length > 0"
             v-model="activeName">
      <el-tab-pane
        lazy
        v-for="option in usedOptions"
        :key="option.id"
        :label="(followUpTypeById[option.id] || {}).v"
        :name="option.id">
        <div class="timeline__wrap">
          <div class="timeline__button-new timeline__button-new__wrap">
            <el-button
              v-if="usedButtonApiNames.includes(PredefinedButtonApiNames.new)"
              type="text">
              写跟进
            </el-button>
          </div>
          <el-timeline>
            <template v-for="(activity, index) in mockActivities">
              <el-timeline-item
                v-if="activity.type !== 'date'"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                size="large">
                <div class="timeline__item">
                  <div class="timeline__creator">
                 <span>
                    {{activity.creator}}
                 </span>
                    <div class="timeline__buttons">
                      <el-button
                        v-if="usedButtonApiNames.includes(PredefinedButtonApiNames.edit)"
                        type="text">
                        编辑
                      </el-button>
                      <el-button
                        v-if="usedButtonApiNames.includes(PredefinedButtonApiNames.delete)"
                        type="text">
                        删除
                      </el-button>
                    </div>
                  </div>
                  <div class="timeline__content">
                    {{(followUpTypeById[option.id] || {}).v + '=>' +activity.content}}
                  </div>
                  <p class="timeline__timestamp">
                    {{activity.timestamp}}
                  </p>
                </div>
              </el-timeline-item>
              <el-timeline-item
                :key="index"
                v-else>
                <div class="timeline__date">
                  <strong>
                    {{activity.date}}
                  </strong>
                </div>
                <div slot="dot" class="timeline__date-dot"></div>
              </el-timeline-item>
            </template>
          </el-timeline>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import designerStore from '@/store/modules/designer'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'

@Component({
  name: 'FdComponentsTabFollowUp'
})
export default class FdComponentsTabFollowUp extends Vue {
  @Prop({ type: Array, required: true }) readonly usedButtons!: any[]
  @Prop({ type: Array, required: true }) readonly usedOptions!: any[]

  activeName: string = ''

  get usedOptionIds () {
    return this.usedOptions.map((option: any) => option.id)
  }

  get usedButtonApiNames () {
    return this.usedButtons.map((button: any) => button.apiName)
  }

  get followUpTypeById () {
    return designerStore.followUpTypeById
  }

  get PredefinedButton () {
    return PredefinedButtonApiNames
  }

  get mockActivities () {
    return [
      {
        type: 'date',
        date: '今天'
      },
      {
        creator: 'Richard',
        content: '和客户仔细了了一下酷酷的看看辅的第三方付奋斗奋斗发过给酷的看看辅的第三方 导费简档可快递费离开',
        timestamp: '2018-04-12 20:46',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        creator: '严老师',
        content: '客户刚微信咨询我平台的技术安全性问题。',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      },
      {
        type: 'date',
        date: '2019-08-29'
      }, {
        creator: '严老师',
        content: '和客户仔细了了一下酷酷的看看辅的第三方付奋斗奋斗发过给 导费简档可快递费离开奥比岛坤彩科技萨比超级卡大白菜ad金卡价垃圾啊劳动纪律卡机看到了；大家；拉卡的口岸看懂快乐大道理；安静的；安静。',
        timestamp: '2018-04-03 20:46'
      }, {
        creator: '严老师',
        content: '客户刚微信咨询我平台的技术安全性问题。',
        timestamp: '2018-04-03 20:46'
      }
    ]
  }

  @Watch('usedOptionIds', { immediate: true })
  onChangeUsedOptions (val: string[]) {
    if (!val.includes(this.activeName)) {
      this.activeName = val[0] || ''
    }
  }

  created () {
    designerStore.getFollowUpTypes()
  }
}
</script>

<style lang="scss" scoped>
.fd-components-tab-follow-up {
  position: relative;
  min-height: 200px;
  height: 100%;

  .timeline {
    &__wrap {
    }

    &__button {
      &-new {
        &__wrap {
          height: 40px;
          padding-left: 40px;
        }
      }
    }

    &__creator {
      margin: 0 0 10px;
      padding-top: 2px;
    }
    &__buttons{
      /*display: inline-block;*/
      display: none;
      >.el-button{
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &__item{
      &:hover{
        .timeline__buttons{
          display: inline-block;
        }
      }
    }

    &__content {
      color: $dd--color-text-secondary;
    }

    &__timestamp {
      color: $dd--color-text-secondary;
      margin: 5px 0 0 0;
    }

    &__date-dot {
      width: 6px;
      height: 6px;
      background: rgba(58, 133, 255, 1);
      opacity: 0.6;
      border-radius: 6px;
      margin-left: 2px;
    }

    &__date {
      background: rgba(245, 245, 245, 1);
      display: inline-block;
      padding: 2px;
      margin-top: -10px;
    }
  }
}
</style>

<template>
  <div>
    <el-card style="min-height: calc(100vh - 150px)">
      <div v-if="show" class="typeRecordAdd">
        <div @click="$router.go(-1)" class="close">
          <dd-icon name="close"/>
        </div>
        <h3 style="margin:10px 0 25px">
          分配页面布局
        </h3>
        <div class="typeRecordAdd_main">
          <span style="margin-bottom:8px">布局名称</span>
          <el-input v-model="layout.name"
                    style="margin-bottom:23px;width:360px;"
                    placeholder="请输入内容"></el-input>
          <el-radio v-if="!$route.query.lay" style="margin-bottom:8px"
                    v-model="createType"
                    :disabled="layouts.length === 0"
                    :label="createTypes.COPY">
            从现有的布局复制
          </el-radio>
          <el-select v-if="!$route.query.lay" style="margin-bottom:23px;width:360px;"
                     v-model="layout.copyFrom"
                     :disabled="layouts.length === 0"
                     placeholder="请选择">
            <el-option
              v-for="layout in layouts"
              :key="layout.value"
              :label="layout.name"
              :value="layout.id">
            </el-option>
          </el-select>
          <el-radio v-if="!$route.query.lay" style="margin-bottom:40px"
                    v-model="createType"
                    :label="createTypes.CREATE">
            不复制，直接新建
          </el-radio>
          <span style="margin-bottom:8px">描述</span>
          <el-input type="textarea"
                    :rows="6"
                    style="width: 1000px"
                    placeholder="请输入描述内容"
                    v-model="layout.description"></el-input>
        </div>
      </div>
      <div v-else class="typeRecordAdd">
        <ChooseLay :data="layout"></ChooseLay>
      </div>
      <el-button v-show="show" @click="nextStep" class="m-t-30" type="primary">下一步</el-button>
      <el-button @click="()=>{$router.go(-1)}" type="primary">返回</el-button>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import nanoid from 'nanoid'
import lodash from 'lodash'
import ChooseLay from './components/Geography/ChooseLay.vue'

enum createTypes {
  COPY,
  CREATE
}

@Component({
  name: 'NewLay',
  components: {
    ChooseLay
  }
})
export default class NewLay extends Vue {
  layouts: any = []
  show: boolean = true
  createType = createTypes.COPY
  layout: any = {
    name: `布局_${nanoid(6)}`,
    description: '',
    copyFrom: null
  }

  get createTypes () {
    return createTypes
  }

  get objectId () {
    return this.$attrs.objectId
  }

  get lay () {
    return this.$route.query.lay
  }

  created () {
    this.getLayouts()
    if (this.lay) {
      const lay = decodeURIComponent(this.lay as any)
      this.layout = lodash.cloneDeep(JSON.parse(lay))
    }
  }

  async getLayouts () {
    try {
      const { data: { data } } = await Api.bizObjects.getLayouts(this.objectId as string)
      this.layouts = data
    } catch (e) {
      console.error(e)
    }
  }

  async nextStep () {
    // if (this.createType === this.createTypes.CREATE) {
    //   Reflect.deleteProperty(this.layout, 'copyFrom')
    //   this.show = !this.show
    // } else {
    if (this.lay) {
      try {
        Reflect.deleteProperty(this.layout, 'flag')
        await Api.bizObjects.updateLayouts(this.objectId, this.layout.id, this.layout)
        await this.$router.push({
          path: '/designer',
          query: {
            layoutId: this.layout.id,
            objectId: this.objectId
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const { data: { data: { id: layoutId } } } =
          await Api.bizObjects.addLayouts(this.objectId, this.layout)
        await this.$router.push({
          path: '/designer',
          query: {
            layoutId,
            objectId: this.objectId
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  // }
}
</script>
<style lang="scss" scoped>
.dd-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(34, 45, 62, 1);
  line-height: 20px;
  margin: 0 0 8px;
}

.typeRecordAdd {
  display: flex;
  flex-direction: column;
  position: relative;
  &_main {
    display: flex;
    flex-direction: column;
  }
}
.close {
  position: absolute;
  right: 0;
  cursor: pointer;
}
</style>

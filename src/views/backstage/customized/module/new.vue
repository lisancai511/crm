import { ModuleType } from '@/types/common'
<!--Created by LiuLei on 2019/11/6-->
<template>
  <div class="NewMenu">
    <el-card>
      <div slot="header">
        <strong class="fs-18">{{menuModule.id ? '编辑' : '新建'}}模块</strong>
      </div>
      <el-form
        ref="menuForm"
        :model="menuModule"
        :rules="rules">
        <el-form-item prop="bizObjectId" label="对象">
          <el-select
            :disabled="!!menuModule.id"
            placeholder="请选择"
            v-model="menuModule.bizObjectId">
            <el-option
              v-for="object in filterObjects"
              :key="object.id"
              :value="object.id"
              :label="object.name"
            >{{object.name}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="模块名称">
          <el-input v-model="menuModule.name"/>
        </el-form-item>
        <el-form-item prop="iconUrl" label="图标">
          <icon-select-dialog
            v-model="menuModule.iconUrl"
            :icon-names="iconNames">
            <dd-icon v-if="menuModule.iconUrl" :full-name="menuModule.iconUrl"/>
            <dd-icon v-else name="add"></dd-icon>
          </icon-select-dialog>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" rows="6" v-model="menuModule.description"/>
        </el-form-item>
        <div class="dd-text-center">
          <el-button :loading="saving" @click="saveMenu" type="primary">保存</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IServerObject } from '@/store/modules/backstage/modules/customized'
import { IDD } from '@/types/common'
import IconSelectDialog from '@/components/IconSelectDialog.vue'
import api from '@/api'
import { iconMaps } from '@/assets/icon'
import PredefinedObjectApiNames from '@/views/designer/config/PredefinedObjectApiNames'

const initModule: IDD.IModule = {
  name: '',
  description: '',
  type: 'BizObject',
  bizObjectId: '',
  custPageUri: null,
  iconUrl: '',
  approvalFlowId: null
}

@Component({
  name: 'NewModule',
  components: { IconSelectDialog }
})
export default class NewModule extends Vue {
  saving: boolean = false

  iconNames: any[] = []

  get modules () {
    return this.$store.state.backstage.customized.modules
  }

  get usedObjectIds (): any[] {
    return this.modules.map((module: any) => module.bizObjectId)
  }

  get rules () {
    return {
      bizObjectId: [
        {
          required: true,
          message: '请选择对象',
          trigger: 'change'
        }
      ],
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ],
      iconUrl: [
        {
          required: true,
          message: '请选择图标',
          trigger: 'change'
        }
      ]
    }
  }

  menuModule = {
    ...initModule
  }

  get objects (): IServerObject[] {
    return this.$store.getters['backstage/customized/objects']
  }

  get filterObjects (): IServerObject[] {
    if (this.menuModule.id) {
      return this.objects
    }
    return this.objects
      .filter((object: IServerObject) =>
        !this.usedObjectIds.includes(object.id) &&
        ![PredefinedObjectApiNames.user as string].includes(object.apiName))
  }

  @Watch('menuModule.iconUrl', { deep: true })
  onGroupFormChange () {
    this.$nextTick(() => {
      (this.$refs as any).menuForm.validate()
    })
  }

  created () {
    api.utils.getIconNames(iconMaps.app).then((res: any) => {
      this.iconNames = res
    })
    try {
      if (this.modules.length === 0) {
        this.$store.dispatch('backstage/customized/getModules')
      }
      if (this.$route.query.module) {
        this.menuModule = JSON.parse(decodeURIComponent(this.$route.query.module as string))
      }
    } catch (e) {
      console.log(e)
    }
    if (this.objects.length === 0) {
      this.$store.dispatch('backstage/customized/getObjects')
    }
  }

  saveMenu () {
    this.$nextTick(() => {
      (this.$refs as any).menuForm.validate(async (valid: boolean) => {
        if (valid) {
          try {
            const isEdit = this.menuModule.id
            this.saving = true
            if (isEdit) {
              await this.$store.dispatch('backstage/customized/putModule', this.menuModule)
            } else {
              await this.$store.dispatch('backstage/customized/newModule', this.menuModule)
            }
            await this.$router.go(-1)
          } catch (e) {
            console.error(e)
          } finally {
            this.saving = false
          }
        }
      })
    })
  }
}

</script>

<style lang="scss" scoped>
.el-form {
  .el-select {
    width: 100%;
  }
}
</style>

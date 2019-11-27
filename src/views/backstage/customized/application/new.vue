<!--Created by LiuLei on 2019/11/6-->
<template>
  <div class="NewApplication">
    <el-card>
      <div slot="header">
        <strong class="fs-18">{{app.id ? '编辑':'新建'}}应用程序</strong>
      </div>
      <el-form ref="appForm" :model="app" :rules="rules">
        <!--<el-row :gutter="130">
          <el-col :span="12">
            <el-form-item label="应用程序标签">
              <el-input v-model="app.apiName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用程序名称">
              <el-input v-model="app.name"/>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-form-item prop="name" label="应用程序名称">
          <el-input v-model="app.name"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" rows="6" v-model="app.description"/>
        </el-form-item>
        <div class="m-t-30 m-b-30 fs-16">
          <strong>选择要包括在此自定义应用程序菜单中的模块</strong>
        </div>
        <div class="menus__wrap">
          <div class="menus__box">
            <p class="m-t-0">
              <span>显示的菜单</span>
              <el-button
                @click="newMenuSection()"
                class="fr button__new p-v-0"
                type="text">新建分组
              </el-button>
            </p>
            <draggable
              handle=".draggable-handle"
              @start="drag = true"
              @end="drag = false"
              ghostClass="menu-ghost-class"
              dragClass="menu-drag-class"
              :move="moveMenus"
              v-bind="draggableUsedOptions"
              v-model="app.menus"
              tag="div"
              class="menus__outline">
              <transition-group
                tag="div"
                class="transition-group menus__section__container"
                type="transition" :name="!drag ? 'flip-list' : null">
                <template
                  v-for="node in app.menus"
                >
                  <div
                    :key="node.moduleId"
                    v-if="node.group"
                    class="menus__section p-l-15">
                    <p class="m-b-0 m-t-5">
                      <strong>
                        <dd-icon :full-name="node.iconUrl"/>
                        {{node.name}}
                      </strong>
                      <dd-icon
                        @click.native="deleteMenuSection(node)"
                        name="delete"
                        class="m-r-15 fr dd-click"/>
                      <dd-icon
                        @click.native="newMenuSection(node)"
                        name="edit"
                        class="m-r-15 fr dd-click"/>
                      <dd-icon
                        name="change1" class="m-r-10 fl draggable-handle"/>
                    </p>
                    <div class="menus__section-body p-l-30">
                      <div
                        v-if="node.children.length === 0"
                        class="menus__section-empty">
                        请拖入模块
                      </div>
                      <draggable
                        @start="drag = true"
                        @end="drag = false"
                        ghostClass="menu-ghost-class"
                        dragClass="menu-drag-class"
                        tag="ul"
                        v-bind="draggableUsedMenusOptions"
                        v-model="node.children"
                        class="menus">
                        <transition-group
                          class="transition-group"
                          tag="div"
                          type="transition"
                          :name="!drag ? 'flip-list' : null">
                          <li
                            class="menus__item"
                            :key="menu.moduleId"
                            v-for="menu in node.children">
                            <dd-icon :full-name="menu.iconUrl"/>
                            {{menu.name}}
                          </li>
                        </transition-group>
                      </draggable>
                    </div>
                  </div>
                  <li
                    v-else
                    class="menus__item draggable-handle"
                    :key="node.moduleId">
                    <dd-icon :full-name="node.iconUrl"/>
                    {{node.name}}
                  </li>
                </template>
              </transition-group>
            </draggable>
          </div>
          <div class="menus__box">
            <p class="m-t-0">可用模块</p>
            <div class="menus__outline">
              <!--<draggable
                tag="div"
                v-bind="draggableButtonsOptions"
              >
              </draggable>-->
              <draggable
                ghostClass="menu-ghost-class"
                dragClass="menu-drag-class"
                tag="ul"
                v-model="modules"
                v-bind="draggableMenusOptions"
                style="height: 100%"
                class="menus">
                <li
                  class="menus__item"
                  :key="module.moduleId"
                  v-for="module in modules">
                  <dd-icon :full-name="module.iconUrl"/>
                  {{module.name}}
                </li>
              </draggable>
            </div>
          </div>
        </div>
        <div class="m-t-30 m-b-30 fs-16">
          <strong>分配角色</strong>
        </div>
        <div class="roles__wrap">
          <div
            class="roles__item roles__tr">
            <div style="display: flex;align-items: center;justify-content: center">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange">
                (全选) 可见
              </el-checkbox>
            </div>
            <div>角色</div>
          </div>
        </div>
        <el-checkbox-group
          class="roles__wrap"
          v-model="app.authorizedRoles">
          <div
            class="roles__item  roles__item-content"
            v-for="role in roles"
            :key="role.id">
            <el-checkbox
              :label="role.id">{{role.name}}
            </el-checkbox>
            <div v-show="false"></div>
          </div>
        </el-checkbox-group>
        <div class="dd-text-center">
          <el-button @click="saveApp" type="primary" :loading="saving">保存</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      @closed="closedDialog"
      title="新建分组"
      width="30%"
      :visible.sync="visibleDialog">
      <el-form
        ref="groupForm"
        :model="groupForm">
        <el-form-item
          :rules="{required: true,message:'请选择分组图标'}"
          prop="iconUrl"
          label="请选择分组图标">
          <icon-select-dialog
            v-model="groupForm.iconUrl"
            :icon-names="iconNames">
            <dd-icon v-if="!groupForm.iconUrl" name="add"></dd-icon>
            <dd-icon v-else :full-name="groupForm.iconUrl"></dd-icon>
          </icon-select-dialog>
        </el-form-item>
        <el-form-item
          :rules="{required: true,message:'请输入分组名称'}"
          prop="name"
          label="请输入分组名称">
          <el-input v-model="groupForm.name"/>
        </el-form-item>
      </el-form>
      <div class="dd-text-center">
        <el-button @click="visibleDialog=false">取消</el-button>
        <el-button
          @click="submitNewMenuSection"
          type="primary">确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import nanoid from 'nanoid'
import { ISRole } from '@/store/modules/backstage'
import { IDD } from '@/types/common'
import _ from 'lodash'
import api from '@/api'
import IconSelectDialog from '@/components/IconSelectDialog.vue'
import { app as iconNames } from '@/assets/icon-names'

const initGroupForm = {
  moduleId: '',
  group: true,
  iconUrl: '',
  name: '',
  children: []
}

@Component({
  name: 'NewApplication',
  components: { IconSelectDialog }
})
export default class NewApplication extends Vue {
  saving: boolean = false
  app: IDD.IApplication = {
    name: '',
    description: '',
    menus: [],
    uuid: nanoid(),
    homepageType: 'Cutomized',
    homepageUrl: '',
    standard: false,
    authorizedRoles: []
  }
  modules: IDD.ISModule[] = []

  visibleDialog: boolean = false

  drag: boolean = false
  checkAll: boolean = false
  isIndeterminate: boolean = true

  groupForm: any = {
    ...initGroupForm
  }

  @Watch('groupForm', { deep: true })
  onGroupFormChange () {
    this.$nextTick(() => {
      (this.$refs as any).groupForm.validate()
    })
  }

  get iconNames () {
    return iconNames
  }

  get appId () {
    return this.$attrs.appId
  }

  get draggableUsedOptions () {
    return {
      sort: false,
      group: 'menu'
    }
  }

  get draggableMenusOptions () {
    return {
      sort: false,
      group: 'menu'
    }
  }

  get draggableUsedMenusOptions () {
    return {
      group: 'menu'
    }
  }

  get roles (): ISRole[] {
    return this.$store.state.backstage.roles
  }

  get rules () {
    return {
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }
      ]
    }
  }

  async created () {
    const modules = this.$store.state.backstage.customized.modules
    const [
      , , {
        data: {
          data: app
        }
      }
    ] = await Promise.all([
      this.roles.length === 0 ? this.$store.dispatch('backstage/getRoles') : Promise.resolve(),
      modules.length === 0 ? this.$store.dispatch('backstage/customized/getModules') : Promise.resolve(),
      this.appId ? api.metaData.getApp(this.appId) : Promise.resolve({ data: { data: this.app } })
    ])

    const menuIds: string[] = []

    this.modules = this.$store.state.backstage.customized.modules
      .map((module: IDD.ISModule) => {
        return {
          ...module,
          moduleId: module.id
        }
      })

    const moduleById = this.$store.getters['backstage/customized/moduleById']

    app.authorizedRoles = app.authorizedRoles || []
    app.menus = app.menus.map((node: IDD.IMenu) => {
      if (!node.moduleId) {
        node.moduleId = nanoid(6)
      } else {
        menuIds.push(node.moduleId)
        node.name = (moduleById[node.moduleId] || {}).name
      }
      if (node.children) {
        node.children = node.children.map((menu: IDD.IMenu) => {
          menuIds.push(menu.moduleId as string)
          // TODO 如果 module 被删除了会怎么样
          return {
            ...menu,
            name: (moduleById[menu.moduleId as string] || {}).name
          }
        })
      }
      return node
    })
    this.modules = this.modules.filter((module: IDD.ISModule) => !menuIds.includes(module.id))
    this.app = app
  }

  moveMenus (evt: any) {
    const group = evt.draggedContext.element.group
    if (group) {
      if (!evt.to.className.includes('menus__section__container')) {
        return false
      }
    }
  }

  newMenuSection (section?: any) {
    // TODO 初始化GROUP
    // this.$prompt('请输入分组名称', '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   inputPattern: /\S/,
    //   inputValue: section ? section.name : '',
    //   inputErrorMessage: '请输入分组名称'
    // }).then((data: any) => {
    //   if (section) {
    //     section.name = data.value
    //   } else {
    //     this.app.menus.unshift({
    //       moduleId: nanoid(8),
    //       group: true,
    //       iconUrl: 'dd-icon-app-aixin',
    //       name: data.value,
    //       children: []
    //     })
    //   }
    // })
    if (section) {
      this.groupForm = section
    }
    this.visibleDialog = true
  }

  submitNewMenuSection () {
    this.$nextTick(() => {
      (this.$refs as any).groupForm.validate((valid: boolean) => {
        if (valid) {
          if (!this.groupForm.moduleId) {
            this.app.menus.unshift({
              ...this.groupForm,
              moduleId: nanoid(8)
            })
          }
          this.visibleDialog = false
        }
      })
    })
  }

  closedDialog () {
    this.groupForm = {
      ...initGroupForm
    }
  }

  deleteMenuSection (section?: any) {
    console.log(section)
    this.app.menus = this.app.menus.filter((node: any) => {
      return section.moduleId !== node.moduleId
    })
  }

  async saveApp () {
    await (this.$refs as any).appForm.validate(async (valid: boolean) => {
      if (valid) {
        const isEdit = this.app.id
        this.saving = true
        const app = _.cloneDeep(this.app)
        app.menus = this.app.menus.map((node: IDD.IMenu) => {
          if (node.group) {
            return {
              group: true,
              name: node.name,
              iconUrl: node.iconUrl,
              children: (node.children as IDD.IMenu[]).map((menu: IDD.IMenu) => {
                return {
                  group: false,
                  moduleId: menu.moduleId
                }
              })
            }
          }
          return {
            group: false,
            moduleId: node.moduleId
          }
        })
        try {
          if (isEdit) {
            await this.$store.dispatch('backstage/customized/putApp', app)
          } else {
            await this.$store.dispatch('backstage/customized/newApp', app)
          }
          this.$router.go(-1)
        } catch (e) {
          console.error(e)
        } finally {
          this.saving = false
        }
      }
    })
  }

  handleCheckAllChange (val: any) {
    this.app.authorizedRoles = val ? this.roles.map((role: any) => role.id) : []
    this.isIndeterminate = false
  }

  handleCheckedCitiesChange (value: any) {
    let checkedCount = value.length
    this.checkAll = checkedCount === this.app.authorizedRoles.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
  }
}

</script>

<style lang="scss" scoped>
.menus {
  padding: 0;
  margin: 0 auto;
  position: relative;

  &__item {
    line-height: 2;
    user-select: none;
    list-style: none;
    padding-left: 15px;
    cursor: move;
  }

  &__wrap {
    display: flex;
    justify-content: flex-start;
    max-width: 800px;
  }

  &__box {
    flex: 1;
    min-height: 500px;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-left: 56px;
    }
  }

  &__outline {
    border: 1px solid rgba(217, 217, 217, 1);
    flex: 1;
    position: relative;
  }

  &__section {
    border: 1px $dd--info-color dashed;
    user-select: none;

    &-wrap {
    }

    &-empty {
      position: absolute;
      left: -15px;
      right: 0;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: $dd--color-text-secondary;
    }

    &-body {
      position: relative;
    }
  }
}

.roles__wrap {
  > .el-checkbox {
    display: block;
  }

  .roles__item {
    &.roles__tr {
      height: 36px;
      display: flex;
      align-items: center;

      /deep/ .el-checkbox__input {
        border-bottom: none !important;
      }

      /deep/ .el-checkbox__label {
        border-bottom: none !important;
      }

      > div {
        background: rgba(248, 250, 252, 1);
        height: 100%;
        line-height: 36px;
        text-align: center;

        &:first-child {
          width: 130px;
          border-right: 1px solid rgba(230, 230, 230, 1);
        }

        &:last-child {
          width: 150px;
        }
      }
    }

    .el-checkbox {
      display: flex;
      align-items: center;
    }

    &-content {
      /deep/ .el-checkbox__input {
        height: 40px;
        width: 130px;
        border: 1px solid rgba(230, 230, 230, 1);
        border-bottom: none;
        text-align: center;
        line-height: 40px;
      }

      /deep/ .el-checkbox__label {
        width: 150px;
        border: 1px solid rgba(230, 230, 230, 1);
        border-bottom: none;
        border-left: none;
        height: 40px;
        line-height: 40px;
      }
    }

    &:last-child {
      /deep/ .el-checkbox__label, /deep/ .el-checkbox__input {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
    }
  }
}

.draggable-handle {
  cursor: move;
}

.transition-group {
  height: 100%;
  min-height: 100px;
  /*background: #0CBB5E;*/
}

.menu-drag-class {
  background-color: rgba($dd--primary-color, .5);
}

.menu-ghost-class {
  background: rgba($dd--info-color, 0.5);
  height: auto;
}

.button__new {
  &.menu-drag-class {
    background-color: rgba($dd--primary-color, .5);
  }

  &.menu-ghost-class {
    background: rgba($dd--info-color, 0.5);
    height: auto;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>

<template>
  <div>
    <el-card class="main">
      <div class="main_title fs-18">选择</div>
      <div class="main_body">
        <div class="main_body_left">
          <div>选择:</div>
          <div class="main_body_left_main m-t-10">
            <el-input class="m-t-10"
                      v-model="input"
                      placeholder="请输入内容"/>
            <div
              v-if="!mode"
              class="main_body_left_main_tabs">
              <div
                :class="{'is-active':activeTab===TAB_TYPES.ORG}"
                @click="activeTab=TAB_TYPES.ORG">
                组织架构
              </div>
              <div
                :class="{'is-active':activeTab===TAB_TYPES.ROLE}"
                @click="activeTab=TAB_TYPES.ROLE">
                角色列表
              </div>
            </div>
            <div
              v-if="activeTab === TAB_TYPES.ORG && ([false,MODE_TYPES.ORG_USER,MODE_TYPES.ORG,MODE_TYPES.USER,''].includes(mode))">
              <div class="main_body_left_main_breadcrumb">
                <el-breadcrumb class="m-t-10 fs-12"
                               separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item class="active">通讯录</el-breadcrumb-item>
                  <el-breadcrumb-item :class="index !== breadcrumbList.length-1?'active':null"
                                      v-for="(item,index) in breadcrumbList"
                                      @click.native="changeBread(item,index)"
                                      :key="item.id">{{item.name}}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="main_body_left_main_checkbox">
                <el-checkbox v-model="all"
                             @change="chooseAll">全选
                </el-checkbox>
                <el-checkbox-group v-if="[false,MODE_TYPES.ORG_USER,MODE_TYPES.ORG].includes(mode)"
                                   v-model="newOrgIdList">
                  <el-checkbox v-show="filterReg(item)"
                               v-for="item in activeData.children"
                               :key="item.id"
                               class="checkbox"
                               :label="item.id">
                    <dd-icon name="home"/>
                    {{item.name}}
                    <dd-icon class="rightIcon"
                             v-if="item.users && newOrgIdList.indexOf(item.id)===-1"
                             @click.native="changeChildren($event,item)"
                             name="edit"/>
                  </el-checkbox>
                </el-checkbox-group>
                <div v-if="[MODE_TYPES.USER].includes(mode)">
                  <div v-for="item in activeData.children"
                       :key="item.id"
                       class="onlyChoosePeople">
                    <dd-icon name="home"/>
                    {{item.name}}
                    <dd-icon class="rightIcon"
                             v-if="item.users && newOrgIdList.indexOf(item.id)===-1"
                             @click.native="changeChildren($event,item)"
                             name="edit"/>
                  </div>
                </div>
                <el-checkbox-group class="m-b-20"
                                   v-model="newPeopleIdList">
                  <el-checkbox v-show="filterReg(item)"
                               v-for="item in activeData.users"
                               :key="item.id"
                               class="checkbox"
                               :label="item.id">
                    <dd-icon name="man"/>
                    {{item.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div
              v-if="activeTab === TAB_TYPES.ROLE && [false,MODE_TYPES.ROLE,''].includes(mode)"
              class="main_body_left_main_chooseRole m-t-20">
              <el-checkbox @change="chooseAllRule">全选</el-checkbox>
              <el-checkbox-group v-model="newRoleIdList">
                <el-checkbox v-show="filterReg(item)"
                             v-for="item in roleList"
                             :key="item.id"
                             class="checkbox"
                             :label="item.id">
                  <dd-icon name="group"/>
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <div class="m-t-20 main_body_left_main_role">
            <el-button @click="saveData(true)"
                       style="float:right"
                       class="m-r-30"
                       type="primary">确定
            </el-button>
          </div>
        </div>

        <div class="main_body_right">
          <div>已选:</div>
          <div class="main_body_right_main m-t-10">
            <el-tag :key="tag"
                    class="m-r-5 m-t-5 tag"
                    v-for="tag in newOrgIdList"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              <dd-icon name="home"/>
              {{filterOrg(tag)}}
            </el-tag>
            <el-tag :key="tag"
                    class="m-r-5 m-t-5 tag"
                    v-for="(tag) in newRoleIdList"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseRole(tag)">
              <dd-icon name="group"/>
              {{filterRole(tag)}}
            </el-tag>
            <el-tag :key="tag"
                    class="m-r-5 m-t-5 tag"
                    v-for="(tag) in newPeopleIdList"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseOrg(tag)">
              <dd-icon name="man"/>
              {{filterPeople(tag)}}
            </el-tag>
          </div>
          <div class="m-t-20">
            <el-button @click="cancel"
                       class="m-l-10">取消
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Api from '@/api'
import lodash from 'lodash'

enum MODE_TYPES {
  ORG = 'org',
  USER = 'user',
  ORG_USER = 'orguser',
  ROLE = 'role'
}

@Component({
  name: 'UserSelect'
})
export default class UserSelect extends Vue {
  @Prop({ type: [String, Boolean], default: '' }) readonly mode !: MODE_TYPES | boolean
  @Prop({ type: Boolean, default: true }) readonly multi!: boolean
  @Prop() private orgIdList!: any[]
  @Prop() private peopleIdList!: any[]
  @Prop() private roleIdList!: any[]
  input: any = ''
  all: boolean = false
  activeTab: string = ''
  tableData: any = []
  activeData: any = {}
  newPeopleIdList: any = []
  newRoleIdList: any = []
  newOrgIdList: any = []
  orgList: any = []
  roleList: any = []
  peopleList: any = []
  breadcrumbList: any = []

  get MODE_TYPES () {
    return MODE_TYPES
  }

  get TAB_TYPES () {
    return {
      ORG: 'ORG',
      ROLE: 'ROLE'
    }
  }

  created () {
    if (this.orgIdList) {
      this.newOrgIdList = lodash.cloneDeep(this.orgIdList)
    }
    if (this.peopleIdList) {
      this.newPeopleIdList = lodash.cloneDeep(this.peopleIdList)
    }
    if (this.roleIdList) {
      this.newRoleIdList = lodash.cloneDeep(this.roleIdList)
    }
  }

  mounted () {
    if (this.mode === this.MODE_TYPES.ROLE) {
      this.activeTab = this.TAB_TYPES.ROLE
    } else {
      this.activeTab = this.TAB_TYPES.ORG
    }
    this.getData()
  }

  saveData (val: any) {
    this.$emit('chooseDone', {
      orgIdList: this.newOrgIdList,
      peopleIdList: this.newPeopleIdList,
      roleIdList: this.newRoleIdList,
      value: val
    })
    this.$emit('submit', {
      orgIds: this.newOrgIdList,
      userIds: this.newPeopleIdList,
      roleIds: this.newRoleIdList
    })
  }

  cancel () {
    this.$emit('cancel')
  }

  filterReg (item: any) {
    if (this.input) {
      return item.name.indexOf(this.input) > -1
    } else {
      return true
    }
  }

  chooseAll (val: any) {
    if (val) {
      this.activeData.users.forEach((item: any) => {
        if (this.newPeopleIdList.indexOf(item.id) === -1) {
          this.newPeopleIdList.push(item.id)
        }
      })
      this.activeData.children.forEach((item: any) => {
        if (this.newOrgIdList.indexOf(item.id) === -1) {
          this.newOrgIdList.push(item.id)
        }
      })
    } else {
      this.activeData.users.forEach((item: any) => {
        this.newPeopleIdList = this.newPeopleIdList.filter((item0: any) => {
          return item0 !== item.id
        })
      })
      this.activeData.children.forEach((item: any) => {
        this.newOrgIdList = this.newOrgIdList.filter((item0: any) => {
          return item0 !== item.id
        })
      })
    }
  }

  chooseAllRule (val: any) {
    if (val) {
      this.roleList.forEach((item: any) => {
        if (this.newRoleIdList.indexOf(item.id) === -1) {
          this.newRoleIdList.push(item.id)
        }
      })
    } else {
      this.newRoleIdList = []
    }
  }

  changeBread (item: any, index: any) {
    if (index === this.breadcrumbList.length - 1) {
    } else {
      this.breadcrumbList.splice(index + 1, this.breadcrumbList.length - index)
      this.activeData = item
    }
  }

  get tenantId () {
    return this.$store.state.user.tenantId
  }

  changeChildren (e: any, item: any) {
    e.preventDefault()
    if (this.newOrgIdList.indexOf(item.id) === -1) {
      this.all = false
      this.breadcrumbList.push(item)
      this.activeData = lodash.cloneDeep(item)
      this.$nextTick(() => {
        this.newPeopleIdList = lodash.cloneDeep(this.newPeopleIdList)
        this.$forceUpdate()
      })
    }
  }

  handleClose (tag: any) {
    this.newOrgIdList = this.newOrgIdList.filter((item: any) => {
      return item !== tag
    })
  }

  handleCloseOrg (tag: any) {
    this.newPeopleIdList = this.newPeopleIdList.filter((item: any) => {
      return item !== tag
    })
  }

  handleCloseRole (tag: any) {
    this.newRoleIdList = this.newRoleIdList.filter((item: any) => {
      return item !== tag
    })
  }

  filterOrg (id: any) {
    let str = null
    this.orgList.forEach((item: any) => {
      if (item.id === id) {
        str = item.name
      }
    })
    return str
  }

  filterPeople (id: any) {
    let str = null
    this.peopleList.forEach((item: any) => {
      if (item.id === id) {
        str = item.name
      }
    })
    return str
  }

  filterRole (id: any) {
    let str = null
    this.roleList.forEach((item: any) => {
      if (item.id === id) {
        str = item.name
      }
    })
    return str
  }

  getList (data: any) {
    this.peopleList = [...this.peopleList, ...data.users]
    if (data.children) {
      this.orgList = [...this.orgList, ...data.children]
      data.children.forEach((item: any) => {
        if (item.children) {
          this.getList(item)
        }
      })
    }
  }

  async getData () {
    const {
      data: { data }
    } = await Api.mainData.getUsersFromOrg({ orgId: this.tenantId, all: true })
    const res = await Api.mainData.getRoles()
    this.roleList = res.data.data
    this.tableData = data
    this.activeData = data
    this.breadcrumbList.push(data)
    this.getList(this.tableData)
  }

  @Watch('peopleIdList', { immediate: true })
  onPeopleChange (val: any) {
    this.newPeopleIdList = val || []
  }

  @Watch('roleIdList', { immediate: true })
  onRoleIdList (val: any) {
    this.newRoleIdList = val || []
  }

  @Watch('orgIdList', { immediate: true })
  onOrgIdList (val: any) {
    this.newOrgIdList = val || []
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__body {
  padding: 0;
}

.main {
  width: 600px;

  &_title {
    height: 60px;
    width: 100%;
    background: #eceff4;
    text-align: center;
    line-height: 60px;
  }

  &_body {
    padding: 20px;
    height: 520px;
    display: flex;

    &_left {
      width: 52%;

      &_main {
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #dedede;
        background: #f4f6f8;
        margin-right: 20px;
        height: 362px;
        overflow: hidden;

        &_tabs {
          display: flex;
          background: #e7eaef;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          overflow: hidden;

          > div {
            width: 50%;
            text-align: center;
            cursor: pointer;

            &.is-active {
              background: $dd--primary-color;
              color: #fff;
            }
          }
        }

        &_breadcrumb {
          white-space: nowrap;
          width: 100%;
          overflow-x: scroll;
          padding-bottom: 5px;

          .active {
            color: $dd--info-color;

            /deep/ .el-breadcrumb__inner {
              color: $dd--info-color;
              cursor: pointer;
            }

            cursor: pointer;
          }
        }

        &_checkbox {
          overflow: hidden;
          height: 230px;
          overflow-y: scroll;
        }

        &_chooseRole {
          overflow: hidden;
          height: 270px;
          overflow-y: scroll;
        }

        .checkbox {
          display: block;
          position: relative;
          width: 100%;
          margin: 8px 0;

          .rightIcon {
            position: absolute;
            right: 5px;
          }
        }

        .onlyChoosePeople {
          display: block;
          position: relative;
          width: 100%;
          margin: 8px 0;
          color: #606266;
        }
      }
    }

    &_right {
      width: 48%;

      &_main {
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #dedede;
        background: #f4f6f8;
        height: 362px;
        overflow-y: scroll;

        .tag {
          width: 100%;
          display: block;
        }
      }
    }
  }
}

/deep/ .el-tag .el-icon-close {
  float: right;
  margin-top: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 251, 251);
}

/deep/ .el-breadcrumb {
  display: flex;
}

::-webkit-scrollbar {
  width: 0;
  height: 3px;
}
</style>

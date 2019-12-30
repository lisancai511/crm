import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import api from '@/api'
import store from '@/store'
import backstageRouter from '@/router/modules/backstage'
import lodash from 'lodash'

export interface RoleState {
  authList: any
  initAuth: any
}

const name = 'Role'

@Module({
  dynamic: true,
  store,
  name,
  namespaced: true
})
class Role extends VuexModule implements RoleState {
  public authList = []
  public initAuth = false

  @Mutation
  private SET_ROLE (roleList: any) {
    this.authList = roleList
  }

  @Mutation
  private CHANGE_INIT_AUTH_FLAG (flag: boolean) {
    this.initAuth = flag
  }

  @Action
  async getRole () {
    if (!this.initAuth) {
      this.CHANGE_INIT_AUTH_FLAG(true)
      const { data: { data } } = await api.mainData.getCurrentUserAuths()
      const roleList = lodash.cloneDeep(backstageRouter) as any
      const obj: any = {}
      data.managerFuncs.forEach((item: any) => {
        if (item.hasAuth) {
          switch (item.code) {
            case 'DataManage':
              obj.DataManagement = 'DataManagement'
              break
            case 'Common':
              obj.GeneralSetting = 'GeneralSetting'
              break
            case 'OACustomized':
              obj.Office = 'Office'
              break
            case 'UsersAndSecurity':
              obj.UserAndSecuritySetting = 'UserAndSecuritySetting'
              break
            case 'Customized':
              obj.Customized = 'Customized'
              break
            case 'BizCustomized':
              obj.Business = 'Business'
              break
            case 'PlatformDev':
              obj.Platform = 'Platform'
              break
          }
        }
      })
      roleList.children = roleList.children.filter((item: any) => {
        return obj[item.name]
      })
      this.SET_ROLE([roleList])
    }
  }
}

// export const UserModule = getModule(User)
// export const RoleModule = Role
export default getModule(Role)

import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import api from '@/api'

export interface IUserState {
  token: string,
  tenantId: string
}

@Module({ name: 'user', namespaced: true })
export default class User extends VuexModule implements IUserState {
  public token = localStorage.getItem('token') || ''
  public tenantId = localStorage.getItem('tenantId') || ''

  @Mutation
  private SET_TOKEN (token: string) {
    this.token = token
  }

  @Mutation
  private SET_TENANT_ID (tenantId: string) {
    this.tenantId = tenantId
  }

  @Action
  setToken (token: string) {
    localStorage.setItem('token', token)
    this.SET_TOKEN(token)
  }

  @Action
  setTenantId (tenantId: string) {
    localStorage.setItem('tenantId', tenantId)
    this.SET_TENANT_ID(tenantId)
  }

  @Action
  public async login (userInfo: any) {
    const { data } = await api.user.login(userInfo)
    this.setToken(data.data)
    return data
  }

  @Action
  public async logout () {
    localStorage.clear()
    this.SET_TOKEN('')
  }
}

// export const UserModule = getModule(User)
export const UserModule = User

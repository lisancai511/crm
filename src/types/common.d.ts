/**
 * Created by LiuLei on 2019/11/8
 */

export namespace IDD {
  type ModuleType = 'Form' | 'MyApply' | 'MyApproval' | 'Customized' | 'BizObject';

  export interface IModule {
    id?: string
    name: string
    description: string
    type: ModuleType
    bizObjectId: string
    custPageUri: null
    iconUrl: string
    approvalFlowId: null
  }

  export interface ISModule extends IModule {
    id: string,
    bizObjectName: string
  }

  export interface IMenu {
    group: boolean
    name?: string
    iconUrl?: string
    moduleId?: string
    children?: IMenu[]
  }

  export interface ISMenu extends IMenu {
    group: boolean
    name?: string
    moduleId?: string
    children?: ISMenu[]
    module?: {
      bizObjectId: string
    }
  }

  export interface IApplication {
    id?: string
    name: string
    description: string
    // TODO ??? 字段含义
    homepageType: 'Cutomized'
    homepageUrl: string
    standard: boolean
    uuid: string
    menus: IMenu[]
    authorizedRoles: string[]
  }

  export interface ISApplication {
    id: string
    name: string
    description: string,
    type: 'WebApp' | 'PhoneApp'
    homepageType: 'Cutomized'
    homepageUrl: string
    standard: boolean,
    uuid: string
  }
}

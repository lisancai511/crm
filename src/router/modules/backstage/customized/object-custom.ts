import objectStandard from './object-standard'
import lodash from 'lodash'
import { RouteConfig } from 'vue-router'

const objectCustom = lodash.cloneDeep(objectStandard.children)

function changePath (ary: any) {
  ary.forEach((item: any) => {
    if (item.meta.customTitle) {
      item.meta.title = item.meta.customTitle
    }
    if (item.path) {
      item.path = item.path.replace('object-standard', 'object-custom')
    }
    if (item.name) {
      item.name = 'custom' + item.name
    }
    if (item.children) {
      changePath(item.children)
    }
  })
}

changePath(objectCustom)

const objectCustomRouter: RouteConfig = {
  name: 'CustomObjectLayout',
  path: '/backstage/customized/object-custom',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '组织自定义对象'
  },
  children: [
    {
      name: 'CustomObjectLayoutAdd',
      path: '/backstage/customized/object-custom/add',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details.vue'),
      props: true,
      meta: {
        title: '新建对象'
      }
    },
    ...(objectCustom as RouteConfig[])
  ]
}
export default objectCustomRouter

export const objectCustomNavRouter: RouteConfig = {
  name: 'CustomObject',
  path: '/backstage/customized/object-custom',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/index.vue'),
  meta: {
    title: '组织自定义对象',
    inNav: true
  }
}

import { RouteConfig } from 'vue-router'
import Layout from '@/views/backstage/form-designer/layout/index.vue'

const formDesignerRouter:RouteConfig = {
  path: '/form-designer',
  redirect: { name: 'FormDesignerPc' },
  component: Layout,
  children: [
    {
      name: 'FormDesignerPc',
      path: 'pc',
      component: () => import('@/views/backstage/form-designer/pc.vue')
    },
    {
      name: 'FormDesignerMobile',
      path: 'mobile',
      component: () => import('@/views/backstage/form-designer/mobile.vue')
    },
    {
      name: 'FormDesignerHover',
      path: 'hover',
      component: () => import('@/views/backstage/form-designer/hover.vue')
    },
    {
      name: 'FormDesignerLinear',
      path: 'linear',
      component: () => import('@/views/backstage/form-designer/linear.vue')
    }
  ]
}

export default formDesignerRouter

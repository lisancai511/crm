import { RouteConfig } from 'vue-router'
import Layout from '@/views/form-designer/layout/index.vue'

const formDesignerRouter: RouteConfig = {
  path: '/form-designer',
  redirect: { name: 'FormDesignerPc' },
  component: Layout,
  children: [
    {
      name: 'FormDesignerPc',
      path: 'pc',
      component: () => import('@/views/form-designer/pc.vue'),
      meta: {
        title: 'PC布局设计器'
      }
    },
    {
      name: 'FormDesignerMobile',
      path: 'mobile',
      component: () => import('@/views/form-designer/mobile.vue'),
      meta: {
        title: '移动端布局设计器'
      }
    },
    {
      name: 'FormDesignerHover',
      path: 'hover',
      component: () => import('@/views/form-designer/hover.vue'),
      meta: {
        title: '悬停布局设计器'
      }
    },
    {
      name: 'FormDesignerLinear',
      path: 'linear',
      component: () => import('@/views/form-designer/linear.vue'),
      meta: {
        title: '线式布局设计器'
      }
    }
  ]
}

export default formDesignerRouter

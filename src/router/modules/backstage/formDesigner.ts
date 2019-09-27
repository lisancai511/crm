import { RouteConfig } from 'vue-router'
import Layout from '@/views/designer/layout/index.vue'

const formDesignerRouter: RouteConfig = {
  path: '/designer',
  redirect: { name: 'FormDesignerPc' },
  component: Layout,
  children: [
    {
      name: 'FormDesignerPc',
      path: 'pc',
      component: () => import('@/views/designer/pc.vue'),
      meta: {
        title: 'PC布局设计器'
      }
    },
    {
      name: 'FormDesignerMobile',
      path: 'mobile',
      component: () => import('@/views/designer/mobile.vue'),
      meta: {
        title: '移动端布局设计器'
      }
    },
    {
      name: 'FormDesignerHover',
      path: 'hover',
      component: () => import('@/views/designer/hover.vue'),
      meta: {
        title: '悬停布局设计器'
      }
    },
    {
      name: 'FormDesignerLinear',
      path: 'linear',
      component: () => import('@/views/designer/linear.vue'),
      meta: {
        title: '行式布局设计器'
      }
    }
  ]
}

export default formDesignerRouter

import { RouteConfig } from 'vue-router'
import Layout from '@/views/designer/layout/index.vue'
import LayoutTypes from '@/views/designer/config/LayoutTypes'

const designerRouter: RouteConfig = {
  path: '/designer',
  redirect: { name: 'FormDesignerPc' },
  component: Layout,
  children: [
    {
      name: 'FormDesignerPc',
      path: 'pc',
      component: () => import('@/views/designer/views/layout-pc.vue'),
      meta: {
        title: 'PC布局设计器',
        type: LayoutTypes.PC
      }
    },
    {
      name: 'FormDesignerMobile',
      path: 'Mobile',
      component: () => import('@/views/designer/views/layout-mobile.vue'),
      meta: {
        title: '移动端布局设计器',
        type: LayoutTypes.Mobile
      }
    },
    {
      name: 'FormDesignerHover',
      path: 'hover',
      component: () => import('@/views/designer/views/layout-hover.vue'),
      meta: {
        title: '悬停布局设计器',
        type: LayoutTypes.Hover
      }
    },
    {
      name: 'FormDesignerLinear',
      path: 'linear',
      component: () => import('@/views/designer/views/layout-linear.vue'),
      meta: {
        title: '行式布局设计器',
        type: LayoutTypes.Linear
      }
    }
  ]
}

export default designerRouter

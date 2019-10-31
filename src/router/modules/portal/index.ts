import { RouteConfig } from 'vue-router'
import Layout from '@/layout/portal/index.vue'

const portalRouter: RouteConfig =
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'homepage',
        path: '/homepage',
        meta: {
          title: '主页',
          icon: 'home'
        }
      },
      {
        name: 'marketActive',
        path: '/marketActive',
        meta: {
          title: '市场活动',
          icon: 'activity'
        }
      },
      {
        name: 'potentialCustomers',
        path: '/',
        meta: {
          title: '潜在客户',
          icon: 'people'
        }
      },
      {
        name: 'customers',
        path: '/',
        meta: {
          title: '客户',
          icon: 'peopleone'
        }
      },
      {
        name: 'contacts',
        path: '/',
        meta: {
          title: '联系人',
          icon: 'group'
        }
      },
      {
        name: 'business',
        path: '/',
        meta: {
          title: '业务机会',
          icon: 'business'
        }
      },
      {
        name: 'contract',
        path: '/',
        meta: {
          title: '合同',
          icon: 'contract'
        }
      },
      {
        name: 'moneyBack  ',
        path: '/',
        meta: {
          title: '回款',
          icon: 'money'
        }
      }
    ]
  }

export default portalRouter

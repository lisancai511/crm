import { RouteConfig } from 'vue-router'

export const objectStandardNavRouter: RouteConfig = {
  name: 'Object',
  path: '/backstage/customized/object-standard',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/index.vue'),
  meta: {
    title: '平台标准对象',
    inNav: true
  }
}

const objectStandardRouter: RouteConfig = {
  name: 'StandardObjectLayout',
  path: '/backstage/customized/object-standard',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '平台标准对象'
  },
  children: [
    {
      name: 'ObjectDetails',
      path: '/backstage/customized/object-standard/:objectId',
      props: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details.vue'),
      meta: {
        title: '平台标准对象详情',
        customTitle: '平台自定义对象详情'
      }
    },
    {
      name: 'ObjectDetailsLayout',
      path: '/backstage/customized/object-standard/:objectId',
      props: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '平台标准对象详情',
        customTitle: '平台自定义对象详情'
      },
      children: [
        {
          name: 'ObjectRecordTypeAdd',
          path: '/backstage/customized/object-standard/:objectId/record-type/add',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/type-record-add.vue'),
          meta: {
            title: '创建记录类型'
          }
        },
        {
          name: 'ObjectRecordTypeEdit',
          path: '/backstage/customized/object-standard/:objectId/record-type/:recordTypeId/edit',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/type-record-add.vue'),
          meta: {
            title: '修改记录类型'
          }
        },
        {
          name: 'ObjectRecordTypeLayout',
          path: '/backstage/customized/object-standard/:objectId/record-type/layout',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/type-record-layout.vue'),
          meta: {
            title: '记录类型分配布局'
          }
        },
        {
          name: 'ObjectFieldAdd',
          path: '/backstage/customized/object-standard/:objectId/field/add',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/field-add.vue'),
          meta: {
            title: '创建字段'
          }
        },
        {
          name: 'ObjectFieldEdit',
          path: '/backstage/customized/object-standard/:objectId/field/:fieldId/edit',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/field-add.vue'),
          meta: {
            title: '编辑字段'
          }
        },
        {
          name: 'ObjectFieldDependenceAdd',
          path: '/backstage/customized/object-standard/:objectId/field-dependence/add',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/field-dependence-add.vue'),
          meta: {
            title: '创建字段依赖'
          }
        },
        {
          name: 'ObjectFieldDependenceEdit',
          path: '/backstage/customized/object-standard/:objectId/field-dependence/:fieldDependenceId/edit',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/field-dependence-add.vue'),
          meta: {
            title: '编辑字段依赖'
          }
        },
        {
          name: 'ObjectLayoutAdd',
          path: '/backstage/customized/object-standard/:objectId/layout/add',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/geography-add.vue'),
          meta: {
            title: '创建布局'
          }
        },
        {
          name: 'ObjectLayoutEdit',
          path: '/backstage/customized/object-standard/:objectId/layout/:layoutId/edit',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/geography-add.vue'),
          meta: {
            title: '编辑布局'
          }
        }
      ]
    }
  ]
}

export default objectStandardRouter

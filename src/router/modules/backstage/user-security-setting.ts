import { RouteConfig } from 'vue-router'

const userSecuritySetting: RouteConfig = {
  name: 'UserAndSecuritySetting',
  path: '/backstage/user-setting',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '用户及安全设置',
    icon: 'security'
  },
  children: [
    {
      name: 'User',
      path: '/backstage/user-setting/user',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/user/index.vue'),
      meta: {
        title: '用户',
        inNav: true
      }
    },
    {
      name: 'UserEdit',
      path: '/backstage/user-setting/user',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '用户'
      },
      children: [
        {
          name: 'editUser',
          path: '/backstage/user-setting/user/:id?/edit',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/user/userEdit.vue'),
          meta: {
            title: '用户编辑'
          }
        },
        {
          name: 'newUser',
          path: '/backstage/user-setting/user/add',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/user/userEdit.vue'),
          meta: {
            title: '新建用户'
          }
        }
      ]
    },
    {
      name: 'Role',
      path: '/backstage/user-setting/role',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/role/index.vue'),
      meta: {
        title: '角色',
        inNav: true
      }
    },
    {
      name: 'RoleLayout',
      path: '/backstage/user-setting/role',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '角色'
      },
      children: [
        {
          name: 'editRole',
          path: '/backstage/user-setting/role/:id?/edit',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/role/roleEdit.vue'),
          meta: {
            title: '编辑角色'
          }
        },
        {
          name: 'newRole',
          path: '/backstage/user-setting/role/add',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/role/roleEdit.vue'),
          meta: {
            title: '新建角色'
          }
        },
        {
          name: 'RoleEdit',
          path: '/backstage/user-setting/role/:id/editAuths',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/role/RoleDetail.vue'),
          meta: {
            title: '角色权限分配'
          }
        }
      ]
    },
    {
      name: 'organizations',
      path: '/backstage/user-setting/organizations',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/organizations/index.vue'),
      meta: {
        title: '公司部门',
        inNav: true
      }
    },
    {
      name: 'organizationsLayout',
      path: '/backstage/user-setting/organizations',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '公司部门'
      },
      children: [
        {
          name: 'addOrganizations',
          path: '/backstage/user-setting/organizations/add/:id?',
          component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/backstage/user-safe-setting/organizations/addOrganizations.vue'),
          meta: {
            title: '新建部门'
          }
        }
      ]
    }
  ]
}

export default userSecuritySetting

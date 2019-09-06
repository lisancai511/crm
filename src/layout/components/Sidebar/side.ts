import { RouteConfig } from 'vue-router'
const router: RouteConfig[] = [
  {
    name: 'general-setting',
    path: '/',
    meta: {
      title: '常规设置'
    },
    children: [
      {
        name: 'personalSetting',
        path: '/personalSetting',
        meta: {
          title: '个人设置'
        }
      },
      {
        name: 'companySetting',
        path: '/companySetting',
        meta: {
          title: '公司设置'
        }
      }
    ]
  },
  {
    name: 'userAndSecuritySetting',
    path: '/c',
    meta: {
      title: '用户及安全设置'
    },
    children: [
      {
        name: 'user',
        path: '/user',
        meta: {
          title: '用户'
        }
      },
      {
        name: 'role',
        path: '/role',
        meta: {
          title: '角色'
        }
      },
      {
        name: 'department',
        path: '/department',
        meta: {
          title: '公司部门'
        }
      },
      {
        name: 'role',
        path: '/role',
        meta: {
          title: '对象安全性'
        }
      }
    ]
  },
  {
    name: 'userAndSecuritySetting',
    path: '/c',
    meta: {
      title: '定制'
    }
  },
  {
    name: 'userAndSecuritySetting',
    path: '/c',
    meta: {
      title: '业务参数设置'
    }
  },
  {
    name: 'userAndSecuritySetting',
    path: '/c',
    meta: {
      title: '办公参数设置'
    }
  },
  {
    name: 'userAndSecuritySetting',
    path: '/c',
    meta: {
      title: '平台开发'
    }
  }
]

export default router

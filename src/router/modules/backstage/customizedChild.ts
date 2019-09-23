const customizedChild: any = [
  {
    name: 'StandardEdit',
    path: `/backstage/customized/standard-edit`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/standardEdit.vue'),
    meta: {
      breadcrumb: [{ title: '平台标准对象', path: '/backstage/customized/standard-object' }, { title: '平台标准对象详情', path: '/backstage/customized/standard-edit' }]
    }
  },
  {
    name: 'StandardEditAdd',
    path: `/backstage/customized/standard-edit/add`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details/typeRecord/TypeRecordAdd.vue'),
    meta: {
      breadcrumb: [{ title: '平台标准对象', path: '/backstage/customized/standard-object' }, { title: '平台标准对象详情', path: '/backstage/customized/standard-edit' }, { title: '新建记录类型', path: '/backstage/customized/standard-edit/add' }]
    }
  },
  {
    name: 'StandardEditLayout',
    path: `/backstage/customized/standard-edit/layout`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details/typeRecord/TypeRecordLayOut.vue'),
    meta: {
      breadcrumb: [{ title: '平台标准对象', path: '/backstage/customized/standard-object' }, { title: '平台标准对象详情', path: '/backstage/customized/standard-edit' }, { title: '分配页面布局', path: '/backstage/customized/standard-edit/layout' }]
    }
  },
  {
    name: 'newField',
    path: `/backstage/customized/standard-edit/newField`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details/feildList/newField/index.vue'),
    meta: {
      breadcrumb: [{ title: '平台标准对象', path: '/backstage/customized/standard-object' }, { title: '平台标准对象详情', path: '/backstage/customized/standard-edit' }, { title: '新建字段', path: '/backstage/customized/standard-object' }]
    }
  },
  {
    name: 'addDepend',
    path: `/backstage/customized/standard-edit/addDepend`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details/depend/newDepend/newDepend.vue'),
    meta: {
    }
  },
  {
    name: 'newLay',
    path: `/backstage/customized/standard-edit/newLay`,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/details/lay/newLay.vue'),
    meta: {
      breadcrumb: [{ title: '平台标准对象', path: '/backstage/customized/standard-object' }, { title: '平台标准对象详情', path: '/backstage/customized/standard-edit' }, { title: '新建字段', path: '/backstage/customized/standard-object' }]
    }
  }
]

export default customizedChild

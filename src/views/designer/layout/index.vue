<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-designer-layout">
    <form-design-nav-bar/>
    <form-designer-app-main/>
  </div>
</template>
<!--页面属性  字段属性-->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormDesignNavBar from '@/views/designer/layout/components/Navbar/index.vue'
import FormDesignerAppMain from '@/views/designer/layout/components/AppMain.vue'
import FormDesignSidebarLeft from '@/views/designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/designer/layout/components/SidebarRight/index.vue'

import designerStore from '@/store/modules/designer'
import presetLayouts from '@/views/designer/config/presetLayouts'

// TODO 开发完成后切换真实数据
const mockObject = {
  'id': 1568612437027,
  'name': '用户aaq',
  'type': 'object',
  'iconUrl': null,
  'standard': true,
  'repeatable': true,
  'enable': true,
  'description': '用户对象阿萨德',
  'apiName': null,
  'nameFieldName': 'name',
  'nameFieldType': 'Name',
  'createdTime': '2019-09-16 13:40:37',
  'creator': 'anonymousUser',
  'lastModifiedTime': '2019-09-26 14:35:56',
  'lastModifier': 'anonymousUser'
}

@Component({
  name: 'FormDesignLayout',
  components: {
    FormDesignSidebarRight,
    FormDesignSidebarLeft,
    FormDesignerAppMain,
    FormDesignNavBar
  }
})
export default class Layout extends Vue {
  async created () {
    // TODO 切换真实ID
    await Promise.all([
      designerStore.getAllFields('1568612437027'),
      designerStore.getAllButtons('1568612437027')
    ])
    // 更新设计器当前对象信息
    designerStore.updateObject(mockObject)

    // 初始化布局配置
    this.initLayout()
  }

  initLayout () {
    //  TODO
    //  获取指定的UI列表
    //  如果是编辑
    //  如果是新建
    //  初始化布局列表
    designerStore.updateLayout(
      // TODO 动态导入默认布局
      Object.values(presetLayouts.layout1({
        buttons: designerStore.buttons,
        fields: designerStore.fields,
        standObject: designerStore.object
      }))
    )
  }
}
</script>

<style lang="scss" scoped>
.form-designer-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

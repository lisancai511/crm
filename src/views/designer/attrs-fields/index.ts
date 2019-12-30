import _ from 'lodash'

const requireComponent: any = require.context('.', false, /Field.(vue|ts)$/)
const components: any = {}
requireComponent.keys().forEach((fileName: any) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = _.upperFirst(
    _.camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  components[componentName] = componentConfig.default || componentConfig
})

export default components

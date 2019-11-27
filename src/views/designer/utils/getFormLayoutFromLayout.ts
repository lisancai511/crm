/**
 * Created by LiuLei on 2019/11/14
 */
import ComponentTypes from '@/views/designer/config/ComponentTypes'

export default function getFormLayoutFromLayout (layout: any) {
  let formLayout = {
    type: ComponentTypes.InfoTabDetails,
    children: [],
    attrs: {}
  }
  if (layout.type === ComponentTypes.InfoTabDetails) {
    formLayout = layout
  } else {
    inner(layout)
  }

  function inner (layout: any) {
    if (Array.isArray(layout.children)) {
      for (let i = 0; i < layout.children.length; i++) {
        if (layout.children[i].type === ComponentTypes.InfoTabDetails) {
          formLayout = layout.children[i]
          break
        } else {
          inner(layout.children[i])
        }
      }
    }
  }

  return formLayout
}

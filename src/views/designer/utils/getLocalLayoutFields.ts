/**
 * Created by LiuLei on 2019/10/30
 */
import { IField } from '@/views/designer/config/components'
import fieldComponentByType from './fieldComponentByType'

/**
 * @description 获取本地布局内部使用的全部字段
 */
export default function getLocalLayoutFields (
  layout: any
  // isFormOnly?: boolean
): IField[] {
  // console.log('layout', layout)
  // debugger
  const usedFields: any[] = []

  // const fieldIds: any = {}

  function inner (layout: any) {
    // if (!(layout.id && fieldIds[layout.id]) && fieldComponentByType[layout.type]) {
    if (fieldComponentByType[layout.type]) {
      // fieldIds[layout.id] = true
      usedFields.push(layout)
    }
    // }
    // if (!isFormOnly && _.isObject(layout.attrs) && Array.isArray(layout.attrs.usedFields)) {
    //   layout.attrs.usedFields.forEach((field: any) => {
    //     if (!(field.id && fieldIds[field.id])) {
    //       fieldIds[field.id] = true
    //       usedFields.push(field)
    //     }
    //   })
    // }
    if (Array.isArray(layout.children)) {
      layout.children.forEach((item: any) => inner(item))
    }
  }

  inner(layout)
  return usedFields
}

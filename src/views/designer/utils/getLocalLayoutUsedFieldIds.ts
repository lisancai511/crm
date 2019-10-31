/**
 * Created by LiuLei on 2019/10/30
 */
import { IField } from '@/views/designer/config/components'
import getLocalLayoutUsedFields from './getLocalLayoutUsedFields'

/**
 * @description 获取本地布局内使用的全部字段ID
 */
export default function getLocalLayoutUsedFieldIds (
  layout: any
  // , isFormOnly?: boolean
): any[] {
  // console.log(JSON.stringify(layout))
  // console.log(getLocalLayoutUsedFields(layout))
  return getLocalLayoutUsedFields(
    layout
    // , isFormOnly
  )
    .map((field: IField) => field.id)
}

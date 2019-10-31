/**
 * Created by LiuLei on 2019/10/30
 */
/**
 * @description 获取本地布局内所有有有id的字段
 */
import getLocalLayoutFields from './getLocalLayoutFields'
import { IField } from '@/views/designer/config/components'

export default function getLocalLayoutUsedFields (
  layout: any
  // , isFormOnly?: boolean
): any[] {
  return getLocalLayoutFields(
    layout
    // , isFormOnly
  )
    .filter((field: IField) => !!field.id)
}

/**
 * Created by LiuLei on 2019/10/30
 */
import { IField } from '@/views/designer/config/components'
import getLocalLayoutUsedFieldIds from './getLocalLayoutUsedFieldIds'

/**
 * @description 获取未使用的字段
 */
export default function getLocalLayoutUnusedFields (
  allFields: IField[],
  layout: any
  // , isFormOnly?: boolean
): any[] {
  const usedFieldIds = getLocalLayoutUsedFieldIds(
    layout
    // , true
  ).map(id => String(id))
  return allFields.filter((field: IField) => !usedFieldIds.includes(String(field.id)))
}

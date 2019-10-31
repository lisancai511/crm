/**
 * Created by LiuLei on 2019/10/30
 */
import getLocalLayoutUsedFields from './getLocalLayoutUsedFields'
import { IField } from '@/views/designer/config/components'
/**
 * @description 获取编辑过的字段
 */
export default function getLocalLayoutNeedModifyFields (layout: any): any[] {
  return getLocalLayoutUsedFields(layout)
    .filter((field: IField) => !!field.isEdit)
}

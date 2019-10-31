/**
 * Created by LiuLei on 2019/10/30
 */
import getLocalLayoutFields from './getLocalLayoutFields'
import { IField } from '@/views/designer/config/components'

/**
 * @description 获取新增加的字段
 */
export default function getLocalLayoutNeedAddFields (layout: any): any[] {
  return getLocalLayoutFields(layout)
    .filter((field: IField) => !field.id)
}

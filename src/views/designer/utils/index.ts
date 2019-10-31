/**
 * Created by LiuLei on 2019/10/21
 */
// TODO 考虑要不要合成一个函数，一次递归获取全部数据

import pako from 'pako'

export { default as fieldComponentByType } from '@/views/designer/utils/fieldComponentByType'
export { default as serverFieldToLocalField } from '@/views/designer/utils/serverFieldToLocalField'
export { default as localFieldToServerField } from '@/views/designer/utils/localFieldToServerField'
export { default as getLocalLayoutFields } from '@/views/designer/utils/getLocalLayoutFields'
export { default as getLocalLayoutUsedFields } from '@/views/designer/utils/getLocalLayoutUsedFields'
export { default as getLocalLayoutUsedFieldIds } from '@/views/designer/utils/getLocalLayoutUsedFieldIds'
export { default as getLocalLayoutUnusedFields } from '@/views/designer/utils/getLocalLayoutUnusedFields'
export { default as getLocalLayoutNeedAddFields } from '@/views/designer/utils/getLocalLayoutNeedAddFields'
export { default as getLocalLayoutNeedModifyFields } from '@/views/designer/utils/getLocalLayoutNeedModifyFields'
export { default as serverLayoutToLocal } from '@/views/designer/utils/serverLayoutToLocal'
export { default as localLayoutToServer } from '@/views/designer/utils/localLayoutToServer'

/**
 * @description string压缩成string并转 base64
 */
export function compressStringToBase64 (plainString: string): string {
  return window.btoa(pako.deflate(plainString, { to: 'string' }))
}

/**
 * @description base64转string并解压缩string
 */
export function base64DecompressToString (base64: string): string {
  return pako.inflate(window.atob(base64), { to: 'string' })
}

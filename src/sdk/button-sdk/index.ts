/**
 * Created by LiuLei on 2019/11/22
 */
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import { MessageBox, Message } from 'element-ui'
import api from '@/api'
import OwnerChange from './components/OwnerChange.vue'
import RecordTypeChange from './components/RecordTypeChange.vue'
import { CreateElement } from 'vue'
import BatchEdit from '@/sdk/button-sdk/components/BatchEdit.vue'

export const buttonSdk = {
  // 批量删除
  [PredefinedButtonApiNames.batchDelete] (
    objectApiName: string,
    recordIds: string[]) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.paasObjectOp.deleteAppRecords(
          objectApiName,
          recordIds
        ).then((res) => {
          resolve(res)
          Message.success('删除成功')
        }).catch((e: any) => {
          reject(e)
        })
      }).catch((e: any) => {
        reject(e)
      })
    })
  },
  // 新建
  [PredefinedButtonApiNames.new] () {
    console.log('new')
  },
  // 更改所有人
  [PredefinedButtonApiNames.changeOwner] (
    h: CreateElement,
    payload: {
      recordId: string | string[],
      ownerId: string | string[],
      objectApiName: string
    }) {
    let {
      recordId,
      ownerId,
      objectApiName
    } = payload
    if (typeof recordId === 'string') {
      recordId = [recordId]
    }
    if (typeof ownerId === 'string') {
      ownerId = [ownerId]
    }
    return new Promise(async (resolve, reject) => {
      await MessageBox({
        title: '更改所有人',
        showConfirmButton: false,
        beforeClose (action: string, instance: any, done: any) {
          done()
          reject(Error('cancel'))
        },
        message: h(OwnerChange, {
          props: {
            ownerId,
            recordId,
            objectApiName
          },
          on: {
            cancel () {
              reject(Error('cancel'))
              MessageBox.close()
            },
            confirm (val: string) {
              resolve(val)
              MessageBox.close()
            }
          }
        })
      })
    })
  },
  // 更改记录类型
  [PredefinedButtonApiNames.changeRecordType] (
    h: CreateElement,
    payload: {
      recordId: string | string[],
      recordTypeId: string | string[],
      objectId: string
      objectApiName: string
    }
  ) {
    let {
      recordId,
      recordTypeId,
      objectId,
      objectApiName
    } = payload
    if (typeof recordId === 'string') {
      recordId = [recordId]
    }
    if (typeof recordTypeId === 'string') {
      recordTypeId = [recordTypeId]
    }
    return new Promise(async (resolve, reject) => {
      await MessageBox({
        title: '更改记录类型',
        showConfirmButton: false,
        beforeClose (action: string, instance: any, done: any) {
          done()
          reject(Error('cancel'))
        },
        message: h(RecordTypeChange, {
          props: {
            recordTypeId,
            recordId,
            objectId,
            objectApiName
          },
          on: {
            cancel () {
              reject(Error('cancel'))
              MessageBox.close()
            },
            confirm (val: string) {
              resolve(val)
              MessageBox.close()
            }
          }
        })
      })
    })
  },
  // 批量编辑
  [PredefinedButtonApiNames.batchEdit] (
    h: CreateElement,
    payload: {
      recordId: string | string[],
      objectId: string
      objectApiName: string
    }
  ) {
    let {
      recordId,
      objectId,
      objectApiName
    } = payload
    if (typeof recordId === 'string') {
      recordId = [recordId]
    }
    const key = Math.random()
    return new Promise(async (resolve, reject) => {
      await MessageBox({
        title: '批量编辑',
        showConfirmButton: false,
        beforeClose (action: string, instance: any, done: any) {
          done()
          reject(Error('cancel'))
        },
        message: h(BatchEdit, {
          key,
          props: {
            recordId,
            objectId,
            objectApiName
          },
          on: {
            cancel () {
              reject(Error('cancel'))
              MessageBox.close()
            },
            confirm (val: string) {
              resolve(val)
              MessageBox.close()
            }
          }
        })
      })
    })
  }
}

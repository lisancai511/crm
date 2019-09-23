import request from '@/plugins/axios'

export function getDemo (data:any) {
  return request({
    method: 'get',
    url: '/demo',
    data
  })
}

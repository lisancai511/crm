import request from 'axios'

export function getDemo (data:any) {
  return request({
    method: 'get',
    url: '/demo',
    data
  })
}

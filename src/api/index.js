import request from '@/utils/request'


export function getStatus() {
  return request({
    url: '/status',
    method: 'get'
  })
}



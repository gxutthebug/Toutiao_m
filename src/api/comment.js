import request from '@/utils'

export const commentlist = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

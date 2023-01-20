import request from '@/utils/index'

export const addChannel = obj => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [obj]
    }
  })
}

export const deleteChannel = id => {
  return request({
    method: 'DELETE',
    // url: '/v1_0/user/channels/:target'
    url: `/v1_0/user/channels/${id}`
  })
}
